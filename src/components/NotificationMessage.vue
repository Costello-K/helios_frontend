<template>
  <div
      v-if="showMessageBox"
      class="message-box"
  >
    <div class="d-flex justify-space-between title-container">
      <h4 class="align-self-center title">
        {{ $t('titles.newNotification') }}
      </h4>
      <button
          @click="closeMessageBox"
          class="close-btn"
      >
        <v-icon>mdi-close</v-icon>
      </button>
    </div>
    <div class="message-text">
      {{ textNotification }}
    </div>
    <div class="text-center">
      <v-progress-circular
          :model-value="countdown"
          :size="35"
          :width="5"
          class="progress-bar"
      />
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    let countdownInterval;
    const store = useStore();
    const initialized = ref(false);
    const showMessageBox = ref(false);
    const textNotification = ref('');
    const countdown = ref(100);
    const countUnviewedNotifications = computed(() => {
      return store.getters['notificationList/getUnviewedNotificationCount'];
    });

    const closeMessageBox = () => {
      showMessageBox.value = false;
      clearInterval(countdownInterval);
    };

    watch(countUnviewedNotifications, (newValue, oldValue) => {
      if (newValue > oldValue && initialized.value) {
        const lastNotification = computed(() => store.getters['notificationList/getLastNotification']);
        textNotification.value = lastNotification.value.text;
        countdown.value = 100;
        showMessageBox.value = true;

        countdownInterval = setInterval(() => {
          countdown.value -= 1;
          if (countdown.value === 0) {
            closeMessageBox();
          }
        }, 100);
      }
      if (!initialized.value) {
        initialized.value = true;
      }
    });

    return {
      showMessageBox,
      textNotification,
      countdown,
      closeMessageBox,
    };
  }
};
</script>

<style>
.message-box {
  max-width: 350px;
  position: fixed;
  bottom: 10px;
  right: 10px;
  padding-bottom: 10px;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  transform: translateY(150%);
  animation: slideUpAnimation 1s forwards;
}
@keyframes slideUpAnimation {
  0% {transform: translateY(150%);}
  100% {transform: translateX(0);}
}
.title-container {
  border-bottom: 1px solid #6c6b6b;
}
.title {
  padding-left: 100px;
}
.message-text {
  font-size: 14px;
  margin: 10px;
}
.close-btn {
  margin-top: 5px;
  background-color: white;
  color: black;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
.progress-bar {
  color: #198ae3;
}
</style>
