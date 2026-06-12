import { groupStageMatches } from '@/app/data/matches';
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

function findLocalMatchId(
  eventDate: string,
  homeName: string,
  awayName: string
): string | null {
  const date = eventDate.slice(0, 10);
  const home = normalizeName(homeName);
  const away = normalizeName(awayName);

  const match = groupStageMatches.find((item) => {
    return (
      item.date === date &&
      normalizeName(item.homeNameEn) === home &&
      normalizeName(item.awayNameEn) === away
    );
  });

  return match?.id ?? null;
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

        const matchId = findLocalMatchId(
          event.date,
          home.team?.displayName ?? '',
          away.team?.displayName ?? ''
        );
        if (!matchId) continue;

        const homeScore = Number(home.score ?? 0);
        const awayScore = Number(away.score ?? 0);

        scores[matchId] = {
          homeScore: Number.isFinite(homeScore) ? homeScore : 0,
          awayScore: Number.isFinite(awayScore) ? awayScore : 0,
          status: getStatus(
            event?.status?.type?.name,
            event?.status?.type?.completed
          ),
          updatedAt: new Date().toISOString(),
          source: 'espn-scoreboard',
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
