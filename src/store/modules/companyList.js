export default {
  namespaced: true,

  state: () => ({
    companies: [],
    page_size: 0,
  }),
  getters: {
    getCompanyById(state, id) {
      return state.companies[id];
    },
  },
  mutations: {
    removeCompanyListData(state) {
      state.companies = [];
    },
    setCompanyListData(state, payload) {
      state.companies = payload;
    },
    setCompanyPageSize(state, payload) {
      state.page_size = payload;
    },
    addCompany(state, payload) {
      if (state.companies.length < state.page_size) {
        state.companies = [...state.companies, payload];
      }
    },
  },
};
