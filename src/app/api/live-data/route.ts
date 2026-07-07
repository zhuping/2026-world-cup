import { NextResponse } from 'next/server';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { matchScores } from '@/app/data/matchScores';
import { buildKnockoutRoundsFromScores } from '@/lib/tournament/knockout';
import { buildGroupsFromScores } from '@/lib/tournament/standings';
import type { ScoreStore } from '@/lib/scores/types';

export const dynamic = 'force-dynamic';

const FALLBACK_STORE: ScoreStore = {
  updatedAt: Object.values(matchScores)
    .map((item) => item.updatedAt)
    .sort()
    .at(-1) ?? null,
  scores: matchScores,
  sync: {
    lastAttemptAt: null,
    lastSuccessAt: Object.values(matchScores)
      .map((item) => item.updatedAt)
      .sort()
      .at(-1) ?? null,
    lastStatus: 'idle',
    lastError: null,
    lastSyncedDates: [],
    lastFetchedCount: Object.keys(matchScores).length,
  },
};

function getLiveDataUrl() {
  if (process.env.LIVE_DATA_URL) return process.env.LIVE_DATA_URL;

  const owner = process.env.VERCEL_GIT_REPO_OWNER;
  const repo = process.env.VERCEL_GIT_REPO_SLUG;
  const ref = process.env.VERCEL_GIT_COMMIT_REF ?? 'master';
  return owner && repo
    ? `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/public/live-data.json`
    : null;
}

async function readStaticScoreStore(): Promise<ScoreStore> {
  const liveDataUrl = getLiveDataUrl();
  if (liveDataUrl) {
    try {
      const response = await fetch(`${liveDataUrl}?t=${Date.now()}`, { cache: 'no-store' });
      if (response.ok) return (await response.json()) as ScoreStore;
    } catch {
      // Fall back to the checked-in file below.
    }
  }

  try {
    const text = await readFile(path.join(process.cwd(), 'public/live-data.json'), 'utf8');
    return JSON.parse(text) as ScoreStore;
  } catch {
    return FALLBACK_STORE;
  }
}

export async function GET() {
  const scoreStore = await readStaticScoreStore();
  const groups = buildGroupsFromScores(scoreStore.scores);
  const knockoutRounds = buildKnockoutRoundsFromScores(scoreStore.scores);

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
