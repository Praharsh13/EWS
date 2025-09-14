import React, { useMemo,useState,useEffect } from "react";
import { computeScore, scoreToStatus, statusMeta } from "../assets/triage";
import PatientDetailDrawer from "./PatientDetailDrawer";

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
// function initials(name = "") {
//     return name
//       .trim()
//       .split(/\s+/)
//       .slice(0,2)
//       .map((s) => s[0]?.toUpperCase() || "")
//       .join("");
//   }
  
//   function AttributeChips({ attrsCatalog, selected, maxShow = 4 }) {
//     const items = attrsCatalog.filter(a => selected?.[a.id]);
//     if (items.length === 0) return <span className="cell-muted">—</span>;
//     const show = items.slice(0, maxShow);
//     const more = Math.max(0, items.length - show.length);
//     return (
//       <div className="attr-stack">
//         {show.map(a => (
//           <span key={a.id} className="attr-chip" title={a.label}>
//             <span className="attr-dot" style={{background:a.color}} aria-hidden />
//             {a.label}
//           </span>
//         ))}
//         {more > 0 && <span className="attr-more">+{more} more</span>}
//       </div>
//     );
//   }
  
//   function ScoreBar({ score, max, color }) {
//     const pct = Math.min(100, Math.round((score / Math.max(1, max)) * 100));
//     return (
//       <div className="score-wrap">
//         <div className="score-track" title={`${score} / ${max}`}>
//           <div className="score-fill" style={{width:`${pct}%`, background: color}} />
//         </div>
//         <span className="score-text">{score}/{max}</span>
//       </div>
//     );
//   }
  
//   export default function TriageTable({ patients, attributes, thresholds }) {
//     const maxPossible = useMemo(
//       () => attributes.reduce((s,a)=>s+a.weight,0),
//       [attributes]
//     );
  
//     const rows = useMemo(
//       () => patients.map(p => {
//         const score = computeScore(p.attributes, attributes);
//         const status = scoreToStatus(score, thresholds);
//         const meta = statusMeta(status);
//         return { ...p, score, status, meta };
//       }),
//       [patients, attributes, thresholds]
//     );
  
//     return (
//       <section className="table-card" aria-label="Patient triage table">
//         <div className="table-head-accent" aria-hidden="true" />
//         <div className="table-wrap">
//           <table className="table">
//             <thead>
//               <tr>
//                 <th className="nowrap">Patient</th>
//                 <th className="nowrap">Age / Sex</th>
//                 <th className="nowrap">Suspected</th>
//                 <th>Attributes</th>
//                 <th className="nowrap" style={{width:230}}>Risk score</th>
//                 <th className="nowrap">Status</th>
//                 <th className="nowrap"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {rows.map(r => (
//                 <tr key={r.id} className={`row ${r.status}`}>
//                   <td>
//                     <div className="identity">
//                       <div className="avatar" aria-hidden>{initials(r.name)}</div>
//                       <div>
//                         <div className="font-medium ellipsis" title={r.name}>{r.name}</div>
//                         <div className="cell-muted ellipsis" title={r.id}>{r.id}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="nowrap">{r.age} / {r.sex}</td>
//                   <td className="nowrap">{r.suspected}</td>
//                   <td>
//                     <AttributeChips attrsCatalog={attributes} selected={r.attributes} />
//                   </td>
//                   <td>
//                     <ScoreBar score={r.score} max={maxPossible} color={r.meta.color} />
//                   </td>
//                   <td>
//                     <span className="status-pill" title={r.meta.blurb}>
//                       <span className="status-dot" style={{background:r.meta.color}} aria-hidden />
//                       {r.meta.label}
//                     </span>
//                   </td>
//                   <td className="nowrap">
//                     <button className="btn-ghost">View</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </section>
//     );
//   }




// function initials(name = "") {
//   return name.trim().split(/\s+/).slice(0,2).map(s => s[0]?.toUpperCase() || "").join("");
// }

// /* attribute chips (kept) */
// function AttributeChips({ attrsCatalog, selected, maxShow = 4 }) {
//   const items = attrsCatalog.filter(a => selected?.[a.id]);
//   if (items.length === 0) return <span className="cell-muted">—</span>;
//   const show = items.slice(0, maxShow);
//   const more = Math.max(0, items.length - show.length);
//   return (
//     <div className="attr-stack">
//       {show.map(a => (
//         <span key={a.id} className="attr-chip" title={a.label}>
//           <span className="attr-dot" style={{background:a.color}} aria-hidden />
//           {a.label}
//         </span>
//       ))}
//       {more > 0 && <span className="attr-more">+{more} more</span>}
//     </div>
//   );
// }

// /* cancers as chips (new) */
// function CancerChips({ cancers = [] }) {
//   if (!cancers.length) return <span className="cell-muted">—</span>;
//   const palette = ["#60a5fa","#f472b6","#10b981","#f59e0b","#a78bfa","#fb7185"]; // rotating
//   return (
//     <div className="cancer-stack">
//       {cancers.map((c, i) => (
//         <span key={c + i} className="cancer-chip" title={c}>
//           <span className="cancer-dot" style={{ background: palette[i % palette.length] }} />
//           {c}
//         </span>
//       ))}
//     </div>
//   );
// }

// function ScoreBar({ score, max, color }) {
//   const pct = Math.min(100, Math.round((score / Math.max(1, max)) * 100));
//   return (
//     <div className="score-wrap">
//       <div className="score-track" title={`${score} / ${max}`}>
//         <div className="score-fill" style={{width:`${pct}%`, background: color}} />
//       </div>
//       <span className="score-text">{score}/{max}</span>
//     </div>
//   );
// }

// export default function TriageTable({ patients, attributes, thresholds }) {
//   /* ===== Toolbar state ===== */
//   const [query, setQuery] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");   // all | low | yellow | red | incomplete | surveillance
//   const [filterCancer, setFilterCancer] = useState("all");   // all or a specific cancer
//   const [open, setOpen] = useState(false);
//   const [current, setCurrent] = useState(null);

//   /* build lookup & meta */
//   const maxPossible = useMemo(() => attributes.reduce((s,a)=>s+a.weight,0), [attributes]);

//   // derive a flat list of cancers from patient data (supports multi-cancer arrays)
//   const cancerOptions = useMemo(() => {
//     const set = new Set();
//     patients.forEach(p => (p.cancers || (p.suspected ? [p.suspected] : [])).forEach(c => set.add(c)));
//     return Array.from(set).sort();
//   }, [patients]);

//   // enrich patients → score + status + meta
//   const enriched = useMemo(
//     () => patients.map(p => {
//       const score = computeScore(p.attributes, attributes);
//       const status = scoreToStatus(p, score, thresholds);
//       const meta = statusMeta(status);
//       const cancers = p.cancers || (p.suspected ? [p.suspected] : []);
//       return { ...p, cancers, score, status, meta };
//     }),
//     [patients, attributes, thresholds]
//   );

//   // filtering
//   const filtered = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     return enriched.filter(r => {
//       const matchesQ = !q || `${r.name} ${r.id}`.toLowerCase().includes(q);
//       const matchesStatus = filterStatus === "all" || r.status === filterStatus;
//       const matchesCancer = filterCancer === "all" || r.cancers.includes(filterCancer);
//       return matchesQ && matchesStatus && matchesCancer;
//     });
//   }, [enriched, query, filterStatus, filterCancer]);
//   function onView(p) {
//     setCurrent(p);
//     setOpen(true);
//   }

//   return (
//     <>
//     <section className="table-card" aria-label="Patient triage table">
//       {/* accent */}
//       <div className="table-head-accent" aria-hidden="true" />

//       {/* toolbar */}
//       <div className="table-toolbar">
//         <div className="toolbar-left">
//           <input
//             className="input-sm"
//             placeholder="Search patient or ID…"
//             value={query}
//             onChange={(e)=>setQuery(e.target.value)}
//           />
//           <select className="input-sm" value={filterStatus} onChange={(e)=>setFilterStatus(e.target.value)}>
//             <option value="all">All statuses</option>
//             <option value="low">Low risk</option>
//             <option value="yellow">Caution</option>
//             <option value="red">Urgent</option>
//             <option value="incomplete">Incomplete data</option>
//             <option value="surveillance">Ongoing surveillance</option>
//           </select>

//           <select className="input-sm" value={filterCancer} onChange={(e)=>setFilterCancer(e.target.value)}>
//             <option value="all">All cancers</option>
//             {cancerOptions.map(c => <option key={c} value={c}>{c}</option>)}
//           </select>
//         </div>

//         <div className="toolbar-right legend">
//           <span><i className="dot low" /> Low</span>
//           <span><i className="dot yellow" /> Caution</span>
//           <span><i className="dot red" /> Urgent</span>
//           <span><i className="dot incomplete" /> Incomplete</span>
//           <span><i className="dot surveillance" /> Surveillance</span>
//         </div>
//       </div>

//       {/* table */}
//       <div className="table-wrap">
//         <table className="table">
//           <thead>
//             <tr>
//               <th className="nowrap">Patient</th>
//               <th className="nowrap">Age / Sex</th>
//               <th className="nowrap">Cancers</th>
//               <th>Attributes</th>
//               <th className="nowrap" style={{width:230}}>Risk score</th>
//               <th className="nowrap">Status</th>
//               <th className="nowrap"></th>
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.map(r => (
//               <tr key={r.id} className={`row ${r.status}`}>
//                 <td>
//                   <div className="identity">
//                     <div className="avatar" aria-hidden>{initials(r.name)}</div>
//                     <div>
//                       <div className="font-medium ellipsis" title={r.name}>{r.name}</div>
//                       <div className="cell-muted ellipsis" title={r.id}>{r.id}</div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="nowrap">{r.age} / {r.sex}</td>
//                 <td><CancerChips cancers={r.cancers} /></td>
//                 <td><AttributeChips attrsCatalog={attributes} selected={r.attributes} /></td>
//                 <td><ScoreBar score={r.score} max={maxPossible} color={r.meta.color} /></td>
//                 <td>
//                   <span className="status-pill" title={r.meta.blurb}>
//                     <span className="status-dot" style={{background:r.meta.color}} aria-hidden />
//                     {r.meta.label}
//                   </span>
//                 </td>
//                 <td className="nowrap">
//                   <button className="btn-ghost" onClick={()=>onView(r)}>View</button>
//                 </td>
//               </tr>
//             ))}
//             {filtered.length === 0 && (
//               <tr><td colSpan={7} className="cell-muted" style={{padding:'16px'}}>No patients match your filters.</td></tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </section>
//     {/* Drawer */}
//     <PatientDetailDrawer
//         open={open}
//         patient={current}
//         attributesCatalog={attributes}
//         onClose={()=>setOpen(false)}
//       />
//     </>
//   );
// }

/* helpers */
function initials(name = "") {
  return name.trim().split(/\s+/).slice(0,2).map(s => s[0]?.toUpperCase() || "").join("");
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

function CancerChips({ cancers = [] }) {
  if (!cancers.length) return <span className="cell-muted">—</span>;
  const palette = ["#60a5fa","#f472b6","#10b981","#f59e0b","#a78bfa","#fb7185"];
  return (
    <div className="cancer-stack">
      {cancers.map((c, i) => (
        <span key={c + i} className="cancer-chip" title={c}>
          <span className="cancer-dot" style={{ background: palette[i % palette.length] }} />
          {c}
        </span>
      ))}
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

// export default function TriageTable({ patients, attributes, thresholds }) {
//   /* ===== Toolbar state ===== */
//   const [query, setQuery] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");     // all | low | yellow | red | incomplete | surveillance
//   const [filterCancer, setFilterCancer] = useState("all");     // all or a specific cancer
//   const [open, setOpen] = useState(false);
//   const [current, setCurrent] = useState(null);

//   /* ===== Pagination state ===== */
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);               // 10 | 20 | 50

//   /* build lookup & meta */
//   const maxPossible = useMemo(() => attributes.reduce((s,a)=>s+a.weight,0), [attributes]);

//   const cancerOptions = useMemo(() => {
//     const set = new Set();
//     patients.forEach(p => (p.cancers || (p.suspected ? [p.suspected] : [])).forEach(c => set.add(c)));
//     return Array.from(set).sort();
//   }, [patients]);

//   const enriched = useMemo(
//     () => patients.map(p => {
//       const score = computeScore(p.attributes, attributes);
//       const status = scoreToStatus(p, score, thresholds); // ← use the new function
//       const meta = statusMeta(status);
//       const cancers = p.cancers || (p.suspected ? [p.suspected] : []);
//       return { ...p, cancers, score, status, meta };
//     }),
//     [patients, attributes, thresholds]
//   );

//   const filtered = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     return enriched.filter(r => {
//       const matchesQ = !q || `${r.name} ${r.id}`.toLowerCase().includes(q);
//       const matchesStatus = filterStatus === "all" || r.status === filterStatus;
//       const matchesCancer = filterCancer === "all" || r.cancers.includes(filterCancer);
//       return matchesQ && matchesStatus && matchesCancer;
//     });
//   }, [enriched, query, filterStatus, filterCancer]);

//   /* Reset to page 1 whenever filters/search/pageSize change */
//   useEffect(() => { setPage(1); }, [query, filterStatus, filterCancer, pageSize]);

//   /* Pagination math */
//   const total = filtered.length;
//   const totalPages = Math.max(1, Math.ceil(total / pageSize));
//   const safePage = Math.min(page, totalPages);
//   const startIdx = (safePage - 1) * pageSize;
//   const endIdx = Math.min(total, startIdx + pageSize);
//   const pageItems = filtered.slice(startIdx, endIdx);

//   function onView(p) { setCurrent(p); setOpen(true); }
//   function prevPage(){ setPage(p => Math.max(1, p - 1)); }
//   function nextPage(){ setPage(p => Math.min(totalPages, p + 1)); }

//   return (
//     <>
//       <section className="table-card" aria-label="Patient triage table">
//         <div className="table-head-accent" aria-hidden="true" />

//         {/* toolbar */}
//         <div className="table-toolbar">
//           <div className="toolbar-left">
//             <input
//               className="input-sm"
//               placeholder="Search patient or ID…"
//               value={query}
//               onChange={(e)=>setQuery(e.target.value)}
//             />
//             <select className="input-sm" value={filterStatus} onChange={(e)=>setFilterStatus(e.target.value)}>
//               <option value="all">All statuses</option>
//               <option value="low">Low risk</option>
//               <option value="yellow">Caution</option>
//               <option value="red">Urgent</option>
//               <option value="incomplete">Incomplete data</option>
//               <option value="surveillance">Ongoing surveillance</option>
//             </select>

//             <select className="input-sm" value={filterCancer} onChange={(e)=>setFilterCancer(e.target.value)}>
//               <option value="all">All cancers</option>
//               {cancerOptions.map(c => <option key={c} value={c}>{c}</option>)}
//             </select>
//           </div>

//           <div className="toolbar-right legend">
//             <span><i className="dot low" /> Low</span>
//             <span><i className="dot yellow" /> Caution</span>
//             <span><i className="dot red" /> Urgent</span>
//             <span><i className="dot incomplete" /> Incomplete</span>
//             <span><i className="dot surveillance" /> Surveillance</span>
//           </div>
//         </div>

//         {/* table */}
//         <div className="table-wrap">
//           <table className="table">
//             <thead>
//               <tr>
//                 <th className="nowrap">Patient</th>
//                 <th className="nowrap">Age / Sex</th>
//                 <th className="nowrap">Cancers</th>
//                 <th>Attributes</th>
//                 <th className="nowrap" style={{width:230}}>Risk score</th>
//                 <th className="nowrap">Status</th>
//                 <th className="nowrap"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {pageItems.map(r => (
//                 <tr key={r.id} className={`row ${r.status}`}>
//                   <td>
//                     <div className="identity">
//                       <div className="avatar" aria-hidden>{initials(r.name)}</div>
//                       <div>
//                         <div className="font-medium ellipsis" title={r.name}>{r.name}</div>
//                         <div className="cell-muted ellipsis" title={r.id}>{r.id}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="nowrap">{r.age} / {r.sex}</td>
//                   <td><CancerChips cancers={r.cancers} /></td>
//                   <td><AttributeChips attrsCatalog={attributes} selected={r.attributes} /></td>
//                   <td><ScoreBar score={r.score} max={maxPossible} color={r.meta.color} /></td>
//                   <td>
//                     <span className="status-pill" title={r.meta.blurb}>
//                       <span className="status-dot" style={{background:r.meta.color}} aria-hidden />
//                       {r.meta.label}
//                     </span>
//                   </td>
//                   <td className="nowrap">
//                     <button className="btn-ghost" onClick={()=>onView(r)}>View</button>
//                   </td>
//                 </tr>
//               ))}
//               {pageItems.length === 0 && (
//                 <tr><td colSpan={7} className="cell-muted" style={{padding:'16px'}}>No patients match your filters.</td></tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* pagination footer */}
//         <div className="table-footer">
//           <div className="muted text-sm">
//             {total === 0 ? "0 results" : `${startIdx + 1}–${endIdx} of ${total}`}
//           </div>
//           <div className="pager">
//             <select
//               className="input-sm"
//               value={pageSize}
//               onChange={(e)=>setPageSize(Number(e.target.value))}
//               aria-label="Rows per page"
//             >
//               <option value={10}>10 / page</option>
//               <option value={20}>20 / page</option>
//               <option value={50}>50 / page</option>
//             </select>

//             <button className="btn-ghost" onClick={()=>setPage(1)} disabled={safePage===1} aria-label="First page">«</button>
//             <button className="btn-ghost" onClick={prevPage} disabled={safePage===1} aria-label="Previous page">‹</button>
//             <span className="pager-info">{safePage} / {totalPages}</span>
//             <button className="btn-ghost" onClick={nextPage} disabled={safePage===totalPages} aria-label="Next page">›</button>
//             <button className="btn-ghost" onClick={()=>setPage(totalPages)} disabled={safePage===totalPages} aria-label="Last page">»</button>
//           </div>
//         </div>
//       </section>

//       {/* Drawer */}
//       <PatientDetailDrawer
//         open={open}
//         patient={current}
//         attributesCatalog={attributes}
//         onClose={()=>setOpen(false)}
//       />
//     </>
//   );
// }



// export default function TriageTable({ patients, attributes, thresholds }) {
//   /* ===== Toolbar state ===== */
//   const [query, setQuery] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all"); // all | yellow | red | incomplete | surveillance
//   const [filterCancer, setFilterCancer] = useState("all");
//   const [open, setOpen] = useState(false);
//   const [current, setCurrent] = useState(null);

//   /* ===== Pagination state ===== */
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10); // 10 | 20 | 50

//   /* Build lookup & meta */
//   const maxPossible = useMemo(() => attributes.reduce((s, a) => s + a.weight, 0), [attributes]);

//   const cancerOptions = useMemo(() => {
//     const set = new Set();
//     patients.forEach(p => (p.cancers || (p.suspected ? [p.suspected] : [])).forEach(c => set.add(c)));
//     return Array.from(set).sort();
//   }, [patients]);

//   // 4-status palette only
//   function statusColor(status) {
//     switch (status) {
//       case "yellow": return "#FACC15"; // yellow
//       case "red": return "#EF4444";    // red
//       case "surveillance": return "#FFFFFF"; // white
//       case "incomplete":
//       default: return "#9CA3AF";       // gray
//     }
//   }

//   function statusMetaLite(status) {
//     const color = statusColor(status);
//     const label = ({
//       yellow: "Caution",
//       red: "Urgent",
//       incomplete: "Incomplete",
//       surveillance: "Surveillance",
//     })[status] || "Unknown";
//     return { color, label, blurb: label };
//   }

//   const enriched = useMemo(
//     () => patients.map(p => {
//       const score = computeScore(p.attributes, attributes);
//       let status = scoreToStatus(p, score, thresholds);
//       // Remove "low" entirely → treat as "incomplete"
//       if (status === "low") status = "incomplete";

//       const meta = statusMetaLite(status);
//       const cancers = p.cancers || (p.suspected ? [p.suspected] : []);

//       // Read from enriched data layer (you added these in PATIENTS map)
//       const responsibleGroup = p.careTeam?.group || "";
//       const responsiblePractitioner = p.careTeam?.practitioner || p.lastCheckup?.clinician || "";
//       const majorDiagnosis = p.majorDiagnosis || "";
//       const service = p.service;           // "Adult" | "Pediatrics"
//       const insurance = p.insurance || ""; // "BCBS HMO" | "BCBS PPO"

//       return { ...p, cancers, score, status, meta, responsibleGroup, responsiblePractitioner, majorDiagnosis, service, insurance };
//     }),
//     [patients, attributes, thresholds]
//   );

//   const filtered = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     return enriched.filter(r => {
//       const matchesQ = !q || `${r.name} ${r.id}`.toLowerCase().includes(q);
//       const matchesStatus = filterStatus === "all" || r.status === filterStatus;
//       const matchesCancer = filterCancer === "all" || r.cancers.includes(filterCancer);
//       return matchesQ && matchesStatus && matchesCancer;
//     });
//   }, [enriched, query, filterStatus, filterCancer]);

//   /* Reset to page 1 whenever filters/search/pageSize change */
//   useEffect(() => { setPage(1); }, [query, filterStatus, filterCancer, pageSize]);

//   /* Pagination math */
//   const total = filtered.length;
//   const totalPages = Math.max(1, Math.ceil(total / pageSize));
//   const safePage = Math.min(page, totalPages);
//   const startIdx = (safePage - 1) * pageSize;
//   const endIdx = Math.min(total, startIdx + pageSize);
//   const pageItems = filtered.slice(startIdx, endIdx);

//   function onView(p) { setCurrent(p); setOpen(true); }
//   function prevPage(){ setPage(p => Math.max(1, p - 1)); }
//   function nextPage(){ setPage(p => Math.min(totalPages, p + 1)); }

//   // Initials helper
//   function initials(name = "") {
//     return name.split(/\s+/).filter(Boolean).slice(0, 2).map(s => s[0]?.toUpperCase() || "").join("");
//   }
//   // Keyboard activation for rows
//   function rowKey(e, r) {
//     if (e.key === "Enter" || e.key === " ") {
//       e.preventDefault();
//       onView(r);
//     }
//   }

//   return (
//     <>
//       <section className="table-card" aria-label="Patient triage table">
//         <div className="table-head-accent" aria-hidden="true" />

//         {/* toolbar */}
//         <div className="table-toolbar">
//           <div className="toolbar-left">
//             <input
//               className="input-sm"
//               placeholder="Search patient or ID…"
//               value={query}
//               onChange={(e)=>setQuery(e.target.value)}
//             />
//             <select className="input-sm" value={filterStatus} onChange={(e)=>setFilterStatus(e.target.value)}>
//               <option value="all">All statuses</option>
//               <option value="yellow">Caution</option>
//               <option value="red">Urgent</option>
//               <option value="incomplete">Incomplete</option>
//               <option value="surveillance">Surveillance</option>
//             </select>

//             <select className="input-sm" value={filterCancer} onChange={(e)=>setFilterCancer(e.target.value)}>
//               <option value="all">All cancers</option>
//               {cancerOptions.map(c => <option key={c} value={c}>{c}</option>)}
//             </select>
//           </div>

//           <div className="toolbar-right legend">
//             <span><i className="dot" style={{background: statusColor("yellow")}} /> Caution</span>
//             <span><i className="dot" style={{background: statusColor("red")}} /> Urgent</span>
//             <span><i className="dot" style={{background: statusColor("incomplete")}} /> Incomplete</span>
//             <span>
//               {/* white needs an outline to be visible */}
//               <i className="dot" style={{background: statusColor("surveillance"), boxShadow: "0 0 0 1px #E5E7EB inset"}} /> Surveillance
//             </span>
//           </div>
//         </div>

//         {/* table */}
//         <div className="table-wrap">
//           <table className="table">
//             <thead>
//               <tr>
//                 <th className="nowrap">Patient</th>
//                 <th className="nowrap">Age / Sex</th>
//                 <th className="nowrap">Cancers</th>
//                 <th className="nowrap">Suspicion</th>
//                 <th>Attributes</th>
//                 <th className="nowrap" style={{width:230}}>Risk score</th>
//                 <th className="nowrap">Status</th>
//                 <th className="nowrap">Responsible Group</th>
//                 <th className="nowrap">Responsible Practitioner</th>
//                 <th className="nowrap">Major Dx</th>
//                 <th className="nowrap">Service</th>
//                 <th className="nowrap">Insurance</th>
//               </tr>
//             </thead>
//             <tbody>
//               {pageItems.map(r => {
//                 const color = statusColor(r.status);
//                 return (
//                   <tr
//                     key={r.id}
//                     onClick={()=>onView(r)}
//                     onKeyDown={(e)=>rowKey(e,r)}
//                     tabIndex={0}
//                     role="button"
//                     aria-label={`Open ${r.name || r.id} details`}
//                     style={{ cursor: "pointer" }}
//                   >
//                     {/* Patient: initials only (full name on hover) */}
//                     <td title={r.name}>
//                       <div className="identity">
//                         <div className="avatar" aria-hidden>{initials(r.name)}</div>
//                         <div>
//                           <div className="font-medium ellipsis" title={r.name}>
//                             {initials(r.name)}
//                           </div>
//                           <div className="cell-muted ellipsis" title={r.id}>{r.id}</div>
//                         </div>
//                       </div>
//                     </td>

//                     <td className="nowrap">{r.age} / {r.sex}</td>

//                     {/* Cancers */}
//                     <td className="nowrap">
//                       <CancerChips cancers={r.cancers} />
//                     </td>

//                     {/* Suspicion dot using status color */}
//                     <td className="nowrap">
//                       <span
//                         title={`${r.meta.label} risk`}
//                         style={{
//                           display: "inline-block",
//                           width: 10,
//                           height: 10,
//                           borderRadius: "9999px",
//                           background: color,
//                           boxShadow: color === "#FFFFFF" ? "0 0 0 1px #E5E7EB inset" : undefined
//                         }}
//                       />
//                     </td>

//                     <td><AttributeChips attrsCatalog={attributes} selected={r.attributes} /></td>

//                     <td><ScoreBar score={r.score} max={maxPossible} color={color} /></td>

//                     <td className="nowrap">
//                       <span className="status-pill" title={r.meta.blurb}>
//                         <span className="status-dot" style={{background: color, boxShadow: color === "#FFFFFF" ? "0 0 0 1px #E5E7EB inset" : undefined}} aria-hidden />
//                         {r.meta.label}
//                       </span>
//                     </td>

//                     <td className="nowrap ellipsis" title={r.responsibleGroup || "-"}>
//                       {r.responsibleGroup || "-"}
//                     </td>

//                     <td className="nowrap ellipsis" title={r.responsiblePractitioner || "-"}>
//                       {r.responsiblePractitioner || "-"}
//                     </td>

//                     <td className="nowrap ellipsis" title={r.majorDiagnosis || "-"}>
//                       {r.majorDiagnosis || "-"}
//                     </td>

//                     <td className="nowrap">{r.service}</td>
//                     <td className="nowrap">{r.insurance || "-"}</td>
//                   </tr>
//                 );
//               })}

//               {pageItems.length === 0 && (
//                 <tr><td colSpan={12} className="cell-muted" style={{padding:'16px'}}>No patients match your filters.</td></tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* pagination footer */}
//         <div className="table-footer">
//           <div className="muted text-sm">
//             {total === 0 ? "0 results" : `${startIdx + 1}–${endIdx} of ${total}`}
//           </div>
//           <div className="pager">
//             <select
//               className="input-sm"
//               value={pageSize}
//               onChange={(e)=>setPageSize(Number(e.target.value))}
//               aria-label="Rows per page"
//             >
//               <option value={10}>10 / page</option>
//               <option value={20}>20 / page</option>
//               <option value={50}>50 / page</option>
//             </select>

//             <button className="btn-ghost" onClick={()=>setPage(1)} disabled={safePage===1} aria-label="First page">«</button>
//             <button className="btn-ghost" onClick={prevPage} disabled={safePage===1} aria-label="Previous page">‹</button>
//             <span className="pager-info">{safePage} / {totalPages}</span>
//             <button className="btn-ghost" onClick={nextPage} disabled={safePage===totalPages} aria-label="Next page">›</button>
//             <button className="btn-ghost" onClick={()=>setPage(totalPages)} disabled={safePage===totalPages} aria-label="Last page">»</button>
//           </div>
//         </div>
//       </section>

//       {/* Drawer */}
//       <PatientDetailDrawer
//         open={open}
//         patient={current}
//         attributesCatalog={attributes}
//         onClose={()=>setOpen(false)}
//       />
//     </>
//   );
// }

export default function TriageTable({ patients, attributes, thresholds }) {
  /* ===== Toolbar state ===== */
  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all | yellow | red | incomplete | surveillance
  const [filterCancer, setFilterCancer] = useState("all");
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);

  /* ===== Pagination state ===== */
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // 10 | 20 | 50

  /* Build lookup & meta */
  const maxPossible = useMemo(
    () => attributes.reduce((s, a) => s + a.weight, 0),
    [attributes]
  );

  const cancerOptions = useMemo(() => {
    const set = new Set();
    patients.forEach((p) =>
      (p.cancers || (p.suspected ? [p.suspected] : [])).forEach((c) =>
        set.add(c)
      )
    );
    return Array.from(set).sort();
  }, [patients]);

  // 4-status palette only
  function statusColor(status) {
    switch (status) {
      case "yellow":
        return "var(--warn)"; // yellow
      case "red":
        return "var(--danger)"; // red
      case "surveillance":
        return "var(--white)"; // white (we add inner ring)
      case "incomplete":
      default:
        return "var(--grey)"; // gray
    }
  }

  function statusLabel(status) {
    return (
      {
        yellow: "Caution",
        red: "Urgent",
        incomplete: "Incomplete",
        surveillance: "Surveillance",
      }[status] || "Unknown"
    );
  }

  const enriched = useMemo(
    () =>
      patients.map((p) => {
        const score = computeScore(p.attributes, attributes);
        let status = scoreToStatus(p, score, thresholds);
        // Remove "low" entirely → treat as "incomplete"
        if (status === "low") status = "incomplete";

        const cancers = p.cancers || (p.suspected ? [p.suspected] : []);
        const color = statusColor(status);
        const meta = { color, label: statusLabel(status), blurb: statusLabel(status) };

        // Data layer enrichment (from PATIENTS mapping)
        const responsibleGroup = p.careTeam?.group || "";
        const responsiblePractitioner =
          p.careTeam?.practitioner || p.lastCheckup?.clinician || "";
        const majorDiagnosis = p.majorDiagnosis || "";
        const service = p.service; // "Adult" | "Pediatrics"
        const insurance = p.insurance || ""; // "BCBS HMO" | "BCBS PPO"

        return {
          ...p,
          cancers,
          score,
          status,
          meta,
          responsibleGroup,
          responsiblePractitioner,
          majorDiagnosis,
          service,
          insurance,
        };
      }),
    [patients, attributes, thresholds]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return enriched.filter((r) => {
      const matchesQ = !q || `${r.name} ${r.id}`.toLowerCase().includes(q);
      const matchesStatus = filterStatus === "all" || r.status === filterStatus;
      const matchesCancer =
        filterCancer === "all" || r.cancers.includes(filterCancer);
      return matchesQ && matchesStatus && matchesCancer;
    });
  }, [enriched, query, filterStatus, filterCancer]);

  /* Reset to page 1 whenever filters/search/pageSize change */
  useEffect(() => {
    setPage(1);
  }, [query, filterStatus, filterCancer, pageSize]);

  /* Pagination math */
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const startIdx = (safePage - 1) * pageSize;
  const endIdx = Math.min(total, startIdx + pageSize);
  const pageItems = filtered.slice(startIdx, endIdx);

  function onView(p) {
    setCurrent(p);
    setOpen(true);
  }
  function prevPage() {
    setPage((p) => Math.max(1, p - 1));
  }
  function nextPage() {
    setPage((p) => Math.min(totalPages, p + 1));
  }

  // Helpers
  function initials(name = "") {
    return name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase() || "")
      .join("");
  }
  function rowKey(e, r) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onView(r);
    }
  }

  return (
    <>
      <section className="table-card" aria-label="Patient triage table">
        <div className="table-head-accent" aria-hidden="true" />

        {/* toolbar */}
        <div className="table-toolbar">
          <div className="toolbar-left">
            <input
              className="input-sm"
              placeholder="Search patient or #"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select
              className="input-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All statuses</option>
              <option value="yellow">Caution</option>
              <option value="red">Urgent</option>
              <option value="incomplete">Incomplete</option>
              <option value="surveillance">Surveillance</option>
            </select>

            <select
              className="input-sm"
              value={filterCancer}
              onChange={(e) => setFilterCancer(e.target.value)}
            >
              <option value="all">All cancers</option>
              {cancerOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="toolbar-right legend">
            <span>
              <i className="dot yellow" /> Caution
            </span>
            <span>
              <i className="dot red" /> Urgent
            </span>
            <span>
              <i className="dot incomplete" /> Incomplete
            </span>
            <span>
              <i className="dot surveillance" /> Surveillance
            </span>
          </div>
        </div>

        {/* table */}
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th className="nowrap">Patient</th>
                <th className="nowrap">Age / Sex</th>
                <th className="nowrap">Cancers</th>
                <th className="nowrap">Suspicion</th>
                <th>Attributes</th>
                <th className="nowrap" style={{ width: 230 }}>
                  Risk score
                </th>
                <th className="nowrap">Status</th>
                <th className="nowrap">Responsible Group</th>
                <th className="nowrap">Responsible Practitioner</th>
                <th className="nowrap">Major Diagnoses</th>
                <th className="nowrap">Service</th>
                <th className="nowrap">Insurance</th>
              </tr>
            </thead>

            <tbody>
              {pageItems.map((r) => {
                const color = statusColor(r.status);
                const isWhite = r.status === "surveillance";
                return (
                  <tr
                    key={r.id}
                    className={`row ${r.status}`}
                    onClick={() => onView(r)}
                    onKeyDown={(e) => rowKey(e, r)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Open ${r.name || r.id} details`}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Patient: initials only (full name on hover) */}
                    <td>
                      <div className="identity">
                        <div className="avatar" aria-hidden>
                          {initials(r.name)}
                        </div>
                        <div className="id-text">
                          {/* <div className="font-medium ellipsis" title={r.name}>
                            {initials(r.name)}
                          </div> */}
                          {/* <div className="cell-muted ellipsis" title={r.id}>
                            {r.id}
                          </div> */}
                        </div>
                      </div>
                    </td>

                    <td className="nowrap">
                      {r.age} / {r.sex}
                    </td>

                    {/* Cancers */}
                    <td className="nowrap">
                      <CancerChips cancers={r.cancers} />
                    </td>

                    {/* Suspicion dot */}
                    {/* <td className="nowrap">
                      <span
                        title={`${r.meta.label} risk`}
                        className="cancer-dot"
                        style={{
                          background: color,
                          boxShadow: isWhite
                            ? "inset 0 0 0 1px var(--card-border)"
                            : undefined,
                        }}
                      />
                    </td> */}
                    <td className="nowrap">
  <span
    title={`${r.meta.label} risk`}
    className="cancer-dot"
    style={{
      display: "inline-block",          // ← important
      width: 10,
      height: 10,
      borderRadius: "9999px",
      background: r.status === "surveillance" ? "#fff" : color,
      boxShadow:
        r.status === "surveillance"
          ? "inset 0 0 0 1px var(--card-border)" // ring on white dot
          : "none",
      verticalAlign: "middle",
    }}
  />
</td>

                    {/* Attributes */}
                    <td>
                      <AttributeChips
                        attrsCatalog={attributes}
                        selected={r.attributes}
                      />
                    </td>

                    {/* Score */}
                    <td>
                      <ScoreBar score={r.score} max={maxPossible} color={color} />
                    </td>

                    {/* Status */}
                    <td className="nowrap">
                      <span className="status-pill" title={r.meta.blurb}>
                        <span
                          className="status-dot"
                          style={{
                            background: color,
                            boxShadow: isWhite
                              ? "inset 0 0 0 1px var(--card-border)"
                              : undefined,
                          }}
                          aria-hidden
                        />
                        {r.meta.label}
                      </span>
                    </td>

                    {/* Extra columns */}
                    <td className="ellipsis" title={r.responsibleGroup || "-"}>
                      {r.responsibleGroup || "-"}
                    </td>
                    <td
                      className="ellipsis"
                      title={r.responsiblePractitioner || "-"}
                    >
                      {r.responsiblePractitioner || "-"}
                    </td>
                    <td className="ellipsis" title={r.majorDiagnosis || "-"}>
                      {r.majorDiagnosis || "-"}
                    </td>
                    <td className="nowrap">{r.service}</td>
                    <td className="nowrap">{r.insurance || "-"}</td>
                  </tr>
                );
              })}

              {pageItems.length === 0 && (
                <tr>
                  <td colSpan={12} className="cell-muted" style={{ padding: "16px" }}>
                    No patients match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* pagination footer */}
        <div className="table-footer">
          <div className="muted text-sm">
            {total === 0 ? "0 results" : `${startIdx + 1}–${endIdx} of ${total}`}
          </div>
          <div className="pager">
            <select
              className="input-sm"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              aria-label="Rows per page"
            >
              <option value={10}>10 / page</option>
              <option value={20}>20 / page</option>
              <option value={50}>50 / page</option>
            </select>

            <button
              className="btn-ghost"
              onClick={() => setPage(1)}
              disabled={safePage === 1}
              aria-label="First page"
            >
              «
            </button>
            <button
              className="btn-ghost"
              onClick={prevPage}
              disabled={safePage === 1}
              aria-label="Previous page"
            >
              ‹
            </button>
            <span className="pager-info">
              {safePage} / {totalPages}
            </span>
            <button
              className="btn-ghost"
              onClick={nextPage}
              disabled={safePage === totalPages}
              aria-label="Next page"
            >
              ›
            </button>
            <button
              className="btn-ghost"
              onClick={() => setPage(totalPages)}
              disabled={safePage === totalPages}
              aria-label="Last page"
            >
              »
            </button>
          </div>
        </div>
      </section>

      {/* Drawer */}
      <PatientDetailDrawer
        open={open}
        patient={current}
        attributesCatalog={attributes}
        onClose={() => setOpen(false)}
      />
    </>
  );
}