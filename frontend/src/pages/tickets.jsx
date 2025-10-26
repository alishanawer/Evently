import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Tickets() {
  const tickets = [
    { id: "TCK-001", user: "Ali Shanawer", event: "Tech Meetup" },
    { id: "TCK-002", user: "Hassan Raza", event: "AI Workshop" },
    { id: "TCK-003", user: "Fatima Noor", event: "Startup Summit" },
  ];

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>User Name</TableHead>
                <TableHead>Event</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.id}</TableCell>
                  <TableCell>{ticket.user}</TableCell>
                  <TableCell>{ticket.event}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
