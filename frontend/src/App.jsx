import Events from "./pages/events";
import Tickets from "./pages/tickets";
import Settings from "./pages/settings";
import Layout from "./components/layout";
import Dashboard from "./pages/dashboard";
import EventDetails from "./pages/event-details";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
