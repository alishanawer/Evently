import Events from "./pages/events";
import LoginPage from "./pages/login";
import Settings from "./pages/settings";
import SignupPage from "./pages/signup";
import Layout from "./components/layout";
import Dashboard from "./pages/dashboard";
import Tickets from "./pages/registrations";
import AdminEvents from "./pages/admin/events";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventRegistrationsAdmin from "./pages/admin/registrations";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route
            path="/admin/registrations"
            element={<EventRegistrationsAdmin />}
          />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
