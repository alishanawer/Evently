import { parseJwt } from "./token";

export const saveUser = (loginData) => {
  const user = {
    id: loginData.id,
    name: loginData.name,
    email: loginData.email,
    role: loginData.role,
  };
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

export const removeUser = () => {
  localStorage.removeItem("user");
};

export const isAdmin = () => {
  const user = getUser();
  if (user && user.role === "admin") return true;
  // fallback: check token payload role if present (less trusted)
  const token = localStorage.getItem("access_token");
  if (!token) return false;
  const payload = parseJwt(token);
  return payload?.role === "admin";
};
