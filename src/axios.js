import axios from 'axios';

const accessToken = localStorage.getItem('access_token') || ''

export const axiosInstance = axios.create({
  baseURL: `http://${process.env.VUE_APP_HOST}:${process.env.VUE_APP_PORT}`,
  headers: {
    'Authorization': `Bearer ${accessToken}`
  },
});
