import api from "./axios";
import { saveToken } from "@/utils/token";

export const signup = async (userData) => {
  const response = await api.post("/auth/signup", userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  const { access_token } = response.data;
  saveToken(access_token);
  return access_token;
};
