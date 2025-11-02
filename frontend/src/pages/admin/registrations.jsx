import { useEffect, useState } from "react";
import { getAllEvents } from "@/api/events";
import { getEventRegistrations, cancelRegistration } from "@/api/registration";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import { UserMinus } from "lucide-react";

export default function EventRegistrationsAdmin() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [registrationToCancel, setRegistrationToCancel] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getAllEvents();
      setEvents(data);
    } catch (err) {
      toast.error("Failed to load events");
    }
  };

  const fetchRegistrations = async (eventId) => {
    setLoading(true);
    try {
      const data = await getEventRegistrations(eventId);
      setRegistrations(data);
    } catch (err) {
      toast.error("Failed to load registrations");
    } finally {
      setLoading(false);
    }
  };

  const handleEventSelect = (eventId) => {
    setSelectedEvent(eventId);
    fetchRegistrations(eventId);
  };

  const handleCancelRegistration = async () => {
    if (!registrationToCancel) return;
    try {
      await cancelRegistration(registrationToCancel);
      setRegistrations((prev) =>
        prev.filter((reg) => reg.reg_id !== registrationToCancel)
      );
      toast.success("Registration cancelled successfully!");
    } catch (err) {
      toast.error("Failed to cancel registration");
    } finally {
      setDeleteDialog(false);
      setRegistrationToCancel(null);
    }
  };

  // 🕒 Format date like "Sat Nov 01 2025 - 16:01"
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return `${date.toDateString()} - ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Heading and Dropdown */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Event Registrations</h1>
        <div className="w-64">
          <Select onValueChange={handleEventSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select an event" />
            </SelectTrigger>
            <SelectContent>
              {events.map((event) => (
                <SelectItem
                  key={event.event_id}
                  value={event.event_id.toString()}>
                  {event.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Registrations Table */}
      {selectedEvent && (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>
              Registrations for{" "}
              {events.find((e) => e.event_id == selectedEvent)?.title || ""}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>
                {loading
                  ? "Loading registrations..."
                  : registrations.length === 0
                  ? "No registrations for this event."
                  : "List of participants registered for this event."}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>User Name</TableHead>
                  <TableHead>User Email</TableHead>
                  <TableHead>Ticket Status</TableHead>
                  <TableHead>Registered At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations.map((reg) => (
                  <TableRow key={reg.reg_id}>
                    <TableCell>{reg.user_name}</TableCell>
                    <TableCell>{reg.user_email}</TableCell>
                    <TableCell>{reg.ticket_status}</TableCell>
                    <TableCell>{formatDate(reg.reg_date)}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => {
                          setRegistrationToCancel(reg.reg_id);
                          setDeleteDialog(true);
                        }}>
                        <UserMinus className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Cancel Confirmation Dialog */}
      <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Registration</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to cancel this registration? This action
            cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog(false)}>
              Keep Registration
            </Button>
            <Button onClick={handleCancelRegistration}>
              Cancel Registration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
