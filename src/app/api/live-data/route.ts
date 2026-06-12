import { NextResponse } from 'next/server';
import { knockoutRounds } from '@/app/data/teams';
import { getLiveTournamentData } from '@/lib/scores/service';
import { buildGroupsFromScores } from '@/lib/tournament/standings';

export const dynamic = 'force-dynamic';

export async function GET() {
  const scoreStore = await getLiveTournamentData();
  const groups = buildGroupsFromScores(scoreStore.scores);

  return NextResponse.json(
    {
      updatedAt: scoreStore.updatedAt,
      sync: scoreStore.sync,
      scores: scoreStore.scores,
      groups,
      knockoutRounds,
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}
