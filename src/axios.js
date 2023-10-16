import axios from 'axios';
import i18n from './i18n';
import { authUserApi } from '@/api';
import { auth } from '@/utils';
import { BASE_URL, NAME_ACCESS_TOKEN, NAME_REFRESH_TOKEN } from '@/constants';
import router from '@/router';

// Create an instance of Axios
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Function to update the access token
const updateAccessToken = async () => {
  // Get the refresh token from local storage
  const refreshToken = localStorage.getItem(NAME_REFRESH_TOKEN);

  if (!refreshToken) {
    return;
  }

  try {
    // Request a token refresh
    const response = await authUserApi.jwtRefresh(refreshToken, {'_retry': true});
    const newAccessToken = response.data.access;

    // Update the access token in local storage
    localStorage.setItem(NAME_ACCESS_TOKEN, newAccessToken);
    // Update the default Authorization header for Axios
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
  } catch (err) {
    console.error('Error while updating the token:', err);
    auth.logoutUser();
    axiosInstance.defaults.headers.common['Authorization'] = '';
    // Redirect to the authorization page
    router.push('/authorization');
  }
};

// Function to handle unauthorized errors
const handleUnauthorizedError = async (err) => {
  const originalRequest = err.config;

  // If the response status is 401 and this is not a retried request
  if (err.response?.status === 401 && !originalRequest._retry) {
    // Mark the request as retried
    originalRequest._retry = true;

    // Update the token and retry the original request
    await updateAccessToken();
    return axiosInstance(originalRequest);
  }
  return Promise.reject(err);
};

// Adding an interceptor for requests
axiosInstance.interceptors.request.use(
  (config) => {
    // get access token from localStorage
    const accessToken = localStorage.getItem(NAME_ACCESS_TOKEN);

    if (accessToken) {
      // add access token to request headers
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    // add the user's language to request headers
    config.headers['Accept-Language'] = i18n.global.locale.value;

    return config;
  },
  err => Promise.reject(err)
);

// Adding an interceptor for responses
axiosInstance.interceptors.response.use(
  response => response,
  handleUnauthorizedError
);
