export type MatchScoreStatus = 'scheduled' | 'live' | 'finished';

export interface MatchScore {
  homeScore: number;
  awayScore: number;
  status: MatchScoreStatus;
  updatedAt: string;
  source: string;
}

export interface SyncMeta {
  lastAttemptAt: string | null;
  lastSuccessAt: string | null;
  lastStatus: 'idle' | 'success' | 'skipped' | 'partial_error' | 'error';
  lastError: string | null;
  lastSyncedDates: string[];
  lastFetchedCount: number;
}

export interface ScoreStore {
  updatedAt: string | null;
  scores: Record<string, MatchScore>;
  sync: SyncMeta;
}
