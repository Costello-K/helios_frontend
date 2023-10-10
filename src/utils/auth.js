import { NAME_ACCESS_TOKEN, NAME_REFRESH_TOKEN, TYPE_SOCIAL_AUTH } from '@/constants';
import store from '@/store';

// Set the access and refresh tokens in local storage
export const setTokens = data => {
  const { access, refresh } = data;
  localStorage.setItem(NAME_ACCESS_TOKEN, access);
  localStorage.setItem(NAME_REFRESH_TOKEN, refresh);
};

// Remove the access and refresh tokens from local storage
export const removeTokens = () => {
  localStorage.removeItem(NAME_ACCESS_TOKEN);
  localStorage.removeItem(NAME_REFRESH_TOKEN);
  localStorage.removeItem(TYPE_SOCIAL_AUTH);
};

// Logout the currently authenticated user by removing tokens and user data from storage
export const logoutUser = () => {
  removeTokens();
  store.commit('authUser/removeUserData');
};
