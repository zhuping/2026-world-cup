import { groupStageMatches } from '@/app/data/matches';
import { fetchEspnScoresByDate } from './espn';
import { readScoreStore, writeScoreStore } from './storage';
import type { ScoreStore } from './types';

function getMatchStart(date: string, timeUtc: string) {
  return new Date(`${date}T${timeUtc}:00Z`);
}

function getRecentMatchDates(now = new Date()) {
  const startedDates = [
    ...new Set(
      groupStageMatches
        .filter((match) => getMatchStart(match.date, match.timeUtc) <= now)
        .flatMap((match) => {
          const start = getMatchStart(match.date, match.timeUtc);
          const utcDate = start.toISOString().slice(0, 10);
          return [...new Set([match.date, utcDate])];
        })
    ),
  ].sort();

  return startedDates.slice(-2);
}

function getSyncCandidateDates(match: (typeof groupStageMatches)[number]) {
  const start = getMatchStart(match.date, match.timeUtc);
  const utcDate = start.toISOString().slice(0, 10);
  return [...new Set([match.date, utcDate])];
}

function getDatesToSync(now = new Date(), existing: ScoreStore) {
  const targetDates = getRecentMatchDates(now);

  return targetDates.filter((date) =>
    groupStageMatches.some((match) => {
      if (!getSyncCandidateDates(match).includes(date)) return false;
      const current = existing.scores[match.id];
      return !current || current.status !== 'finished';
    })
  );
}

export function hasStartedMatch(now = new Date()) {
  return groupStageMatches.some(
    (match) => getMatchStart(match.date, match.timeUtc) <= now
  );
}

export async function getLiveTournamentData() {
  return readScoreStore();
}

export async function syncScores(now = new Date()) {
  const attemptAt = now.toISOString();

  if (!hasStartedMatch(now)) {
    return {
      ok: true,
      skipped: true,
      reason: 'No matches have started yet.',
      scopeDates: [],
      attemptAt,
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

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      await writeScoreStore(nextStore);
    }

    return {
      ok: true,
      skipped: true,
      reason: 'All started matches are already finalized.',
      updatedAt: existing.updatedAt,
      scopeDates,
      attemptAt,
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

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await writeScoreStore(nextStore);
  }

  return {
    ok: errors.length < dates.length,
    skipped: false,
    dates,
    scopeDates,
    fetchedCount,
    updatedAt: nextStore.updatedAt,
    persisted: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
    errors,
    attemptAt,
    status: nextStore.sync.lastStatus,
  };
}
