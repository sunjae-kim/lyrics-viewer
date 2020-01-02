import axios from 'axios';

export const getTrackList = async query => {
  const { data } = await axios.get(
    encodeURI(
      `http://localhost:5001/getTrackList?query=${query}`,
    ),
  );

  return data;
};

export const getTrackLyrics = async trackId => {
  const { data } = await axios.get(
    encodeURI(
      `http://localhost:5001/getTrackLyrics?trackId=${trackId}`,
    ),
  );
  return data;
};

export const getTrackInfo = async (query, trackId) => {
  const { data } = await axios.get(
    encodeURI(
      `http://localhost:5001/getTrackList?query=${query}`,
    ),
  );
  return data.find(track => (track.id = trackId));
};
