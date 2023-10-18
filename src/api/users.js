import { axiosInstance } from '@/axios';
import { BaseApiController } from '@/api/BaseApiController';
import { computed, ref } from 'vue';
import store from '@/store';

class UsersApiController {
  constructor(ApiController) {
    this.baseApiClient = ApiController;
  }

  async getMyUser() {
    const path = '/auth/users/me/';
    return this.baseApiClient.makeRequest('GET', path);
  }

  async changeUserProfile(formData) {
    const path = '/auth/users/me/';
    return this.baseApiClient.makeRequest(
      'PATCH',
      path,
      formData,
      { headers: {'Content-Type': 'multipart/form-data'} },
    );
  }

  async updateUserAvatar(formData) {
    const authUserId = ref(computed(() => store.getters['authUser/getUserId']))
    const path = `v1/users/${authUserId.value}/`;
    return this.baseApiClient.makeRequest(
      'PATCH',
      path,
      formData,
      { headers: {'Content-Type': 'multipart/form-data'} },
    );
  }

  async changeUserPassword(formData) {
    const path = '/auth/users/set_password/';
    return this.baseApiClient.makeRequest('POST', path, formData);
  }

  async deleteMyUser(formData) {
    const path = '/auth/users/me/';
    return this.baseApiClient.makeRequest('DELETE', path, formData);
  }

  async getUserProfile(id) {
    const path = `/v1/users/${id}/`;
    return this.baseApiClient.makeRequest('GET', path);
  }

  async getListUsers(page) {
    const path = `/v1/users/?page=${page}`;
    return this.baseApiClient.makeRequest('GET', path);
  }
}

const usersApiController = new BaseApiController(axiosInstance);
export const usersApi = new UsersApiController(usersApiController);
