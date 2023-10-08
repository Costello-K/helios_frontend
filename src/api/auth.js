import { axiosInstance } from '@/axios';

/**
 * Register a new user
 * @param {Object} formData - User registration data
 */
export const registerUser = async (formData) => {
  try {
    return await axiosInstance.post(
      '/auth/users/',
      formData,
      {
      headers: {'Content-Type': 'multipart/form-data'}
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * Activate a user account
 * @param {Object} formData - Activation form data.
 */
export const activationUserAccount = async (formData) => {
  try {
    return await axiosInstance.post('/auth/users/activation/', formData);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * Create a JSON Web Token (JWT)
 * @param {Object} formData - JWT creation form data.
 */
export const jwtCreate = async (formData) => {
  try {
    return await axiosInstance.post('/auth/jwt/create/', formData);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * Refresh a JSON Web Token (JWT)
 * @param {string} refreshToken - The refresh token.
 * @param {Object} config - Optional configuration for the request.
 */
export const jwtRefresh = async (refreshToken, config={}) => {
  try {
    return await axiosInstance.post('/auth/jwt/refresh/', { 'refresh': refreshToken }, config);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Reset a user's specified property using the provided form data.
 * @param {Object} formData - The form data for resetting the property.
 * @param {string} property - The name of the property to reset.
 */
export const resetUserData = async (formData, property) => {
  try {
    return await axiosInstance.post(`/auth/users/reset_${property}/`, formData);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * Confirm the reset a user's specified property using the provided form data.
 * @param {Object} formData - The form data for confirming the property reset.
 * @param {string} property - The name of the property to confirm reset.
 */
export const resetUserDataConfirm = async (formData, property) => {
  try {
    return await axiosInstance.post(`/auth/users/reset_${property}_confirm/`, formData);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
