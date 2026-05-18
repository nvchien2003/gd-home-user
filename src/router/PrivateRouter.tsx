import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/auth.context";

export default function PrivateRoute() {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}
