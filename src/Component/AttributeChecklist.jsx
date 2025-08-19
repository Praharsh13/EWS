import React, { useMemo, useState } from "react";

/** pill color by severity */
function severityColor(sev) {
  if (sev === "critical") return "var(--danger)";
  if (sev === "major")    return "var(--warn)";
  return "var(--ok)";
}

export default function AttributeChecklist({ attributes, selected, onToggle }) {
  const [q, setQ] = useState("");
  const [onlySelected, setOnlySelected] = useState(false);

  // Group by category (falls back to “Other”)
  const grouped = useMemo(() => {
    const map = new Map();
    attributes.forEach(a => {
      if (onlySelected && !selected[a.id]) return;
      if (q && !a.label.toLowerCase().includes(q.toLowerCase())) return;
      const key = a.category || "Other";
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(a);
    });
    return map;
  }, [attributes, onlySelected, selected, q]);

  const allIds = attributes.map(a => a.id);
  const anySelected = allIds.some(id => !!selected[id]);

  const selectNone = () => {
    const cleared = {};
    allIds.forEach(id => (cleared[id] = false));
    // apply cleared individually (so parent state stays simple)
    allIds.forEach(id => selected[id] && onToggle(id, false));
  };

  const selectAllVisible = () => {
    grouped.forEach(list => list.forEach(a => !selected[a.id] && onToggle(a.id, true)));
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="triage-toolbar">
        <input
          className="triage-search"
          placeholder="Search attributes (e.g. cough, fever)…"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <div className="triage-actions">
          <button className="btn btn-ghost" onClick={() => setOnlySelected(v => !v)}>
            {onlySelected ? "Show all" : "Show selected"}
          </button>
          <button className="btn" onClick={selectAllVisible}>Select visible</button>
          <button className="btn" onClick={selectNone} disabled={!anySelected} style={{opacity: anySelected?1:.6}}>
            Clear
          </button>
        </div>
      </div>

      {/* Category groups */}
      {[...grouped.entries()].map(([category, list]) => (
        <div key={category} className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <h4 className="section-title">{category}</h4>
            <span className="muted text-xs">{list.length} item{list.length!==1?'s':''}</span>
          </div>

          <div className="triage-grid">
            {list.map(attr => {
              const checked = !!selected[attr.id];
              const sev = attr.severity || (attr.weight >= 3 ? "critical" : attr.weight === 2 ? "major" : "minor");
              const dotColor = severityColor(sev);

              return (
                <label
                  key={attr.id}
                  className="triage-pill"
                  data-checked={checked}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={() => onToggle(attr.id, !checked)}
                  />
                  <span className="triage-dot" style={{background: dotColor}} aria-hidden />
                  <span className="text-sm" style={{flex:1}}>{attr.label}</span>
                  <span className="badge-soft">w:{attr.weight}</span>
                </label>
              );
            })}
          </div>
        </div>
      ))}

      {grouped.size === 0 && (
        <div className="muted text-sm">No attributes match your filter.</div>
      )}
    </div>
  );
}
