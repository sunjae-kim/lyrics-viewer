import { ActionTree, GetterTree, MutationTree } from 'vuex';

export type SizeState = {
  windowSize: { x: number; y: number };
  fontSize: number;
  marginBottom: number;
};

export const state = (): SizeState => ({
  windowSize: { x: 0, y: 0 },
  fontSize: 0,
  marginBottom: 0,
});

export const getters: GetterTree<SizeState, {}> = {
  style: state => ({
    fontSize: 1 + state.fontSize * 0.015 + 'rem!important',
    marginBottom: 2.5 + state.marginBottom * 0.1 + 'rem!important',
  }),
  isMobile: state => state.windowSize.x < 768,
};

export const mutations: MutationTree<SizeState> = {
  setWindowSize(state, windowSize: SizeState['windowSize']) {
    state.windowSize = windowSize;
  },
  setFontSize(state, fontSize: number) {
    state.fontSize = fontSize;
  },
  setMarginBottom(state, marginBottom: number) {
    state.marginBottom = marginBottom;
  },
};

export const actions: ActionTree<SizeState, {}> = {
  onResize({ commit }) {
    commit('setWindowSize', { x: window.innerWidth, y: window.innerHeight });
  },
};
