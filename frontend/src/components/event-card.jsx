import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Calendar, Clock8, MapPin, DollarSign } from "lucide-react";
import { getUser } from "@/utils/user";
import { registerForEvent } from "@/api/registration";
import { toast } from "sonner";

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
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Fix for "Invalid Date" when time = "09:00:00"
function formatTime(timeString) {
  if (!timeString) return "";
  try {
    const [hours, minutes] = timeString.split(":");
    const d = new Date();
    d.setHours(Number(hours));
    d.setMinutes(Number(minutes));
    return d.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return timeString;
  }
}

export default function EventCard({ event }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const user = getUser();
      if (!user) {
        toast.error("You must be logged in to register.");
        setLoading(false);
        return;
      }

      await registerForEvent(event.event_id);
      toast.success(`You have successfully registered for "${event.title}".`);
      setOpen(false);
    } catch (err) {
      toast.error(
        err?.response?.data?.detail || "Failed to register. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>{formatDate(event.date)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock8 className="w-4 h-4 text-gray-500" />
              <span>{formatTime(event.time)}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>{event.venue}</span>
            </div>

            {event.price !== undefined && (
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <span>{event.price === 0 ? "Free" : `${event.price}`}</span>
              </div>
            )}
          </div>
        </CardContent>

        {/* Footer Section */}
        <CardFooter className="border-t border-gray-100">
          <Button className="w-full" onClick={() => setOpen(true)}>
            View Details
          </Button>
        </CardFooter>
      </Card>

      {/* Dialog Popup */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {event.title}
            </DialogTitle>
            <DialogDescription>
              Organized by Computer Science Department
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <div className="w-full h-52 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm">
              Event Image Placeholder
            </div>

            <p className="text-gray-700 text-sm leading-relaxed">
              {event.description}
            </p>

            <div className="flex flex-col gap-2 text-sm mt-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock8 className="w-4 h-4 text-gray-500" />
                <span>{formatTime(event.time)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>{event.venue}</span>
              </div>
              {event.price !== undefined && (
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span>{event.price === 0 ? "Free" : `${event.price}`}</span>
                </div>
              )}
            </div>

            {/* Register Button */}
            <Button
              className="mt-4 w-full"
              onClick={handleRegister}
              disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
