import React from "react";

// export default function KpiCard({ label, value, trend = "+0.0%", icon = "✅" }) {
//   const positive = trend.trim().startsWith("+");
//   const color = positive ? "var(--ok)" : "var(--danger)";
//   return (
//     <div className="card p-5 shadow-sm card-hover">
//       <div className="flex items-center justify-between">
//         <span className="text-2xl">{icon}</span>
//         <span className="badge muted">{label}</span>
//       </div>
//       <div className="mt-3 text-3xl font-semibold tracking-tight">{value}</div>
//       <div className="mt-1 text-xs" style={{color}}>
//         {positive ? "▲" : "▼"} {trend}
//         <span className="muted"> vs last period</span>
//       </div>
//     </div>
//   );
// }
export default function KpiCard({ label, value, trend = "+0.0%", icon = "✅", help = "vs last period" }) {
    const positive = String(trend).trim().startsWith("+");
    const trendColor = positive ? "var(--ok)" : "var(--danger)";
    const trendArrow = positive ? "▲" : "▼";
  
    return (
      <section className="kpi-card card">
        {/* subtle top accent */}
        <div className="kpi-accent" aria-hidden />
  
        <header className="kpi-head">
          <div className="kpi-icon" aria-hidden>{icon}</div>
          <div className="kpi-label">{label}</div>
        </header>
  
        <div className="kpi-body">
          <div className="kpi-value">{value}</div>
  
          <div className="kpi-meta">
            <span className="trend-pill" style={{ color: trendColor, borderColor: trendColor }}>
              {trendArrow} {trend}
            </span>
            <span className="muted kpi-help">{help}</span>
          </div>
        </div>
      </section>
    );
  }