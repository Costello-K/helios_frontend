import { axiosInstance } from '@/axios';
import { BaseApiClient } from '@/api/baseApiClient';

class UsersApiClient {
  constructor(baseApiClient) {
    this.baseApiClient = baseApiClient;
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

const usersApiClient = new BaseApiClient(axiosInstance);
export const usersApi = new UsersApiClient(usersApiClient);
