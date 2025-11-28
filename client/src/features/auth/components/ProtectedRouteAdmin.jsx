import { Navigate } from "react-router-dom";
import { useAuth } from "/src/features/auth/hooks/useAuth.js";

const ProtectedRouteAdmin = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRouteAdmin;
