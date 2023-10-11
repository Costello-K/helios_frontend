import { axiosInstance } from '@/axios';
import { BaseApiController } from '@/api/BaseApiController';

class UsersApiController {
  constructor(ApiController) {
    this.baseApiClient = ApiController;
  }

  async getMyUser() {
    const path = '/auth/users/me/';
    return this.baseApiClient.makeRequest('GET', path);
  }

  async getUserProfile(id) {
    const path = `/v1/users/${id}/`;
    return this.baseApiClient.makeRequest('GET', path);
  }

  async getListUsers() {
    const path = '/v1/users/';
    return this.baseApiClient.makeRequest('GET', path);
  }
}

const usersApiController = new BaseApiController(axiosInstance);
export const usersApi = new UsersApiController(usersApiController);
