import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "@/utils/token";
import { getUser, isAdmin } from "@/utils/user";

export default function ProtectedRoute({ adminOnly = false }) {
  const token = getToken();
  const user = getUser();

  // 1️⃣ Not logged in → redirect to login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // 2️⃣ If admin route but user is not admin → redirect to dashboard
  if (adminOnly && !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  // 3️⃣ Otherwise → render child routes
  return <Outlet />;
}
