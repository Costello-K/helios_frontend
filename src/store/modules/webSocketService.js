import { NAME_ACCESS_TOKEN } from '@/constants';

export default {
  namespaced: true,

  state: () => ({
    notificationSocket: null,
    statusWebSocket: 'disconnected',
  }),
  getters: {
    isWebSocketConnected(state) {
      return state.statusWebSocket === 'connected';
    },
  },
  actions: {
    connectWebSocket({ commit, state, rootState }) {
      const userId = rootState.authUser.user.id;
      state.notificationSocket = new WebSocket(
        `${process.env.BACKEND_WEBSOCKET_APP_URL}/ws/notifications/${userId}/`,
      );

      state.notificationSocket.onopen = () => {
        commit('setConnectWebSocketStatus');
        const accessToken = localStorage.getItem(NAME_ACCESS_TOKEN);
        state.notificationSocket.send(JSON.stringify({accessToken}));
      }

      state.notificationSocket.onmessage = (event) => {
        const notificationsData = JSON.parse(event.data);
        if (notificationsData?.notifications) {
          commit('notificationList/setNotificationListData', notificationsData, {root: true});
        } else if (notificationsData?.create) {
          commit('notificationList/addNotification', notificationsData, {root: true});
        } else if (notificationsData?.update) {
          commit('notificationList/updateNotification', notificationsData, {root: true});
        } else {
          console.error(`Error: ${notificationsData?.error}`);
        }
      };

      state.notificationSocket.onclose = (event) => {
        commit('setDisconnectWebSocketStatus');
        state.notificationSocket = null;
        if (!event.wasClean) {
          console.error(`Connection abort code: ${event.code}. Reason for connection loss: ${event.reason}`);
        }
      };
    },
    updateStatusNotification({ state }, payload) {
      payload['update'] = true;
      state.notificationSocket.send(JSON.stringify(payload));
    },
  },
  mutations: {
    setConnectWebSocketStatus(state) {
      state.statusWebSocket = 'connected';
    },
    setDisconnectWebSocketStatus(state) {
      state.statusWebSocket = 'disconnected';
    },
  },
};
