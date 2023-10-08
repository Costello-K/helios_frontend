import { axiosInstance } from '@/axios';

/**
 * Get the currently authenticated user's profile.
 */
export const getMyUser = async () => {
  try {
    return await axiosInstance.get(`/auth/users/me/`);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Get the profile of a specific user by their ID.
 * @param {number} id - The ID of the user whose profile is to be retrieved.
 */
export const getUserProfile = async (id) => {
  try {
    return await axiosInstance.get(`/v1/users/${id}/`);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Get a list of all users.
 */
export const getListUsers = async () => {
  try {
    return await axiosInstance.get(`/v1/users/`);
  } catch (err) {
    console.error(err);
  }
};
