import React from "react";

// export default function ChartCard({ title, subtitle, right, children }) {
//   return (
//     <div className="card p-5 shadow-sm">
//       <div className="mb-3 flex items-start justify-between gap-2">
//         <div>
//           <h2 className="section-title">{title}</h2>
//           {subtitle && <p className="muted text-sm -mt-0.5">{subtitle}</p>}
//         </div>
//         {right}
//       </div>
//       <div className="h-80">{children}</div>
//     </div>
//   );
// }
export default function ChartCard({
    title,
    subtitle,
    right,
    toolbar,
    footer,
    isLoading = false,
    empty = false,
    height = 320,
    padding = "20px",
    children,
  }) {
    return (
      <section className="chart-card" role="group" aria-label={title}>
        {/* gradient accent */}
        <div className="chart-accent" aria-hidden />
  
        {/* header */}
        <header className="chart-header" style={{ padding }}>
          <div className="chart-titles">
            <h2 className="section-title">{title}</h2>
            {subtitle && <p className="muted text-sm -mt-0.5">{subtitle}</p>}
          </div>
          {right && <div className="chart-actions">{right}</div>}
        </header>
  
        {/* optional toolbar row */}
        {toolbar && <div className="chart-toolbar" style={{ padding }}>{toolbar}</div>}
  
        {/* body */}
        <div className="chart-body" style={{ height, padding }}>
          {isLoading ? (
            <div className="skeleton" aria-busy="true" aria-live="polite">
              <div className="sk-bar" />
              <div className="sk-bar" />
              <div className="sk-bar" />
              <div className="sk-bar" />
            </div>
          ) : empty ? (
            <div className="chart-empty">
              <div className="empty-dot" />
              <div>No data for the selected filters</div>
            </div>
          ) : (
            children
          )}
        </div>
  
        {/* footer */}
        {footer && (
          <footer className="chart-footer" style={{ padding }}>
            {footer}
          </footer>
        )}
      </section>
    );
  }