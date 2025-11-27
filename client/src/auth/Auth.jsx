import { createContext, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useUser } from "/src/hooks/apiHooks";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { getUserByToken, postLogin } = useUser();

  const handleLogin = async (credentials) => {
    const loginRes = await postLogin(credentials);

    if (!loginRes.success) {
      return loginRes;
    }

    const data = loginRes.data.data;

    const token = data.token;
    localStorage.setItem("token", token);

    setUser(data.userWithoutPassword);
    navigate("/");

    return { success: true };
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const handleAutoLogin = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    console.log("firing!");
    const meRes = await getUserByToken();

    if (!meRes.success) {
      localStorage.removeItem("token");
      return;
    }
    setUser(meRes.data);
    navigate(location.pathname);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        handleLogin,
        handleLogout,
        handleAutoLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
