import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(
    localStorage.getItem("authToken"),
  );
  const navigate = useNavigate();

  const setToken = (newToken: string) => {
    setTokenState(newToken);
    localStorage.setItem("authToken", newToken);
  };

  const logout = () => {
    setTokenState(null);
    localStorage.removeItem("authToken");
    navigate("/login", { replace: true });
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
};
