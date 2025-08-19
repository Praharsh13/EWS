import React, { useMemo } from "react";
import { computeScore, scoreToStatus, statusMeta } from "../assets/triage";

// function AttributeChips({ attrsCatalog, selected }) {
//   const items = attrsCatalog.filter(a => selected?.[a.id]);
//   if (items.length === 0) return <span className="cell-muted">—</span>;
//   return (
//     <div style={{display:'flex', flexWrap:'wrap'}}>
//       {items.map(a => (
//         <span key={a.id} className="attr-chip">
//           <span className="attr-dot" style={{background:a.color}} aria-hidden />
//           {a.label}
//         </span>
//       ))}
//     </div>
//   );
// }

// function ScoreBar({ score, max, color }) {
//   const pct = Math.min(100, Math.round((score/Math.max(1,max))*100));
//   return (
//     <div className="score-track" title={`${score} / ${max}`}>
//       <div className="score-fill" style={{width:`${pct}%`, background: color}} />
//     </div>
//   );
// }

// export default function TriageTable({ patients, attributes, thresholds }) {
//   // Precompute max possible for bar scale
//   const maxPossible = useMemo(() => attributes.reduce((s,a)=>s+a.weight,0), [attributes]);

//   // Rows enriched with score + status
//   const rows = useMemo(() => patients.map(p => {
//     const score = computeScore(p.attributes, attributes);
//     const status = scoreToStatus(score, thresholds);
//     const meta = statusMeta(status);
//     return { ...p, score, status, meta };
//   }), [patients, attributes, thresholds]);

//   return (
//     <section className="table-card">
//       <div className="table-wrap">
//         <table className="table">
//           <thead>
//             <tr>
//               <th className="nowrap">Patient</th>
//               <th className="nowrap">Age / Sex</th>
//               <th className="nowrap">Suspected</th>
//               <th>Attributes</th>
//               <th className="nowrap" style={{width:220}}>Risk score</th>
//               <th className="nowrap">Status</th>
//               <th className="nowrap"></th>
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map(r => (
//               <tr key={r.id}>
//                 <td>
//                   <div className="font-medium">{r.name}</div>
//                   <div className="cell-muted">{r.id}</div>
//                 </td>
//                 <td className="nowrap">{r.age} / {r.sex}</td>
//                 <td className="nowrap">{r.suspected}</td>
//                 <td><AttributeChips attrsCatalog={attributes} selected={r.attributes} /></td>
//                 <td>
//                   <div className="flex items-center gap-2" style={{display:'flex', alignItems:'center', gap:8}}>
//                     <ScoreBar score={r.score} max={maxPossible} color={r.meta.color} />
//                     <span className="cell-muted" style={{minWidth:52, textAlign:'right'}}>{r.score}/{maxPossible}</span>
//                   </div>
//                 </td>
//                 <td>
//                   <span className="status-pill">
//                     <span className="status-dot" style={{background:r.meta.color}} aria-hidden />
//                     {r.meta.label}
//                   </span>
//                 </td>
//                 <td className="nowrap">
//                   <button className="btn">View</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </section>
//   );
// }
function initials(name = "") {
    return name
      .trim()
      .split(/\s+/)
      .slice(0,2)
      .map((s) => s[0]?.toUpperCase() || "")
      .join("");
  }
  
  function AttributeChips({ attrsCatalog, selected, maxShow = 4 }) {
    const items = attrsCatalog.filter(a => selected?.[a.id]);
    if (items.length === 0) return <span className="cell-muted">—</span>;
    const show = items.slice(0, maxShow);
    const more = Math.max(0, items.length - show.length);
    return (
      <div className="attr-stack">
        {show.map(a => (
          <span key={a.id} className="attr-chip" title={a.label}>
            <span className="attr-dot" style={{background:a.color}} aria-hidden />
            {a.label}
          </span>
        ))}
        {more > 0 && <span className="attr-more">+{more} more</span>}
      </div>
    );
  }
  
  function ScoreBar({ score, max, color }) {
    const pct = Math.min(100, Math.round((score / Math.max(1, max)) * 100));
    return (
      <div className="score-wrap">
        <div className="score-track" title={`${score} / ${max}`}>
          <div className="score-fill" style={{width:`${pct}%`, background: color}} />
        </div>
        <span className="score-text">{score}/{max}</span>
      </div>
    );
  }
  
  export default function TriageTable({ patients, attributes, thresholds }) {
    const maxPossible = useMemo(
      () => attributes.reduce((s,a)=>s+a.weight,0),
      [attributes]
    );
  
    const rows = useMemo(
      () => patients.map(p => {
        const score = computeScore(p.attributes, attributes);
        const status = scoreToStatus(score, thresholds);
        const meta = statusMeta(status);
        return { ...p, score, status, meta };
      }),
      [patients, attributes, thresholds]
    );
  
    return (
      <section className="table-card" aria-label="Patient triage table">
        <div className="table-head-accent" aria-hidden="true" />
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th className="nowrap">Patient</th>
                <th className="nowrap">Age / Sex</th>
                <th className="nowrap">Suspected</th>
                <th>Attributes</th>
                <th className="nowrap" style={{width:230}}>Risk score</th>
                <th className="nowrap">Status</th>
                <th className="nowrap"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id} className={`row ${r.status}`}>
                  <td>
                    <div className="identity">
                      <div className="avatar" aria-hidden>{initials(r.name)}</div>
                      <div>
                        <div className="font-medium ellipsis" title={r.name}>{r.name}</div>
                        <div className="cell-muted ellipsis" title={r.id}>{r.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="nowrap">{r.age} / {r.sex}</td>
                  <td className="nowrap">{r.suspected}</td>
                  <td>
                    <AttributeChips attrsCatalog={attributes} selected={r.attributes} />
                  </td>
                  <td>
                    <ScoreBar score={r.score} max={maxPossible} color={r.meta.color} />
                  </td>
                  <td>
                    <span className="status-pill" title={r.meta.blurb}>
                      <span className="status-dot" style={{background:r.meta.color}} aria-hidden />
                      {r.meta.label}
                    </span>
                  </td>
                  <td className="nowrap">
                    <button className="btn-ghost">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }