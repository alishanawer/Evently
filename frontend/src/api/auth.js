import api from "./axios";
import { saveUser } from "@/utils/user";
import { saveToken } from "@/utils/token";

export const signup = async (userData) => {
  const response = await api.post("/auth/signup", userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  const { access_token } = response.data;
  saveToken(access_token);
  saveUser(response.data);
  return access_token;
};
