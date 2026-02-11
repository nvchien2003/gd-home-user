import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

export default function PrivateRoute() {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}
