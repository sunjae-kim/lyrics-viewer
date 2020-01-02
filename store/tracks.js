import { getTrackList, getTrackLyrics } from '@/api';

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
  async onRedirectToTrackDetail({ commit }, track) {
    const { trackTitle, trackId } = track;
    const lyrics = await getTrackLyrics(trackId);
    commit('setCurrentTrack', { info: track, lyrics });
    this.app.router.push(encodeURI(`/${trackTitle}/${trackId}`));
  },
  async onSearchInput({ commit, state }, query) {
    commit('setQuery', query);
    if (!state.loading) commit('setLoading', true);
    if (state.timeout) clearTimeout(state.timeout);
    commit(
      'setTimeout',
      setTimeout(async () => {
        const trackList = await getTrackList(state.query);
        if (!state.query || !trackList.length) {
          commit('setTrackList', []);
          commit('setLoading', false);
          return;
        }
        commit(
          'setTrackList',
          trackList.filter(track => track.hasLyric),
        );
        commit('setLoading', false);
      }, 200),
    );
  },
};
