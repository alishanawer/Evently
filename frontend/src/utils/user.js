export const saveUser = (loginData) => {
  let user = {
    id: loginData.id,
    name: loginData.name,
    email: loginData.email,
    role: loginData.role,
  };
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const removeUser = () => {
  localStorage.removeItem("user");
};

export const isAdmin = () => {
  const user = getUser();
  return user && user.role === "admin";
};
