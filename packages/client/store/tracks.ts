import { Track, TrackInfo } from '#/types/vibe';
import VibeAPI from '@/api';
import { ActionTree, MutationTree } from 'vuex';

export type TrackState = {
  currentTrack: { info: null | Track; lyrics: null | TrackInfo };
  trackList: Track[];
  loading: boolean;
};

export const state = (): TrackState => ({
  currentTrack: { info: null, lyrics: null },
  trackList: [],
  loading: false,
});

export const mutations: MutationTree<TrackState> = {
  setCurrentTrack(state, track: { info: Track; lyrics: TrackInfo }) {
    state.currentTrack = track;
  },
  setTrackList(state, trackList: Track[]) {
    state.trackList = trackList;
  },
  setLoading(state, status: boolean) {
    state.loading = status;
  },
};

export const actions: ActionTree<TrackState, {}> = {
  async onSearchInput({ commit, state, dispatch }, query: string) {
    if (!query) return dispatch('setTrackList', []);
    if (!state.loading) commit('setLoading', true);
    const trackList = await VibeAPI.getTrackList(query, { hasLyric: true });
    dispatch('setTrackList', trackList);
  },
  async setTrackList({ commit }, trackList: Track[]) {
    commit('setTrackList', trackList);
    commit('setLoading', false);
  },
  async setTrack(
    { state, commit },
    params: { trackId: string; trackTitle: string },
  ) {
    const { trackId, trackTitle } = params;
    if (!state.loading) commit('setLoading', true);
    const info = await VibeAPI.getTrack(trackTitle, trackId);
    const lyrics = await VibeAPI.getTrackInfo(trackId);
    commit('setCurrentTrack', { info, lyrics });
    commit('setLoading', false);
  },
};
