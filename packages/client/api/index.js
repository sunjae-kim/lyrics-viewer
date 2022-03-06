import axios from 'axios';
const SERVER_URI = process.env.SERVER_URI;

export const getTrackList = async query => {
  const url = new URL(`${SERVER_URI}/api/tracks`);
  url.searchParams.append('query', query);
  const { data } = await axios.get(url.href);
  return data ? data : [];
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
