import { scorableMatches } from '@/app/data/matches';
import type { MatchScore, MatchScoreStatus } from './types';

const SCOREBOARD_BASE_URL =
  'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard';

const TEAM_NAME_ALIASES: Record<string, string> = {
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

function normalizeName(value: string) {
  const normalized = value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

  return TEAM_NAME_ALIASES[normalized] ?? normalized;
}

function getStatus(statusName?: string, completed?: boolean): MatchScoreStatus {
  const name = statusName?.toUpperCase() ?? '';
  if (completed || name.includes('FULL_TIME') || name.includes('FINAL')) {
    return 'finished';
  }
  if (name.includes('IN_PROGRESS') || name.includes('HALFTIME')) {
    return 'live';
  }
  return 'scheduled';
}

function getOptionalNumber(...values: unknown[]) {
  for (const value of values) {
    if (value === undefined || value === null || value === '') continue;
    const numeric = Number(value);
    if (Number.isFinite(numeric)) return numeric;
  }
  return undefined;
}

function findLocalMatchId(
  eventDate: string,
  homeName: string,
  awayName: string
): { id: string; reversed: boolean } | null {
  const date = eventDate.slice(0, 10);
  const home = normalizeName(homeName);
  const away = normalizeName(awayName);

  const match = scorableMatches.find((item) => {
    return (
      item.date === date &&
      normalizeName(item.homeNameEn) === home &&
      normalizeName(item.awayNameEn) === away
    );
  });
  if (match) return { id: match.id, reversed: false };

  const reversedMatch = scorableMatches.find((item) => {
    return (
      item.date === date &&
      normalizeName(item.homeNameEn) === away &&
      normalizeName(item.awayNameEn) === home
    );
  });

  return reversedMatch ? { id: reversedMatch.id, reversed: true } : null;
}

export async function fetchEspnScoresByDate(date: string) {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(
        `${SCOREBOARD_BASE_URL}?dates=${date.replaceAll('-', '')}`,
        { cache: 'no-store' }
      );
      if (!response.ok) {
        throw new Error(`ESPN scoreboard request failed: ${response.status}`);
      }

      const payload = await response.json();
      const scores: Record<string, MatchScore> = {};

      for (const event of payload?.events ?? []) {
        const competition = event?.competitions?.[0];
        const competitors = competition?.competitors ?? [];
        const home = competitors.find((item: any) => item.homeAway === 'home');
        const away = competitors.find((item: any) => item.homeAway === 'away');
        if (!home || !away) continue;

        const localMatch = findLocalMatchId(
          event.date,
          home.team?.displayName ?? '',
          away.team?.displayName ?? ''
        );
        if (!localMatch) continue;

        const homeScore = Number(home.score ?? 0);
        const awayScore = Number(away.score ?? 0);
        const localHomeScore = localMatch.reversed ? awayScore : homeScore;
        const localAwayScore = localMatch.reversed ? homeScore : awayScore;
        const homeWinner = Boolean(home.winner);
        const awayWinner = Boolean(away.winner);
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
        const localHomePenaltyScore = localMatch.reversed ? awayPenaltyScore : homePenaltyScore;
        const localAwayPenaltyScore = localMatch.reversed ? homePenaltyScore : awayPenaltyScore;

        scores[localMatch.id] = {
          homeScore: Number.isFinite(localHomeScore) ? localHomeScore : 0,
          awayScore: Number.isFinite(localAwayScore) ? localAwayScore : 0,
          status: getStatus(
            event?.status?.type?.name,
            event?.status?.type?.completed
          ),
          updatedAt: new Date().toISOString(),
          source: 'espn-scoreboard',
          homeWinner: localMatch.reversed ? awayWinner : homeWinner,
          awayWinner: localMatch.reversed ? homeWinner : awayWinner,
          homePenaltyScore: localHomePenaltyScore,
          awayPenaltyScore: localAwayPenaltyScore,
        };
      }

      return scores;
    } catch (error) {
      lastError =
        error instanceof Error ? error : new Error('Unknown ESPN sync error');
      if (attempt < 3) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 400));
      }
    }
  }

  throw lastError ?? new Error('Unknown ESPN sync error');
}
