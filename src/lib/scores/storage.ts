import { list, put } from '@vercel/blob';
import { matchScores } from '@/app/data/matchScores';
import type { ScoreStore } from './types';

const SCORE_BLOB_PATH = 'scores/history.json';

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

export async function readScoreStore(): Promise<ScoreStore> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return FALLBACK_STORE;
  }

  try {
    const { blobs } = await list({ prefix: SCORE_BLOB_PATH, limit: 5 });
    const blob = blobs.find((item) => item.pathname === SCORE_BLOB_PATH);
    if (!blob) return FALLBACK_STORE;

    const response = await fetch(blob.url, { cache: 'no-store' });
    if (!response.ok) return FALLBACK_STORE;

    const payload = (await response.json()) as ScoreStore;
    return {
      updatedAt:
        typeof payload?.updatedAt === 'string' ? payload.updatedAt : null,
      scores:
        payload?.scores && typeof payload.scores === 'object'
          ? payload.scores
          : FALLBACK_STORE.scores,
      sync:
        payload?.sync && typeof payload.sync === 'object'
          ? {
              lastAttemptAt:
                typeof payload.sync.lastAttemptAt === 'string'
                  ? payload.sync.lastAttemptAt
                  : null,
              lastSuccessAt:
                typeof payload.sync.lastSuccessAt === 'string'
                  ? payload.sync.lastSuccessAt
                  : FALLBACK_STORE.sync.lastSuccessAt,
              lastStatus:
                payload.sync.lastStatus ?? FALLBACK_STORE.sync.lastStatus,
              lastError:
                typeof payload.sync.lastError === 'string'
                  ? payload.sync.lastError
                  : null,
              lastSyncedDates: Array.isArray(payload.sync.lastSyncedDates)
                ? payload.sync.lastSyncedDates.filter(
                    (item): item is string => typeof item === 'string'
                  )
                : [],
              lastFetchedCount:
                typeof payload.sync.lastFetchedCount === 'number'
                  ? payload.sync.lastFetchedCount
                  : 0,
            }
          : FALLBACK_STORE.sync,
    };
  } catch {
    return FALLBACK_STORE;
  }
}

export async function writeScoreStore(store: ScoreStore): Promise<void> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error('BLOB_READ_WRITE_TOKEN is required.');
  }

  await put(SCORE_BLOB_PATH, JSON.stringify(store, null, 2), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
    cacheControlMaxAge: 60,
  });
}
