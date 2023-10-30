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
    updateCompanyListData(state, payload) {
      const { id } = payload;
      state.companies = state.companies.map(company =>
        company.id === id
          ? payload
          : company
      );
    },
    leaveCompany(state, id) {
      state.companies = state.companies.map(company =>
        company.id === id
          ? {...company, is_member: false, is_admin: false}
          : company
      );
    },
    sendRequestToCompany(state, id) {
      state.companies = state.companies.map(company =>
        company.id === id
          ? {...company, is_active_request: true}
          : company
      );
    },
  },
};
