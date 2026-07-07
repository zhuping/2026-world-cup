import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const MATCHES_TS = path.join(ROOT, 'src/app/data/matches.ts');
const OUT = path.join(ROOT, 'public/live-data.json');
const SCOREBOARD_URL =
  'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard';

const TEAM_NAME_ALIASES = {
  'korea republic': 'south korea',
  usa: 'united states',
  'bosnia and herzegovina': 'bosnia herzegovina',
  turkiye: 'turkey',
  'ir iran': 'iran',
  'congo dr': 'dr congo',
  'cote d ivoire': 'ivory coast',
  curacao: 'curacao',
  'cabo verde': 'cape verde',
};

function unquote(value) {
  return Function(`return ${value}`)();
}

function getProp(line, prop) {
  const match = line.match(new RegExp(`${prop}:\\s*('(?:\\\\.|[^'])*'|"(?:\\\\.|[^"])*")`));
  return match ? unquote(match[1]) : null;
}

function readMatches() {
  // ponytail: the schedule data is one-object-per-line; use a TS runner if that stops being true.
  return fs
    .readFileSync(MATCHES_TS, 'utf8')
    .split('\n')
    .filter((line) =>
      ['id', 'date', 'timeUtc', 'homeNameEn', 'awayNameEn'].every((prop) =>
        line.includes(`${prop}:`)
      )
    )
    .map((line) => ({
      id: getProp(line, 'id'),
      date: getProp(line, 'date'),
      timeUtc: getProp(line, 'timeUtc'),
      homeNameEn: getProp(line, 'homeNameEn'),
      awayNameEn: getProp(line, 'awayNameEn'),
    }))
    .filter((match) => Object.values(match).every(Boolean));
}

function readStore() {
  try {
    return JSON.parse(fs.readFileSync(OUT, 'utf8'));
  } catch {
    return {
      updatedAt: null,
      scores: {},
      sync: {
        lastAttemptAt: null,
        lastSuccessAt: null,
        lastStatus: 'idle',
        lastError: null,
        lastSyncedDates: [],
        lastFetchedCount: 0,
      },
    };
  }
}

function writeStore(store) {
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, `${JSON.stringify(store, null, 2)}\n`);
}

function getMatchStart(match) {
  return new Date(`${match.date}T${match.timeUtc}:00Z`);
}

function getPreviousDate(date) {
  const current = new Date(`${date}T00:00:00Z`);
  current.setUTCDate(current.getUTCDate() - 1);
  return current.toISOString().slice(0, 10);
}

function getSyncCandidateDates(match) {
  const utcDate = getMatchStart(match).toISOString().slice(0, 10);
  return [...new Set([getPreviousDate(match.date), match.date, utcDate])];
}

function isKnockoutMatch(matchId) {
  return /^(r32|r16|qf|sf|final)/.test(matchId);
}

function needsPenaltyScoreBackfill(matchId, current) {
  return Boolean(
    current &&
      current.status === 'finished' &&
      isKnockoutMatch(matchId) &&
      current.homeScore === current.awayScore &&
      (current.homePenaltyScore === undefined || current.awayPenaltyScore === undefined)
  );
}

function getRecentMatchDates(matches, now) {
  return [
    ...new Set(
      matches
        .filter((match) => getMatchStart(match) <= now)
        .flatMap(getSyncCandidateDates)
    ),
  ].sort().slice(-2);
}

function getPendingMatchDates(matches, now, existing) {
  return [
    ...new Set(
      matches
        .filter((match) => getMatchStart(match) <= now)
        .filter((match) => {
          const current = existing.scores[match.id];
          return !current || current.status !== 'finished' || needsPenaltyScoreBackfill(match.id, current);
        })
        .flatMap(getSyncCandidateDates)
    ),
  ].sort();
}

function getDatesToCheck(matches, now, existing) {
  return [
    ...new Set([
      ...getRecentMatchDates(matches, now),
      ...getPendingMatchDates(matches, now, existing),
    ]),
  ].sort();
}

function getDatesToSync(matches, now, existing) {
  return getDatesToCheck(matches, now, existing).filter((date) =>
    matches.some((match) => {
      if (!getSyncCandidateDates(match).includes(date)) return false;
      const current = existing.scores[match.id];
      return !current || current.status !== 'finished' || needsPenaltyScoreBackfill(match.id, current);
    })
  );
}

function normalizeName(value) {
  const normalized = value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

  return TEAM_NAME_ALIASES[normalized] ?? normalized;
}

function getStatus(statusName, completed) {
  const name = statusName?.toUpperCase() ?? '';
  if (completed || name.includes('FULL_TIME') || name.includes('FINAL')) return 'finished';
  if (name.includes('IN_PROGRESS') || name.includes('HALFTIME')) return 'live';
  return 'scheduled';
}

function getOptionalNumber(...values) {
  for (const value of values) {
    if (value === undefined || value === null || value === '') continue;
    const numeric = Number(value);
    if (Number.isFinite(numeric)) return numeric;
  }
  return undefined;
}

function findLocalMatch(matches, eventDate, homeName, awayName) {
  const date = eventDate.slice(0, 10);
  const home = normalizeName(homeName);
  const away = normalizeName(awayName);

  const match = matches.find(
    (item) =>
      item.date === date &&
      normalizeName(item.homeNameEn) === home &&
      normalizeName(item.awayNameEn) === away
  );
  if (match) return { id: match.id, reversed: false };

  const reversedMatch = matches.find(
    (item) =>
      item.date === date &&
      normalizeName(item.homeNameEn) === away &&
      normalizeName(item.awayNameEn) === home
  );

  return reversedMatch ? { id: reversedMatch.id, reversed: true } : null;
}

async function fetchEspnScoresByDate(matches, date) {
  const response = await fetch(`${SCOREBOARD_URL}?dates=${date.replaceAll('-', '')}`);
  if (!response.ok) throw new Error(`ESPN scoreboard request failed: ${response.status}`);

  const payload = await response.json();
  const scores = {};

  for (const event of payload?.events ?? []) {
    const competition = event?.competitions?.[0];
    const competitors = competition?.competitors ?? [];
    const home = competitors.find((item) => item.homeAway === 'home');
    const away = competitors.find((item) => item.homeAway === 'away');
    if (!home || !away) continue;

    const localMatch = findLocalMatch(
      matches,
      event.date,
      home.team?.displayName ?? '',
      away.team?.displayName ?? ''
    );
    if (!localMatch) continue;

    const homeScore = Number(home.score ?? 0);
    const awayScore = Number(away.score ?? 0);
    const homePenaltyScore = getOptionalNumber(
      home.shootoutScore,
      home.penaltyScore,
      home.penaltyKickScore,
      home.penalties
    );
    const awayPenaltyScore = getOptionalNumber(
      away.shootoutScore,
      away.penaltyScore,
      away.penaltyKickScore,
      away.penalties
    );

    scores[localMatch.id] = {
      homeScore: localMatch.reversed ? awayScore : homeScore,
      awayScore: localMatch.reversed ? homeScore : awayScore,
      status: getStatus(event?.status?.type?.name, event?.status?.type?.completed),
      updatedAt: new Date().toISOString(),
      source: 'espn-scoreboard',
      homeWinner: localMatch.reversed ? Boolean(away.winner) : Boolean(home.winner),
      awayWinner: localMatch.reversed ? Boolean(home.winner) : Boolean(away.winner),
      homePenaltyScore: localMatch.reversed ? awayPenaltyScore : homePenaltyScore,
      awayPenaltyScore: localMatch.reversed ? homePenaltyScore : awayPenaltyScore,
    };
  }

  return scores;
}

async function main() {
  const now = new Date();
  const attemptAt = now.toISOString();
  const matches = readMatches();
  const existing = readStore();
  const dates = getDatesToSync(matches, now, existing);
  const scopeDates = getDatesToCheck(matches, now, existing);

  if (dates.length === 0) {
    writeStore({
      ...existing,
      sync: {
        lastAttemptAt: attemptAt,
        lastSuccessAt: attemptAt,
        lastStatus: 'skipped',
        lastError: null,
        lastSyncedDates: scopeDates,
        lastFetchedCount: 0,
      },
    });
    console.log(`No score changes. Checked ${scopeDates.length} dates.`);
    return;
  }

  const nextScores = { ...existing.scores };
  const errors = [];
  let fetchedCount = 0;

  for (const date of dates) {
    try {
      const dailyScores = await fetchEspnScoresByDate(matches, date);
      Object.assign(nextScores, dailyScores);
      fetchedCount += Object.keys(dailyScores).length;
    } catch (error) {
      errors.push(`${date}: ${error instanceof Error ? error.message : 'Unknown sync error'}`);
    }
  }

  const success = errors.length < dates.length;
  writeStore({
    updatedAt: success ? attemptAt : existing.updatedAt,
    scores: nextScores,
    sync: {
      lastAttemptAt: attemptAt,
      lastSuccessAt: success ? attemptAt : existing.sync.lastSuccessAt,
      lastStatus: errors.length === 0 ? 'success' : success ? 'partial_error' : 'error',
      lastError: errors[0] ?? null,
      lastSyncedDates: dates,
      lastFetchedCount: fetchedCount,
    },
  });

  if (!success) throw new Error(errors.join('\n'));
  console.log(`Synced ${fetchedCount} scores from ${dates.length} dates.`);
}

await main();
