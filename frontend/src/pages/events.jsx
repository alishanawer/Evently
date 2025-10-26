import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Events() {
  const navigate = useNavigate();

  const events = [
    { id: 1, title: "Tech Meetup", date: "2025-11-02", price: "Free" },
    { id: 2, title: "AI Workshop", date: "2025-11-05", price: "$10" },
    { id: 3, title: "Startup Summit", date: "2025-11-10", price: "$20" },
    { id: 4, title: "Tech Meetup", date: "2025-11-02", price: "Free" },
    { id: 5, title: "AI Workshop", date: "2025-11-05", price: "$10" },
    { id: 6, title: "Startup Summit", date: "2025-11-10", price: "$20" },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">📅 {event.date}</p>
              <p className="text-sm text-muted-foreground">💰 {event.price}</p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => navigate(`/events/${event.id}`)}>
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
