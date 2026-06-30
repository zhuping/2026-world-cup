import { scorableMatches } from '@/app/data/matches';
import { fetchEspnScoresByDate } from './espn';
import { readScoreStore, writeScoreStore } from './storage';
import type { ScoreStore } from './types';

function getMatchStart(date: string, timeUtc: string) {
  return new Date(`${date}T${timeUtc}:00Z`);
}

function getPreviousDate(date: string) {
  const current = new Date(`${date}T00:00:00Z`);
  current.setUTCDate(current.getUTCDate() - 1);
  return current.toISOString().slice(0, 10);
}

function getMatchSyncStart(match: (typeof scorableMatches)[number]) {
  return match.timeUtc
    ? getMatchStart(match.date, match.timeUtc)
    : new Date(`${match.date}T00:00:00Z`);
}

function getSyncCandidateDates(match: (typeof scorableMatches)[number]) {
  const utcDate = getMatchSyncStart(match).toISOString().slice(0, 10);
  const previousDate = getPreviousDate(match.date);

  return [...new Set([previousDate, match.date, utcDate])];
}

function getRecentMatchDates(now = new Date()) {
  const startedDates = [
    ...new Set(
      scorableMatches
        .filter((match) => getMatchSyncStart(match) <= now)
        .flatMap((match) => getSyncCandidateDates(match))
    ),
  ].sort();

  return startedDates.slice(-2);
}

function isKnockoutMatch(matchId: string) {
  return /^(r32|r16|qf|sf|final)/.test(matchId);
}

function needsPenaltyScoreBackfill(matchId: string, current: ScoreStore['scores'][string] | undefined) {
  if (!current || current.status !== 'finished') return false;
  if (!isKnockoutMatch(matchId)) return false;
  if (current.homeScore !== current.awayScore) return false;

  return current.homePenaltyScore === undefined || current.awayPenaltyScore === undefined;
}

function getDatesToSync(now = new Date(), existing: ScoreStore) {
  const targetDates = getRecentMatchDates(now);

  return targetDates.filter((date) =>
    scorableMatches.some((match) => {
      if (!getSyncCandidateDates(match).includes(date)) return false;
      const current = existing.scores[match.id];
      return !current || current.status !== 'finished' || needsPenaltyScoreBackfill(match.id, current);
    })
  );
}

export function hasStartedMatch(now = new Date()) {
  return scorableMatches.some((match) => getMatchSyncStart(match) <= now);
}

export async function getLiveTournamentData() {
  return readScoreStore();
}

export async function syncScores(now = new Date()) {
  const attemptAt = now.toISOString();
  const hasBlobToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

  if (!hasStartedMatch(now)) {
    return {
      ok: true,
      skipped: true,
      reason: 'No matches have started yet.',
      scopeDates: [],
      attemptAt,
      hasBlobToken,
    };
  }

  const existing = await readScoreStore();
  const scopeDates = getRecentMatchDates(now);
  const dates = getDatesToSync(now, existing);
  if (dates.length === 0) {
    const nextStore: ScoreStore = {
      ...existing,
      sync: {
        lastAttemptAt: attemptAt,
        lastSuccessAt: existing.sync.lastSuccessAt ?? existing.updatedAt,
        lastStatus: 'skipped',
        lastError: null,
        lastSyncedDates: scopeDates,
        lastFetchedCount: 0,
      },
    };

    let persisted = false;
    let persistedError: string | null = null;

    if (hasBlobToken) {
      try {
        await writeScoreStore(nextStore);
        persisted = true;
      } catch (error) {
        persistedError =
          error instanceof Error ? error.message : 'Unknown blob write error';
      }
    }

    return {
      ok: true,
      skipped: true,
      reason: 'All started matches are already finalized.',
      updatedAt: existing.updatedAt,
      scopeDates,
      attemptAt,
      hasBlobToken,
      persisted,
      persistedError,
    };
  }

  const nextScores = { ...existing.scores };
  let fetchedCount = 0;
  const errors: string[] = [];

  for (const date of dates) {
    try {
      const dailyScores = await fetchEspnScoresByDate(date);
      Object.assign(nextScores, dailyScores);
      fetchedCount += Object.keys(dailyScores).length;
    } catch (error) {
      errors.push(
        `${date}: ${error instanceof Error ? error.message : 'Unknown sync error'}`
      );
    }
  }

  const nextStore: ScoreStore = {
    updatedAt: new Date().toISOString(),
    scores: nextScores,
    sync: {
      lastAttemptAt: attemptAt,
      lastSuccessAt:
        errors.length < dates.length
          ? new Date().toISOString()
          : existing.sync.lastSuccessAt,
      lastStatus:
        errors.length === 0
          ? 'success'
          : errors.length < dates.length
            ? 'partial_error'
            : 'error',
      lastError: errors[0] ?? null,
      lastSyncedDates: dates,
      lastFetchedCount: fetchedCount,
    },
  };

  let persisted = false;
  let persistedError: string | null = null;

  if (hasBlobToken) {
    try {
      await writeScoreStore(nextStore);
      persisted = true;
    } catch (error) {
      persistedError =
        error instanceof Error ? error.message : 'Unknown blob write error';
    }
  }

  return {
    ok: errors.length < dates.length && persistedError === null,
    skipped: false,
    dates,
    scopeDates,
    fetchedCount,
    updatedAt: nextStore.updatedAt,
    hasBlobToken,
    persisted,
    persistedError,
    errors,
    attemptAt,
    status: nextStore.sync.lastStatus,
  };
}
