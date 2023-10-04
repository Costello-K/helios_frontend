// testCounts.js will be used only for the FE-5 branch
export default {
  namespaced: true,

  state: () => ({
    testCount: 0,
  }),
  getters: {
    doubleTestCount(state) {
      return state.testCount * 2;
    },
    strTestCount(state) {
      return `Now count = ${state.testCount}`;
    },
  },
  actions: {
    incrementAsyncTestCount({ commit }) {
      setTimeout(() => commit('incrementTestCount'), 1000);
    },
    decrementAsyncTestCount({ commit }) {
      setTimeout(() => commit('decrementTestCount'), 1000);
    },
    setAsyncTestCount({ commit }, payload) {
      setTimeout(() => commit('setTestCount', payload), 1000);
    },
  },
  mutations: {
    removeTestCount(state) {
      state.testCount = 0;
    },
    incrementTestCount(state) {
      state.testCount++;
    },
    decrementTestCount(state) {
      state.testCount--;
    },
    setTestCount(state, payload) {
      state.testCount = payload;
    },
  },
};
