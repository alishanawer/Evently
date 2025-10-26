import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data (same as EventsPage for now)
  const events = [
    {
      id: 1,
      title: "Tech Meetup",
      date: "2025-11-02",
      price: "Free",
      description:
        "A meetup for tech enthusiasts to network and discuss new technologies.",
    },
    {
      id: 2,
      title: "AI Workshop",
      date: "2025-11-05",
      price: "$10",
      description:
        "Hands-on workshop covering the basics of AI and ML with practical examples.",
    },
    {
      id: 3,
      title: "Startup Summit",
      date: "2025-11-10",
      price: "$20",
      description:
        "A summit bringing together entrepreneurs, investors, and innovators.",
    },
  ];

  const event = events.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <p className="p-4 text-center text-muted-foreground">Event not found.</p>
    );
  }

  return (
    <div className="p-4 flex justify-center">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <CardTitle>{event.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2">📅 {event.date}</p>
          <p className="text-sm text-muted-foreground mb-2">💰 {event.price}</p>
          <p className="mt-4 text-base">{event.description}</p>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => navigate(`/register/${event.id}`)}>
            Register
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
