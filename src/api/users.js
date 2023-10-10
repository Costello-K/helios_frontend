import { axiosInstance } from '@/axios';
import { computed, ref } from 'vue';
import store from '@/store';

/**
 * Get the currently authenticated user's profile.
 */
export const getMyUser = async () => {
  try {
    return await axiosInstance.get('/auth/users/me/');
  } catch (err) {
    console.error(err);
  }
};

/**
 * Change the user's profile data.
 * @param {FormData} formData - The form data containing the updated user profile information.
 */
export const changeUserProfile = async (formData) => {
  try {
    return await axiosInstance.patch(
      '/auth/users/me/',
      formData,
      {
        headers: {'Content-Type': 'multipart/form-data'},
      }
  );
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * Update the user's avatar.
 * @param {FormData} formData - The form data containing the new user avatar image.
 */
export const updateUserAvatar = async (formData) => {
  try {
    const authUserId = ref(computed(() => store.getters['authUser/getUserId']));

    return await axiosInstance.patch(
      `v1/users/${authUserId.value}/`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      }
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * Change the user's password.
 * @param {FormData} formData - The form data containing the new user password.
 */
export const changeUserPassword = async (formData) => {
  try {
    return await axiosInstance.post('/auth/users/set_password/', formData);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * Delete the currently authenticated user's profile.
 * @param {FormData} formData - The form data for user profile deletion (if needed).
 */
export const deleteMyUser = async (formData) => {
  try {
    return await axiosInstance.delete('/auth/users/me/', { data: formData });
  } catch (err) {
    console.error(err);
    throw err;
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
export const getListUsers = async (page) => {
  try {
    return await axiosInstance.get(`/v1/users/?page=${page}`);
  } catch (err) {
    console.error(err);
  }
};
