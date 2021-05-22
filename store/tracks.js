import { getTrackList, getTrackLyrics, getTrackInfo } from '@/api';

export const state = () => ({
  query: '',
  currentTrack: {
    info: null,
    lyrics: null,
  },
  trackList: [],
  loading: false,
  timeout: null,
});

export const mutations = {
  setQuery(state, query) {
    state.query = query;
  },
  setCurrentTrack(state, track) {
    state.currentTrack = track;
  },
  setTrackList(state, trackList) {
    state.trackList = trackList;
  },
  setLoading(state, status) {
    state.loading = status;
  },
  setTimeout(state, timeout) {
    state.timeout = timeout;
  },
};

export const actions = {
  async onSearchInput({ commit, state, dispatch }, query) {
    commit('setQuery', query);
    if (!query) return dispatch('setTrackList', []);
    if (!state.loading) commit('setLoading', true);
    if (state.timeout) clearTimeout(state.timeout);
    const timeout = setTimeout(async () => {
      const trackList = await getTrackList(state.query);
      if (timeout === state.timeout) {
        dispatch(
          'setTrackList',
          trackList.filter(track => track.hasLyric),
        );
      }
    }, 200);
    commit('setTimeout', timeout);
  },
  async setTrackList({ commit, state }, trackList) {
    commit('setTrackList', trackList);
    commit('setLoading', false);
    commit('setTimeout', null);
    clearTimeout(state.timeout);
  },
  async setTrack({ state, commit }, { trackTitle, trackId }) {
    if (!state.loading) commit('setLoading', true);
    const info = await getTrackInfo(trackTitle, trackId);
    const lyrics = await getTrackLyrics(trackId);
    commit('setCurrentTrack', { info, lyrics });
    commit('setLoading', false);
  },
};
