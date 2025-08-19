import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-10 surface border-b" style={{borderColor:'var(--card-border)'}}>
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="badge">Live</span>
          <span className="muted text-sm">Model v3.2 • 92% detection</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            className="card px-3 py-2 text-sm"
            placeholder="Search patients, IDs, alerts…"
            style={{minWidth:240}}
          />
          <button onClick={toggleTheme} className="btn" aria-label="Toggle theme">
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
          <div className="card h-9 w-9 rounded-full grid place-items-center font-semibold">PP</div>
        </div>
      </div>
    </header>
  );
}
