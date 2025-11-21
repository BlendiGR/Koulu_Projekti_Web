import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  // Sisään kirjautuminen
  const login = async (credentials) => {
    // TODO: täytä tämä backend-kutsulla.
    // setToken(token)
    // localStorage.setItem("token", token)
    // setUser(user)
  };

  // Ulos kirjautuminen
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  // Hae käyttäjätiedot jokasella page refreshillä, jos token on asetettu
  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {};

    fetchUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
