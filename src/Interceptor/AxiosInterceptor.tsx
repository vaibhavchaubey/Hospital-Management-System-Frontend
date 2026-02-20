import axios, { type InternalAxiosRequestConfig } from 'axios';

/**
 * API Base URL
 * - Uses VITE_API_URL from Vercel (production)
 * - Falls back to localhost for development
 */
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:9000';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor
 * - Attaches JWT token to every request
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor
 * - Automatically logs out user if token expires (401)
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
