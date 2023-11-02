export default {
  namespaced: true,

  state: () => ({
    quizzes: [],
    page_size: 0,
  }),
  mutations: {
    removeQuizListData(state) {
      state.quizzes = [];
    },
    setQuizListData(state, payload) {
      state.quizzes = payload;
    },
    setQuizPageSize(state, payload) {
      state.page_size = payload;
    },
    addQuiz(state, payload) {
      if (state.quizzes.length < state.page_size) {
        state.quizzes = [...state.quizzes, payload];
      }
    },
    removeQuiz(state, id) {
      state.quizzes = state.quizzes.filter(quiz => quiz.id !== id );
    },
    updateQuizListData(state, payload) {
      const { id } = payload;
      state.quizzes = state.quizzes.map(quiz =>
        quiz.id === id
          ? payload
          : quiz
      );
    },
  },
};