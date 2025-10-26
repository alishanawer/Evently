// src/api/events.js
import api from "./axios";

// Mock fallback (until backend ready)
const mockEvents = [
  { id: 1, title: "Tech Meetup", date: "2025-11-02", price: "Free" },
  { id: 2, title: "AI Workshop", date: "2025-11-05", price: "$10" },
  { id: 3, title: "Startup Summit", date: "2025-11-10", price: "$20" },
];

// Get all events
export const getEvents = async () => {
  try {
    // const response = await api.get("/events");
    // return response.data;
    return mockEvents; // fallback
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

// Get single event by ID
export const getEventById = async (id) => {
  try {
    // const response = await api.get(`/events/${id}`);
    // return response.data;
    return mockEvents.find((event) => event.id === Number(id));
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
};
