"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface AuthContextType {
  token: string | null;
  login: (token: string, email: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  userEmail: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("email");
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const login = (newToken: string, email: string) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("email", email);
    setToken(newToken);
    setUserEmail(email);
    toast.success("Successfully logged in");
    router.push("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setToken(null);
    setUserEmail(null);
    toast.success("Logged out");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token, userEmail }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
