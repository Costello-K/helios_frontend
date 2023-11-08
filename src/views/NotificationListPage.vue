<template>
  <CardList
      :title="$t('titles.notifications')"
      :data="notifications"
  >
    <template v-slot:default="{ item }">
      <NotificationCard :notification="item"/>
    </template>
  </CardList>
  <PaginationComponent
      :totalPages="totalPages"
      :updatePage="handlePageChange"
  />
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { notificationsApi } from '@/api';
import CardList from '@/components/CardList';
import NotificationCard from '@/components/NotificationCard';
import PaginationComponent from '@/components/PaginationComponent';

export default {
  name: 'NotificationPage',
  components: {
    CardList,
    NotificationCard,
    PaginationComponent,
  },
  setup() {
    const store = useStore();
    const notifications = computed(() => store.state.notificationList.notifications);
    const totalPages = computed(() => store.getters['notificationList/getTotalPages']);

    const getNotifications = async (page) => {
      try {
        const {
          data: {
            results,
            page_size,
            total_pages,
          },
        } = await notificationsApi.getListNotifications(page);
        store.commit('notificationList/setNotificationListData', {total_pages});
        return { results, page_size };
      } catch (err) {
        console.error(err);
      }
    };

    const handlePageChange = async (newPage) => {
      const { results } = await getNotifications(newPage);
      store.commit('notificationList/setNotificationListData', {notifications: results});
    };

    onMounted(async () => {
      const isWebSocketConnected = computed(() => store.getters['webSocketService/isWebSocketConnected']);
      if (!isWebSocketConnected.value) {
        const { results, page_size } = await getNotifications(1);
        store.commit('notificationList/setNotificationListData', results);
        store.commit('notificationList/setNotificationPageSize', page_size);
      }
    });

    return { notifications, totalPages, handlePageChange }
  },
};
</script>
