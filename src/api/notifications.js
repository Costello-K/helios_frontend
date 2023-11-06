import { axiosInstance } from '@/axios';
import { BaseApiController } from '@/api/BaseApiController';
import { computed, ref } from 'vue';
import store from '@/store';

class NotificationsApiController {
  constructor(ApiController) {
    this.baseApiClient = ApiController;
    this.authUserId = ref(computed(() => store.getters['authUser/getUserId']))
  }

  async getListNotifications(page) {
    const path = `/v1/users/${this.authUserId.value}/notifications/?page=${page}`;
    return this.baseApiClient.makeRequest('GET', path);
  }

  async setViewedStatus(notification_id) {
    const path = `/v1/users/${this.authUserId.value}/notifications/${notification_id}/view/`;
    return this.baseApiClient.makeRequest('POST', path);
  }
}

const notificationsApiController = new BaseApiController(axiosInstance);
export const notificationsApi = new NotificationsApiController(notificationsApiController);
