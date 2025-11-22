import { useContext } from "react";
import { UserContext } from "../auth/Auth.jsx";

const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within an UserProvider");
  }

  return context;
};

export { useAuth };
