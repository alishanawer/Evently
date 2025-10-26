import { useParams } from "react-router-dom";
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
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function EventDetails() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock data
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 10000); // Auto-hide after 3s
  };

  return (
    <div className="p-4 flex flex-col items-center space-y-4">
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
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">Register</Button>
            </DialogTrigger>

            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Register for {event.title}</DialogTitle>
                <DialogDescription>
                  Fill out your details below to confirm your spot.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit}>
                <FieldSet>
                  <FieldLegend>Participant Info</FieldLegend>
                  <FieldGroup className="mt-4 space-y-3">
                    <Field>
                      <FieldLabel htmlFor="name">Full Name</FieldLabel>
                      <Input id="name" placeholder="Ali Shanawer" required />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="phone">Phone</FieldLabel>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+92 3xx xxxxxxx"
                        required
                      />
                    </Field>
                  </FieldGroup>
                </FieldSet>

                <DialogFooter className="mt-6">
                  <Button type="submit" className="w-full">
                    Submit Registration
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>

      {showSuccess && (
        <Alert className="max-w-lg w-full border-green-600">
          <AlertTitle>🎉 Registration Successful!</AlertTitle>
          <AlertDescription>
            You’ve successfully registered for <b>{event.title}</b>. Check your
            email for confirmation.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
