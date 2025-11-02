import { getAllEvents } from "@/api/events";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyRegistrations } from "@/api/registration";
import { CalendarDays, TicketCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ events: 0, registrations: 0 });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [eventsRes, registrationsRes] = await Promise.all([
          getAllEvents(),
          getMyRegistrations(),
        ]);
        setStats({
          events: eventsRes?.length || 0,
          registrations: registrationsRes?.length || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <Card className="rounded-2xl shadow-sm border">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Welcome to Evently Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-base">
            Here’s an overview of your platform. Track events, manage
            registrations, and stay up-to-date with what’s happening.
          </p>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Total Events */}
        <Card
          onClick={() => navigate("/events")}
          className="cursor-pointer rounded-2xl transition-all hover:shadow-md hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium text-muted-foreground">
              Total Events
            </CardTitle>
            <CalendarDays className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold text-foreground">
              {stats.events}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Click to view all events
            </p>
          </CardContent>
        </Card>

        {/* Upcoming Registrations */}
        <Card
          onClick={() => navigate("/my-registrations")}
          className="cursor-pointer rounded-2xl transition-all hover:shadow-md hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium text-muted-foreground">
              Upcoming Events
            </CardTitle>
            <TicketCheck className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold text-foreground">
              {stats.registrations}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Click to see your registrations
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
