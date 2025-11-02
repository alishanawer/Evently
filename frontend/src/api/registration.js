import api from "./axios";

export const registerForEvent = async (eventId) => {
  const response = await api.post(`/registrations/${eventId}`);
  return response.data;
};

export const getMyRegistrations = async () => {
  const response = await api.get("/registrations/me");
  return response.data;
};

export const getEventRegistrations = async (eventId) => {
  const response = await api.get(`/registrations/event/${eventId}`);
  return response.data;
};
