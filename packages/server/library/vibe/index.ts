import axios from 'axios';
import { Track, TrackInfo, VibeAPI, VibeAPIResponse } from './type';

const API_URL = 'https://apis.naver.com/vibeWeb/musicapiweb';

const VibeAPI: VibeAPI = {
  getTrackList: async (query: string) => {
    const url = new URL(`${API_URL}/v3/search/track`);
    url.searchParams.append('query', query);
    url.searchParams.append('sort', 'RELEVANCE');

    type Response = VibeAPIResponse<Record<'tracks', Track[]>>;
    const response = await axios.get<Response>(url.href);

    return response.data.response.result.tracks;
  },
  getTrackInfo: async (id: string) => {
    const url = new URL(`${API_URL}/track/${id}/info`);

    type Response = VibeAPIResponse<Record<'trackInformation', TrackInfo>>;
    const response = await axios.get<Response>(url.href);

    return response.data.response.result.trackInformation;
  },
};

export default VibeAPI;
