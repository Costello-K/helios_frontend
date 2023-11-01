export default {
  namespaced: true,

  state: () => ({
    company: {},
  }),
  mutations: {
    removeCompanyData(state) {
      state.company = {};
    },
    setCompanyData(state, payload) {
      state.company = payload;
    },
  },
};
