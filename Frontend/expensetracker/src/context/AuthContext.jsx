import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    if (user && user.token) {
      localStorage.setItem("token", user.token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isAdmin", user.isAdmin ? "true" : "false");
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
    }
  }, [user]);

  const register = async (data) => {
    const res = await api.post("/auth/register", data);
    const payload = { ...res.data.user, token: res.data.token };
    setUser(payload);
    return payload;
  };

  const login = async (data) => {
    const res = await api.post("/auth/login", data);
    const payload = { ...res.data.user, token: res.data.token };
    setUser(payload);
    return payload;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
