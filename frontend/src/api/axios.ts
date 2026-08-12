import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

import {
  getToken,
  getRefreshToken,
  saveTokens,
  clearAuth,
} from "@/features/auth/utils/token";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// -----------------------------
// Request Interceptor
// -----------------------------

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// -----------------------------
// Response Interceptor
// -----------------------------

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Only handle 401
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Don't try to refresh the refresh request
    if (originalRequest.url?.includes("/auth/refresh")) {
      clearAuth();
      return Promise.reject(error);
    }

    // Prevent infinite retry
    if (originalRequest._retry) {
      clearAuth();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      clearAuth();
      return Promise.reject(error);
    }

    try {
      // Use axios directly, not `api`
      // so this request doesn't trigger the interceptor again.
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
        {
          refreshToken,
        },
      );

      const newAccessToken = response.data.token;
      const newRefreshToken = response.data.refreshToken;

      // Save new tokens
      saveTokens(newAccessToken, newRefreshToken);

      // Update original request
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      // Retry original request
      return api(originalRequest);
    } catch (refreshError) {
      // Refresh token is invalid/expired
      clearAuth();

      return Promise.reject(refreshError);
    }
  },
);
