import { axiosInstance } from '@/axios';
import { BaseApiClient } from '@/api/baseApiClient';

class SocialAuthApiClient {
  constructor(baseApiClient) {
    this.baseApiClient = baseApiClient;
  }

  // Get the URL for authentication through OAuth2.
  async getAuthUrl(typeSocialAuth) {
    const frontHost = process.env.FRONTEND_APP_HOST;
    const frontPort = process.env.FRONTEND_APP_PORT;
    const path = `/auth/o/${typeSocialAuth}/?redirect_uri=http://${frontHost}:${frontPort}/authorization`;
    return this.baseApiClient.makeRequest('GET', path, {}, { withCredentials: true });
  }

  // Exchange an authorization code for access and refresh tokens through OAuth2.
  async getTokens(typeSocialAuth, code, state) {
    const path = `/auth/o/${typeSocialAuth}/`;
    const data = { code, state };
    const config = {
      headers: { 'Content-Type': 'multipart/form-data; charset=utf-8' },
      withCredentials: true,
    };
    return this.baseApiClient.makeRequest('POST', path, data, config);
  }
}

const socialAuthApiClient = new BaseApiClient(axiosInstance);
export const socialAuthUserApi = new SocialAuthApiClient(socialAuthApiClient);
