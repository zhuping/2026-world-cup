export interface MatchScore {
  homeScore: number;
  awayScore: number;
  status: 'finished' | 'live';
  updatedAt: string;
  source: string;
}

export const matchScores: Record<string, MatchScore> = {
  'm-01': {
    homeScore: 2,
    awayScore: 0,
    status: 'finished',
    updatedAt: '2026-06-12T08:00:00.000Z',
    source: 'ESPN/Xinhua',
  },
};
