import axios from 'axios';
const SERVER_URI = process.env.SERVER_URI;

/**
 * Vibe API를 사용해 TrackList를 검색하는 API
 * @param {string} query 검색 쿼리
 * @param {{ hasLyric: boolean }} option 필터링 옵션
 * @returns {Promise<Track[]>} trackList
 */
export const getTrackList = async (query, option = {}) => {
  const url = new URL(`${SERVER_URI}/api/tracks`);
  url.searchParams.append('query', query);
  const { data } = await axios.get(url.href);

  return Object.entries(option).reduce((trackList, [key, value]) => {
    return trackList.filter(track => track[key] === value);
  }, data);
};

export const getTrackInfo = async trackId => {
  const url = new URL(`${SERVER_URI}/api/track-info/${trackId}`);
  const { data } = await axios.get(url.href);
  return data;
};

export const getTrack = async (query, trackId) => {
  const data = await getTrackList(query);
  return data.find(track => track.trackId == trackId);
};
