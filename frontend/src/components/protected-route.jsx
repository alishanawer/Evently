import { Navigate, Outlet } from "react-router-dom";
import { getToken, isTokenValid } from "@/utils/token";
import { getUser, isAdmin } from "@/utils/user";

export default function ProtectedRoute({ adminOnly = false }) {
  const token = getToken();
  const user = getUser();

  // Quick client-side token expiry check
  const valid = token && isTokenValid();

  // Not logged in or token invalid → redirect to login
  if (!valid || !user) {
    // clear stale credentials to avoid loops
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }

  // If admin-only route but user is not admin → redirect to dashboard
  if (adminOnly && !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
