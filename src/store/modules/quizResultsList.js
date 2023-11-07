export default {
  namespaced: true,

  state: () => ({
    quizResults: [],
  }),
  mutations: {
    removeQuizResultsListData(state) {
      state.quizResults = [];
    },
    setQuizResultsListData(state, payload) {
      state.quizResults = payload;
    },
  },
};
