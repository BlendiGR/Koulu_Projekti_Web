import { redirect } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

async function authMiddleware({ context }) {
  const user = await getUser();
  if (!user) {
    throw redirect("/login");
  }
  context.set(userContext, user);
}

const AuthMiddleware = () => {
  const { user } = useAuth();

  if (!user) {
    redirect("/login");
  }
  return;
};

export default AuthMiddleware;
