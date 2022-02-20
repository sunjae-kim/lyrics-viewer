import axios from 'axios';
const SERVER_URI = process.env.SERVER_URI;

export const getTrackList = async (query) => {
  const { data } = await axios.get(
    encodeURI(`${SERVER_URI}/getTrackList?query=${query}`),
  );
  return data ? data : [];
};

export const getTrackLyrics = async (trackId) => {
  const { data } = await axios.get(
    encodeURI(`${SERVER_URI}/getTrackLyrics?trackId=${trackId}`),
  );
  return data;
};

export const getTrackInfo = async (query, trackId) => {
  const data = await getTrackList(query);
  return data.find((track) => track.trackId == trackId);
};
