
import React, { useState } from "react";
import Sidebar from "./Sidebar.jsx";

export default function Layout({ active = "dashboard", onNavigate, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="layout">
      {/* Mobile top bar */}
      <div className="topbar md:hidden">
        <button className="hamburger" onClick={() => setOpen(true)} aria-label="Open menu">☰</button>
        <div className="topbar-title">AI Cancer Detection</div>
      </div>

      {/* Sidebar (desktop) */}
      <div className="sidebar-wrap hidden md:block">
        <Sidebar active={active} onNavigate={onNavigate} />
      </div>

      {/* Sidebar drawer (mobile) */}
      {open && (
        <>
          <div className="drawer">
            <Sidebar active={active} onNavigate={(k)=>{ onNavigate?.(k); setOpen(false); }} />
          </div>
          <div className="backdrop" onClick={()=>setOpen(false)} />
        </>
      )}

      {/* Main content */}
      <main className="content">{children}</main>
    </div>
  );
}
  