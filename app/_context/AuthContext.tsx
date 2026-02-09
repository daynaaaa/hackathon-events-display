"use client";
import { createContext, useState, ReactNode, useEffect } from "react";
import { User } from "../_lib/types";

interface AuthContext {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // User object
  const [user, setUser] = useState<User | null>(null);

  // Fetch user from localStorage upon render
  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        const u: User = { username: loggedInUser, password: "" };
        setUser(u);
      }
    };
    fetchUser();
  }, []);

  // Allow user to login
  const login = (user: User) => {
    setUser(user);
    localStorage.setItem("user", user.username);
  };

  // Allow user to logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
