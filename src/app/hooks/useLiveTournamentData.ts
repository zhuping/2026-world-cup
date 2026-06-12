'use client';

import { useCallback, useEffect, useState } from 'react';
import { groups as fallbackGroups, knockoutRounds } from '../data/teams';
import { matchScores as fallbackScores } from '../data/matchScores';
import type { Group, BracketRound } from '../data/teams';
import type { MatchScore, SyncMeta } from '@/lib/scores/types';

interface LiveTournamentData {
  groups: Group[];
  scores: Record<string, MatchScore>;
  knockoutRounds: BracketRound[];
  updatedAt: string | null;
  sync: SyncMeta;
}

const FALLBACK_DATA: LiveTournamentData = {
  groups: fallbackGroups,
  scores: fallbackScores,
  knockoutRounds,
  updatedAt: Object.values(fallbackScores)
    .map((item) => item.updatedAt)
    .sort()
    .at(-1) ?? null,
  sync: {
    lastAttemptAt: null,
    lastSuccessAt: Object.values(fallbackScores)
      .map((item) => item.updatedAt)
      .sort()
      .at(-1) ?? null,
    lastStatus: 'idle',
    lastError: null,
    lastSyncedDates: [],
    lastFetchedCount: Object.keys(fallbackScores).length,
  },
};

export function useLiveTournamentData() {
  const [data, setData] = useState<LiveTournamentData>(FALLBACK_DATA);

  const load = useCallback(async () => {
    try {
      const response = await fetch('/api/live-data', { cache: 'no-store' });
      if (!response.ok) return;

      const payload = (await response.json()) as Partial<LiveTournamentData>;
      if (!payload.groups || !payload.scores) return;

      setData({
        groups: payload.groups,
        scores: payload.scores,
        knockoutRounds: payload.knockoutRounds ?? knockoutRounds,
        updatedAt:
          typeof payload.updatedAt === 'string' ? payload.updatedAt : null,
        sync:
          payload.sync && typeof payload.sync === 'object'
            ? payload.sync
            : FALLBACK_DATA.sync,
      });
    } catch {
      // Keep fallback data when polling fails.
    }
  }, []);

  useEffect(() => {
    void load();
    const timer = window.setInterval(() => {
      void load();
    }, 60_000);

    return () => window.clearInterval(timer);
  }, [load]);

  return data;
}
