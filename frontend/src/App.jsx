import Events from "./pages/events";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import Layout from "./components/layout";
import Dashboard from "./pages/dashboard";
import AdminEvents from "./pages/admin/events";
import Registrations from "./pages/registrations";
import ProtectedRoute from "./components/protected-route";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventRegistrationsAdmin from "./pages/admin/registrations";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected User Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/events" element={<Events />} />
            <Route path="/my-registrations" element={<Registrations />} />
          </Route>
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute adminOnly />}>
          <Route element={<Layout />}>
            <Route path="/manage-events" element={<AdminEvents />} />
            <Route
              path="/manage-registrations"
              element={<EventRegistrationsAdmin />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
