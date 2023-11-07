import { objUtils } from '@/utils';

export default {
  namespaced: true,

  state: () => ({
    user: {
      id: null,
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      avatar: '',
      rating: '',
    },
  }),
  getters: {
    isAuthorized(state) {
      return !!state.user.id;
    },
    getUserId(state) {
      return state.user.id;
    },
    getUserEmail(state) {
      return state.user.id ? state.user.email : '';
    },
    getUserFirstName(state) {
      return state.user.id ? state.user.first_name : '';
    },
  },
  mutations: {
    removeUserData(state) {
      state.user = objUtils.createEmptyObjectWithNullId(state.user);
    },
    setUserData(state, payload) {
      state.user = objUtils.mergeObjects(state.user, payload);
    },
  },
};
