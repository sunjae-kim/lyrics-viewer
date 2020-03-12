import axios from 'axios';
const API_SERVER_URL = 'https://lyrics-viewer-server.herokuapp.com';

export const getTrackList = async query => {
  const { data } = await axios.get(
    encodeURI(`${API_SERVER_URL}/getTrackList?query=${query}`),
  );
  return data ? data : [];
};

export const getTrackLyrics = async trackId => {
  const { data } = await axios.get(
    encodeURI(`${API_SERVER_URL}/getTrackLyrics?trackId=${trackId}`),
  );
  return data;
};

export const getTrackInfo = async (query, trackId) => {
  const { data } = await axios.get(
    encodeURI(`${API_SERVER_URL}/getTrackList?query=${query}`),
  );
  return data.find(track => (track.id = trackId));
};
