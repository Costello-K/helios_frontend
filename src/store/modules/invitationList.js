export default {
  namespaced: true,

  state: () => ({
    invitations: [],
  }),
  mutations: {
    removeInvitationListData(state) {
      state.invitations = [];
    },
    setInvitationListData(state, payload) {
      state.invitations = payload;
    },
    updateInvitationListData(state, payload) {
      const { id } = payload;
      state.invitations = state.invitations.map(invitation =>
        invitation.id === id
          ? payload
          : invitation
      );
    },
  },
};
