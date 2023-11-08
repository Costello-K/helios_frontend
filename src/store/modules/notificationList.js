export default {
  namespaced: true,

  state: () => ({
    notifications: [],
    page_size: 0,
    total_pages: 0,
    count_unviewed_notifications: 0,
  }),
  getters: {
    getUnviewedNotificationCount(state) {
      return state.count_unviewed_notifications;
    },
    getLastNotification(state) {
      return state.notifications?.length && state.notifications[0] || {};
    },
    getTotalPages(state) {
      return state.total_pages;
    },
  },
  mutations: {
    removeNotificationListData(state) {
      state.notifications = [];
    },
    setNotificationListData(state, {notifications, page_size, total_pages, count_unviewed_notifications}) {
      state.notifications =notifications || state.notifications;
      state.page_size = page_size || state.page_size;
      state.total_pages = total_pages || state.total_pages;
      state.count_unviewed_notifications = count_unviewed_notifications || state.count_unviewed_notifications;
    },
    updateNotification(state, payload) {
      state.notifications = state.notifications.map(notification =>
        notification.id === payload.id
          ? { ...notification, ...payload }
          : notification
      );
      state.count_unviewed_notifications -= 1;
    },
    addNotification(state, payload) {
      if (state.page_size === 0 || state.notifications.length < state.page_size) {
        state.notifications = [payload, ...state.notifications];
      } else {
        state.notifications.shift();
        state.notifications = [payload, ...state.notifications];
      }
      state.count_unviewed_notifications += 1;
    },
  },
};
