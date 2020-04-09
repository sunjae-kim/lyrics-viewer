export const state = () => ({
  windowSize: {
    x: 0,
    y: 0,
  },
  fontSize: 0,
  marginBottom: 0,
});

export const getters = {
  style: state => ({
    fontSize: 1 + state.fontSize * 0.015 + 'rem!important',
    marginBottom: 2.5 + state.marginBottom * 0.1 + 'rem!important',
  }),
  isMobile: state => state.windowSize.x < 768,
};

export const mutations = {
  setWindowSize(state, windowSize) {
    state.windowSize = windowSize;
  },
  setFontSize(state, fontSize) {
    state.fontSize = fontSize;
  },
  setMarginBottom(state, marginBottom) {
    state.marginBottom = marginBottom;
  },
};

export const actions = {
  onResize({ commit }) {
    commit('setWindowSize', { x: window.innerWidth, y: window.innerHeight });
  },
};
