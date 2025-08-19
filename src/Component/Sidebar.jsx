import React from "react";

const NAV = [
  { key: "home", label: "Home" },
  { key: "dashboard", label: "Dashboard" },
  { key: "about", label: "About" },
];

export default function Sidebar({ active = "dashboard", onNavigate }) {
  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="brand-mark" />
        <div>
          <div className="brand-title">MedAI</div>
          <div className="brand-sub">Cancer Suite</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {NAV.map((item) => {
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              className={`nav-item ${isActive ? "active" : ""}`}
              onClick={() => onNavigate?.(item.key)}
              type="button"
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-foot">© {new Date().getFullYear()} MedAI</div>
    </aside>
  );
}
