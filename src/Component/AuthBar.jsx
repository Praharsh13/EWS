import React from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthBar() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="auth-badge">
        <span className="dot red" />
        Guest
      </div>
    );
  }

  return (
    <div className="auth-wrap">
      <div className="auth-badge">
        <span className="dot green" />
        {user.name} · {user.role}
      </div>
      <button className="btn" onClick={logout}>Logout</button>
    </div>
  );
}
