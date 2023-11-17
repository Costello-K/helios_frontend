import { axiosInstance } from '@/axios';
import { BaseApiController } from '@/api/BaseApiController';

class SocialAuthApiController {
  constructor(ApiController) {
    this.baseApiClient = ApiController;
  }

  // Get the URL for authentication through OAuth2.
  async getAuthUrl(typeSocialAuth) {
    const path = `/auth/o/${typeSocialAuth}/?redirect_uri=${process.env.FRONTEND_APP_URL}/authorization`;
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

const socialAuthApiController = new BaseApiController(axiosInstance);
export const socialAuthUserApi = new SocialAuthApiController(socialAuthApiController);
