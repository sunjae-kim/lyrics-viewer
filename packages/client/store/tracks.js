import { getTrackList, getTrackInfo, getTrack } from '@/api';

export const state = () => ({
  currentTrack: { info: null, lyrics: null },
  trackList: [],
  loading: false,
});

export const mutations = {
  setCurrentTrack(state, track) {
    state.currentTrack = track;
  },
  setTrackList(state, trackList) {
    state.trackList = trackList;
  },
  setLoading(state, status) {
    state.loading = status;
  },
};

export const actions = {
  async onSearchInput({ commit, state, dispatch }, query) {
    if (!query) return dispatch('setTrackList', []);
    if (!state.loading) commit('setLoading', true);
    const trackList = await getTrackList(query, { hasLyric: true });
    dispatch('setTrackList', trackList);
  },
  async setTrackList({ commit, state }, trackList) {
    commit('setTrackList', trackList);
    commit('setLoading', false);
    clearTimeout(state.timeout);
  },
  async setTrack({ state, commit }, { trackTitle, trackId }) {
    if (!state.loading) commit('setLoading', true);
    const info = await getTrack(trackTitle, trackId);
    const lyrics = await getTrackInfo(trackId);
    commit('setCurrentTrack', { info, lyrics });
    commit('setLoading', false);
  },
};
