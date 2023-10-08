import { axiosInstance } from '@/axios';
const frontHost = process.env.FRONTEND_APP_HOST
const frontPort = process.env.FRONTEND_APP_PORT

/**
 * Get the URL for authentication through OAuth2.
 * @param {string} typeSocialAuth - The type of social authentication provider (e.g., 'facebook' or 'google-oauth2').
 * @returns {Promise} - A Promise object that resolves with the authentication URL.
 */
export const getAuthUrl = async (typeSocialAuth) => {
  try {
    return await axiosInstance.get(
      `/auth/o/${typeSocialAuth}/?redirect_uri=http://${frontHost}:${frontPort}/authorization`,
      { withCredentials: true });
  } catch (err) {
    console.error(err);
  }
};

/**
 * Exchange an authorization code for access and refresh tokens through OAuth2.
 * @param {string} typeSocialAuth - The type of social authentication provider (e.g., 'facebook' or 'google-oauth2').
 * @param {string} code - The authorization code.
 * @param {string} state - The state parameter.
 * @returns {Promise} - A Promise object that resolves with the result of code exchange.
 */
export const getTokens = async (typeSocialAuth, code, state) => {
  try {
    return await axiosInstance.post(`/auth/o/${typeSocialAuth}/`,
      { code, state },
      {
        headers: { 'Content-Type': 'multipart/form-data; charset=utf-8' },
        withCredentials: true,
      }
    );
  } catch (err) {
    console.error(err);
  }
};
