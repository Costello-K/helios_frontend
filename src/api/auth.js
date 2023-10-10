import { axiosInstance } from '@/axios';
import { BaseApiClient } from './baseApiClient';

class UserApiClient {
  constructor(baseApiClient) {
    this.baseApiClient = baseApiClient;
  }

  async registerUser(formData) {
    const path = '/auth/users/';
    return this.baseApiClient.makeRequest('POST', path, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }

  async activationUserAccount(formData) {
    const path = '/auth/users/activation/';
    return this.baseApiClient.makeRequest('POST', path, formData);
  }

  async jwtCreate(formData) {
    const path = '/auth/jwt/create/';
    return this.baseApiClient.makeRequest('POST', path, formData);
  }

  async jwtRefresh(refreshToken, config = {}) {
    const path = '/auth/jwt/refresh/';
    return this.baseApiClient.makeRequest('POST', path, { 'refresh': refreshToken }, config);
  }

  // Reset a user's specified property using the provided form data.
  async resetUserData(formData, property) {
    const path = `/auth/users/reset_${property}/`;
    return this.baseApiClient.makeRequest('POST', path, formData);
  }

  // Confirm the reset a user's specified property using the provided form data.
  async resetUserDataConfirm(formData, property) {
    const path = `/auth/users/reset_${property}_confirm/`;
    return this.baseApiClient.makeRequest('POST', path, formData);
  }
}

const userApiClient = new BaseApiClient(axiosInstance);
export const authUserApi = new UserApiClient(userApiClient);
