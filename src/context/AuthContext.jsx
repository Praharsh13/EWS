import React, { createContext, useContext, useMemo, useState } from "react";

// Predefined credentials (you can move this to /data/auth.js if you prefer)
const USERS = [
  { id: "u1", name: "Admin", username: "admin", password: "demo123", role: "admin" },
  { id: "u2", name: "Reviewer", username: "review", password: "demo123", role: "viewer" },
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  function login(username, password) {
    const found = USERS.find(u => u.username === username && u.password === password);
    if (found) {
      setUser({ id: found.id, name: found.name, role: found.role, username: found.username });
      setError("");
      return true;
    }
    setError("Invalid username or password");
    setUser(null);
    return false;
  }

  function logout() {
    setUser(null);
    setError("");
  }

  const value = useMemo(() => ({ user, error, login, logout }), [user, error]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
