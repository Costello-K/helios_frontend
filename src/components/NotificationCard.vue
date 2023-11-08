<template>
  <div class="card-container">
    <v-card-text class="notification-text">
      {{ notification.text }}
    </v-card-text>
    <div class="status-group">
      <div class="text-left">
        <CardInfoLine
            :label="$t('fields.status')"
            :value="notification.status.toUpperCase()"
            class="py-1"
        />
        <CardInfoLine
            :label="$t('fields.date')"
            :value="$filters.formatTime(notification.created_at)"
            class="py-1"
        />
      </div>
      <BaseButton
          v-if="notification.status.toUpperCase() !== NOTIFICATION_STATUS.viewed"
          class="mr-5 align-self-center"
          :button-name="$t('buttons.markAsViewed')"
          @click="setViewedStatus"
      />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { notificationsApi } from '@/api';
import { NOTIFICATION_STATUS } from '@/constants';
import CardInfoLine from '@/components/CardInfoLine';
import BaseButton from '@/components/BaseButton';

export default {
  name: 'NotificationCard',
  components: {
    BaseButton,
    CardInfoLine,
  },
  props: {
    notification: Object,
  },
  setup(props) {
    const store = useStore();

    const setViewedStatus = async () => {
      const isWebSocketConnected = computed(() => store.getters['webSocketService/isWebSocketConnected']);
      try {
        if (!isWebSocketConnected.value) {
          const { status, data } = await notificationsApi.setViewedStatus(props.notification.id);
          if (status === 200) {
            store.commit('notificationList/updateNotification', data);
          }
        } else {
          await store.dispatch('webSocketService/updateStatusNotification', props.notification);
        }
      } catch (err) {
        console.error(err);
      }
    }

    return { NOTIFICATION_STATUS, setViewedStatus }
  }
}
</script>

<style scoped>
.card-container {
  height: 120px;
  border: 1px solid #6c6b6b;
  box-shadow: 0 0 5px #6c6b6b;
}
.notification-text {
  height: calc(100% - 55px);
}
.status-group {
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
}
</style>
