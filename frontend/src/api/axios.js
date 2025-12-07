// src/api/axios.js
import axios from "axios";
import { getToken, removeToken } from "@/utils/token";
import { removeUser } from "@/utils/user";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: auto sign-out on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      removeToken();
      removeUser();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
