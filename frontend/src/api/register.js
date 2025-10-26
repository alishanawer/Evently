// src/api/register.js
import api from "./axios";

export const registerForEvent = async (formData) => {
  try {
    // const response = await api.post("/register", formData);
    // return response.data;
    console.log("Mock register:", formData);
    return { success: true, message: "Registration successful (mock)" };
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};
