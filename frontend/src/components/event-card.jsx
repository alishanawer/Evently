// src/components/event-card.jsx
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock8, MapPin } from "lucide-react";

// Small helper to truncate text without cutting words.
function truncate(text, max = 140) {
  if (!text) return "";
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return cut.slice(0, lastSpace > 0 ? lastSpace : max) + "…";
}

function formatDate(isoDate) {
  if (!isoDate) return "";
  const d = new Date(isoDate);
  // localized, short date e.g. "Nov 2, 2025"
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatTime(isoTime) {
  if (!isoTime) return "";
  const d = new Date(isoTime);
  // 12-hour time with minutes e.g. "1:30 PM"
  return d.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function EventCard({ event, showAction = true }) {
  const navigate = useNavigate();

  return (
    <Card
      key={event.event_id}
      className="flex flex-col overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200">
      {/* Event Image Placeholder */}
      <div className="bg-gray-200 h-40 flex items-center justify-center text-gray-500 text-sm">
        Image Placeholder
      </div>

      {/* Event Header */}
      <CardHeader className="pb-1">
        <CardTitle className="text-xl font-semibold text-gray-800">
          {event.title}
        </CardTitle>
      </CardHeader>

      {/* Event Content */}
      <CardContent className="flex-1 text-gray-600">
        <p className="text-sm mb-3 line-clamp-2">
          {truncate(event.description)}
        </p>

        <div className="flex flex-col gap-1 mt-3 text-sm">
          {/* Date */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span>{formatDate(event.date)}</span>
          </div>

          {/* Time */}
          <div className="flex items-center gap-2">
            <Clock8 className="w-4 h-4 text-gray-500" />
            <span>{formatTime(event.time)}</span>
          </div>

          {/* Venue */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>{event.venue}</span>
          </div>
        </div>
      </CardContent>

      {/* Footer Section */}
      <CardFooter className="flex flex-col items-start border-t border-gray-100">
        <Button
          className="w-full"
          onClick={() => navigate(`/events/${event.event_id}`)}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
