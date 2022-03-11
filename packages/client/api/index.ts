import type { Track, TrackInfo } from '#/types/vibe';
import axios from 'axios';
const SERVER_URI = process.env.SERVER_URI;

interface VibeAPI {
  getTrackList: (query: string, option?: Partial<Track>) => Promise<Track[]>;
  getTrackInfo: (trackId: string) => Promise<TrackInfo>;
  getTrack: (trackTitle: string, trackId: string) => Promise<Track | undefined>;
}

const VibeAPI: VibeAPI = {
  getTrackList: async (query, option = {}) => {
    const url = new URL(`${SERVER_URI}/api/tracks`);
    url.searchParams.append('query', query);
    const { data } = await axios.get(url.href);

    return Object.entries(option).reduce((trackList, [key, value]) => {
      return trackList.filter(track => track[key as keyof Track] === value);
    }, data as Track[]);
  },

  getTrackInfo: async trackId => {
    const url = new URL(`${SERVER_URI}/api/track-info/${trackId}`);
    const { data } = await axios.get(url.href);
    return data;
  },

  getTrack: async (query, trackId) => {
    const data = await VibeAPI.getTrackList(query);
    return data.find(track => track.trackId === Number(trackId));
  },
};

export default VibeAPI;
