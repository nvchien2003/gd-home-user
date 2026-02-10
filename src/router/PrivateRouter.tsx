import { Navigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

export default function PrivateRoute({ children }: any) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
