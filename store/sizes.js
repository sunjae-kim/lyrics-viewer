export const state = () => ({
  windowSize: {
    x: 0,
    y: 0,
  },
  fontSize: 0,
  lineHeight: 0,
});

export const getters = {
  style: state => ({
    fontSize: 1 + state.fontSize * 0.015 + 'rem!important',
    lineHeight: 55 + state.lineHeight * 1 + 'px!important',
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
  setLineHeight(state, lineHeight) {
    state.lineHeight = lineHeight;
  },
};

export const actions = {
  onResize({ commit }) {
    commit('setWindowSize', { x: window.innerWidth, y: window.innerHeight });
  },
};
