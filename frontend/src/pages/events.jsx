import React, { useEffect, useState } from "react";
import EventCard from "@/components/event-card";
import { getAllEvents } from "@/api/events";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/loader";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    getAllEvents()
      .then((data) => {
        if (!mounted) return;
        setEvents(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        setError(err?.response?.data?.detail || "Failed to load events");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [navigate]);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Upcoming Events</h1>
      </div>

      {loading && <Loader />}

      {error && (
        <div className="rounded bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && events.length === 0 && (
        <div className="text-center text-muted-foreground py-12">
          No upcoming events. Check back later.
        </div>
      )}

      {!loading && !error && events.length > 0 && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((ev) => (
            <EventCard key={ev.event_id} event={ev} />
          ))}
        </div>
      )}
    </div>
  );
}
