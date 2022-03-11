import type { Track, TrackInfo } from '#/types/vibe';

export interface VibeAPI {
  getTrackList: (query: string) => Promise<Track[]>;
  getTrackInfo: (id: string) => Promise<TrackInfo>;
}

export type VibeAPIResponse<T> = Record<'response', Record<'result', T>>;
