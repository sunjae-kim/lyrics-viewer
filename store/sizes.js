export const state = () => ({
  windowSize: {
    x: 0,
    y: 0,
  },
  rawStyle: {
    fontSize: 1,
    lineHeight: 50,
  },
});

export const getters = {
  style: ({ rawStyle }) => ({
    fontSize: rawStyle.fontSize + 'rem!important',
    lineHeight: rawStyle.lineHeight + 'px!important',
  }),
};

export const mutations = {
  setWindowSize(state, windowSize) {
    state.windowSize = windowSize;
  },
  setRawStyle(state, rawStyle) {
    state.rawStyle = rawStyle;
  },
};

export const actions = {
  onResize({ commit }) {
    commit('setWindowSize', { x: window.innerWidth, y: window.innerHeight });
  },
  scaleUp({ commit, state }) {
    if (state.rawStyle.lineHeight < 60) {
      commit('setRawStyle', {
        fontSize: state.rawStyle.fontSize + 0.08,
        lineHeight: state.rawStyle.lineHeight + 2,
      });
    }
  },
  scaleDown({ commit, state }) {
    if (state.rawStyle.lineHeight > 40) {
      commit('setRawStyle', {
        fontSize: state.rawStyle.fontSize - 0.08,
        lineHeight: state.rawStyle.lineHeight - 2,
      });
    }
  },
};
