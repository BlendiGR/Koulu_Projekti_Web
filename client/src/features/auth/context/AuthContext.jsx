import { createContext, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useUser } from "/src/hooks/apiHooks";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
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

    const user = data.userWithoutPassword;
    const token = data.token;

    localStorage.setItem("token", token);
    setUser(user);


    if (user.role === "ADMIN") {
      navigate("/admin");
      return { success: true };
    }

    navigate("/");

    return { success: true };
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const handleAutoLogin = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const meRes = await getUserByToken();

    if (!meRes.success) {
      localStorage.removeItem("token");
      return;
    }
    setUser(meRes.data);
    navigate(location.pathname);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        handleLogin,
        handleLogout,
        handleAutoLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
