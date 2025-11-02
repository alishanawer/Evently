import { useEffect, useState } from "react";
import { getMyRegistrations } from "@/api/registration";
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
import { toast } from "sonner";
import { UserMinus } from "lucide-react";

export default function Registrations() {
  const [registrations, setRegistrations] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [registrationToCancel, setRegistrationToCancel] = useState(null);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const data = await getMyRegistrations();
      setRegistrations(data);
    } catch (err) {
      toast.error("Failed to load registrations");
    }
  };

  // Mock cancel registration API call
  const handleCancelRegistration = async () => {
    if (!registrationToCancel) return;

    try {
      // Simulate API delay
      await new Promise((res) => setTimeout(res, 600));
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

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">My Registrations</h1>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>All Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Your registered events appear below.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Venue</TableHead>
                <TableHead>Price ($)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registrations.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-muted-foreground">
                    No registrations found.
                  </TableCell>
                </TableRow>
              ) : (
                registrations.map((reg) => (
                  <TableRow key={reg.reg_id}>
                    <TableCell>{reg.event_title}</TableCell>
                    <TableCell>{reg.event_date}</TableCell>
                    <TableCell>{reg.event_time}</TableCell>
                    <TableCell>{reg.event_venue}</TableCell>
                    <TableCell>{reg.event_price}</TableCell>
                    <TableCell>{reg.ticket_status}</TableCell>
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
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
