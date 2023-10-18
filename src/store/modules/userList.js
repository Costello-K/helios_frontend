export default {
  namespaced: true,

  state: () => ({
    users: [],
  }),
  getters: {
    getUserById(state, id) {
      return state.users[id];
    },
  },
  mutations: {
    removeUserListData(state) {
      state.users = [];
    },
    setUserListData(state, payload) {
      state.users = payload;
    },
  },
};
