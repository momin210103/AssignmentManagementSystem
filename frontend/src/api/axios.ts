import axios from "axios";
import { getToken } from "@/features/auth/utils/token";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,

  //! globaly remove for the any type files 
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
