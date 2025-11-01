import { useEffect, useState } from "react";
import {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "@/api/events";
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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, CalendarIcon, Clock8 } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { TimePickerDemo } from "@/components/ui/time-picker-demo";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    price: 0,
  });

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

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      date: "",
      time: "",
      venue: "",
      price: 0,
    });
    setEditingEvent(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingEvent) {
        await updateEvent(editingEvent.event_id, form);
        toast.success("Event updated successfully!");
      } else {
        await createEvent(form);
        toast.success("Event created successfully!");
      }
      setOpen(false);
      resetForm();
      fetchEvents();
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Failed to save event");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!eventToDelete) return;
    try {
      await deleteEvent(eventToDelete);
      toast.success("Event deleted successfully!");
      fetchEvents();
    } catch {
      toast.error("Failed to delete event");
    } finally {
      setDeleteDialog(false);
      setEventToDelete(null);
    }
  };

  const openEditDialog = (event) => {
    setEditingEvent(event);
    setForm({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      venue: event.venue,
      price: event.price,
    });
    setOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Event Management</h1>
        <Button
          onClick={() => {
            resetForm();
            setOpen(true);
          }}>
          <Plus className="mr-2 h-4 w-4" /> Create Event
        </Button>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>All Events</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Manage all events from this panel.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Venue</TableHead>
                <TableHead>Price ($)</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground">
                    No events found.
                  </TableCell>
                </TableRow>
              ) : (
                events.map((event) => (
                  <TableRow key={event.event_id}>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{event.time}</TableCell>
                    <TableCell>{event.venue}</TableCell>
                    <TableCell>{event.price}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => openEditDialog(event)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => {
                          setEventToDelete(event.event_id);
                          setDeleteDialog(true);
                        }}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create / Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingEvent ? "Edit Event" : "Create Event"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                name="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                name="description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* ShadCN Date Picker */}
              <div>
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !form.date && "text-muted-foreground"
                      )}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {form.date
                        ? format(new Date(form.date), "PPP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={form.date ? new Date(form.date) : undefined}
                      onSelect={(d) =>
                        setForm({ ...form, date: format(d, "yyyy-MM-dd") })
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* ShadCN Time Picker */}
              <div>
                <Label>Time</Label>
                <TimePickerDemo
                  value={form.time}
                  onChange={(time) => setForm({ ...form, time })}
                />
              </div>
            </div>

            <div>
              <Label>Venue</Label>
              <Input
                name="venue"
                value={form.venue}
                onChange={(e) => setForm({ ...form, venue: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Price ($)</Label>
              <Input
                type="number"
                name="price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
              />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading
                  ? "Saving..."
                  : editingEvent
                  ? "Update Event"
                  : "Create Event"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this event? This action cannot be
            undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
