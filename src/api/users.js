import { axiosInstance } from '@/axios';
import { BaseApiController } from '@/api/BaseApiController';
import { computed } from 'vue';
import store from '@/store';

class UsersApiController {
  constructor(ApiController) {
    this.baseApiClient = ApiController;
    this.authUserId = computed(() => store.getters['authUser/getUserId']);
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
    const path = `v1/users/${this.authUserId.value}/`;
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

  async getListUsers(page, company_id='') {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('company_id', company_id);

    const path = `/v1/users/?${params.toString()}`;
    return this.baseApiClient.makeRequest('GET', path);
  }

  async getAdminCompaniesList(page) {
    const path = `/v1/users/${this.authUserId.value}/admins/?${page}`;
    return this.baseApiClient.makeRequest('GET', path);
  }

  async getMemberCompaniesList(page) {
    const path = `/v1/users/${this.authUserId.value}/members/?${page}`;
    return this.baseApiClient.makeRequest('GET', path);
  }
}

const usersApiController = new BaseApiController(axiosInstance);
export const usersApi = new UsersApiController(usersApiController);
