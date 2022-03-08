import _ from 'lodash';
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
    const { tracks } = response.data.response.result;

    // remove duplicated tracks
    const uniqueTracks = _.uniqWith(tracks, (a: Track, b: Track) => {
      const value = { trackTitle: a.trackTitle, trackArtist: a.artistLinkUrl };
      const other = { trackTitle: b.trackTitle, trackArtist: b.artistLinkUrl };
      return _.isEqual(value, other);
    });

    return uniqueTracks;
  },
  getTrackInfo: async (id: string) => {
    const url = new URL(`${API_URL}/track/${id}/info`);

    type Response = VibeAPIResponse<Record<'trackInformation', TrackInfo>>;
    const response = await axios.get<Response>(url.href);

    return response.data.response.result.trackInformation;
  },
};

export default VibeAPI;
