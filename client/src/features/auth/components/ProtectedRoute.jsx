import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "/src/features/auth/hooks/useAuth.js";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
