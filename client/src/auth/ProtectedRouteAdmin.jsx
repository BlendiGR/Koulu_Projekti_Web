import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRouteAdmin = ({ children }) => {
  const { user } = useAuth();

  if (!user.role === "ADMIN") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRouteAdmin;
