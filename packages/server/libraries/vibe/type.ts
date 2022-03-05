export interface VibeAPI {
  getTrackList: (query: string) => Promise<Track[]>;
  getTrackInfo: (id: string) => Promise<TrackInfo>;
}

export type VibeAPIResponse<T> = Record<'response', Record<'result', T>>;

export type Track = {
  trackId: number;
  trackTitle: string;
  represent: boolean;
  discNumber: number;
  trackNumber: number;
  artistTotalCount: number;
  album: Album;
  hasLyric: boolean;
  hasSyncLyric: boolean;
  isStreaming: boolean;
  isDownload: boolean;
  isMobileDownload: boolean;
  isAdult: boolean;
  hasVideo: boolean;
  videoId: number;
  isDRM: boolean;
  isGift: boolean;
  isTopPopular: boolean;
  isHqs: boolean;
  isPlug: boolean;
  isTaggable: boolean;
  shareUrl: string;
  gdid: string;
  isSearchFree: boolean;
  artists: Artist[];
  artistLinkUrl: string;
  isMusicianLeague: boolean;
  isPrdd: boolean;
  isAodd: boolean;
  isKaraokeEnabled: boolean;
  isDolbyAtmos: boolean;
  likeCount: number;
  isRecordShareEnabled: boolean;
};

export type Album = {
  albumId: number;
  albumTitle: string;
  releaseDate: string;
  imgUrl: string;
  artistTotalCount: number;
  isAdult: boolean;
  isHqs: boolean;
  isPlug: boolean;
  isAlbumAODD: boolean;
  isRegular: boolean;
  shareUrl: string;
  usMusicanLeague: boolean;
  productionName?: string;
  agencyName?: string;
  urlScheme: string;
  isDolbyAtmos: boolean;
  artists: Artist[];
};

export type Artist = {
  artistId: number;
  artistName: string;
  isGroup: boolean;
  imageUrl: string;
  shareUrl: string;
  likeCount: number;
};

export type TrackInfo = {
  trackId: number;
  hasLyric: 'Y' | 'N';
  hasSyncLyric: 'Y' | 'N';
  lyric: string;
  syncLyric: string;
  lyricSourceTypeCd: string;
  lyricRegisterUserId: string;
  lyricUpdateUserId?: string;
  lyricWriters: string[];
  composers: Composer[];
  arrangers: Arranger[];
};

export type Composer = {
  composerId: number;
  composerName: string;
  isDisplay: boolean;
};

export type Arranger = {
  arrangerId: number;
  arrangerName: string;
  isDisplay: boolean;
};
