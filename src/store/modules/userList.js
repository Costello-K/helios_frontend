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
    updateRemoveMemberInUserListData(state, id) {
      if (state.users[0]?.member) {
        state.users = state.users.map(user =>
          user.member.id === id
            ? { ...user, member: { ...user.member, is_company_member: false, is_company_admin: false } }
            : user
        );
      } else {
        state.users = state.users.map(user =>
          user.id === id
            ? { ...user, is_company_member: false, is_company_admin: false }
            : user
        );
      }
    },
    updateSendInvitationInUserListData(state, id) {
      if (state.users[0]?.member) {
        state.users = state.users.map(user =>
          user.member.id === id
            ? { ...user, member: { ...user.member, is_active_invitation: true } }
            : user
        );
      } else {
        state.users = state.users.map(user =>
          user.id === id
            ? { ...user, is_active_invitation: true }
            : user
        );
      }
    },
    updateAppointAdminInUserListData(state, id) {
      if (state.users[0]?.member) {
        state.users = state.users.map(user =>
          user.member.id === id
            ? { ...user, member: { ...user.member, is_company_admin: true } }
            : user
        );
      } else {
        state.users = state.users.map(user =>
          user.id === id
            ? { ...user, is_company_admin: true }
            : user
        );
      }
    },
    updateRemoveAdminInUserListData(state, id) {
      if (state.users[0]?.member) {
        state.users = state.users.map(user =>
          user.member.id === id
            ? { ...user, member: { ...user.member, is_company_admin: false } }
            : user
        );
      } else {
        state.users = state.users.map(user =>
          user.id === id
            ? { ...user, is_company_admin: false }
            : user
        );
      }
    },
  },
};
