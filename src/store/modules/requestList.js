export default {
  namespaced: true,

  state: () => ({
    requests: [],
  }),
  mutations: {
    removeRequestListData(state) {
      state.requests = [];
    },
    setRequestListData(state, payload) {
      state.requests = payload;
    },
    updateRequestListData(state, payload) {
      const { id } = payload;
      state.requests = state.requests.map(request =>
        request.id === id
          ? payload
          : request
      );
    },
  },
};
