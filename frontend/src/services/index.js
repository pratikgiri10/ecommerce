import { apiURL } from "@/constants";
import axios from "axios";

export const api = axios.create({
    baseURL: apiURL,
    timeout: 5 * 60 * 1000,
    withCredentials: true
})

// redirect user to login page if, user is not authenticated or on token expiration
api.interceptors.response.use((res) => {
  if (res.status === 401) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    location.replace('/login');
    return Promise.reject('Unauthorized request');
  }
  return res;
});

export const authenticated = (apiInstance) => {
    const token = localStorage.getItem('accessToken')
    if(!token) return apiInstance
    if (import.meta.env.VITE_NODE_ENV === 'development') {
        apiInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
      } else {
        apiInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
        apiInstance.defaults.withCredentials = false;
      }
      return apiInstance;

}