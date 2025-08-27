import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginCard() {
  const { login, error } = useAuth();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("demo123");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    const ok = await login(username.trim(), password);
    setSubmitting(false);
    if (!ok) {
      // Shake effect (optional)
      const el = e.currentTarget;
      el.style.transform = "translateX(-4px)";
      setTimeout(() => (el.style.transform = ""), 120);
    }
  }

  return (
    <section className="card auth-card">
      <div className="kpi-accent" aria-hidden />
      <header className="auth-head">
        <div>
          <div className="section-title">Sign in to continue</div>
          <div className="section-sub">Use demo credentials to view the full dashboard.</div>
        </div>
        <div className="auth-demo muted">Demo • admin / demo123</div>
      </header>

      <form onSubmit={onSubmit} className="form">
        <div className="form-row">
          <label className="form-label">Username</label>
          <input
            className="input"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div className="form-row">
          <label className="form-label">Password</label>
          <input
            className="input"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        {error && <div className="form-error">{error}</div>}

        <div className="form-actions">
          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign in"}
          </button>
          <span className="muted text-xs">Access unlocks KPIs, charts & triage.</span>
        </div>
      </form>
    </section>
  );
}
