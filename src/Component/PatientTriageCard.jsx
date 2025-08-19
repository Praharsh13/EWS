import React, { useMemo } from "react";
import { computeScore, scoreToStatus, statusMeta } from "../assets/triage";



export default function PatientTriageCard({ attributes, selected, thresholds }) {
  const score = useMemo(() => computeScore(selected, attributes), [selected, attributes]);
  const status = useMemo(() => scoreToStatus(score, thresholds), [score, thresholds]);
  const meta = statusMeta(status);

  const maxPossible = attributes.reduce((s, a) => s + a.weight, 0);
  const pct = Math.round((score / Math.max(1, maxPossible)) * 100);

  // top 3 contributing attributes (by weight)
  const reasons = useMemo(() => {
    const picked = attributes
      .filter(a => selected[a.id])
      .sort((a,b) => b.weight - a.weight)
      .slice(0, 3);
    return picked;
  }, [selected, attributes]);

  return (
    <div className="card p-5 shadow-sm summary-sticky">
      <div className="summary-head">
        <div>
          <h2 className="section-title">Patient Triage</h2>
          <p className="muted text-sm -mt-0.5">{meta.blurb}</p>
        </div>
        <span className="traffic-pill">
          <span className="traffic-dot" style={{background: meta.color}} aria-hidden /> {meta.label}
        </span>
      </div>

      {/* Score */}
      <div className="mt-2">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="muted">Risk score</span>
          <span className="font-medium">{score} / {maxPossible} ({pct}%)</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{width: `${pct}%`, background: meta.color}} />
        </div>
        <div className="flex justify-between text-xs muted mt-2">
          <span>0–{thresholds.greenMax}: Green</span>
          <span>{thresholds.greenMax + 1}–{thresholds.yellowMax}: Yellow</span>
          <span>{thresholds.yellowMax + 1}+: Red</span>
        </div>
      </div>

      {/* Reasons */}
      <div className="reason-list">
        <div className="muted text-xs mt-4">Top contributing signs</div>
        {reasons.length === 0 ? (
          <div className="text-sm">No concerning attributes selected.</div>
        ) : reasons.map(a => (
          <div key={a.id} className="reason-item">
            <span className="reason-chip">{a.label}</span>
            <span className="muted text-xs">weight {a.weight}</span>
          </div>
        ))}
      </div>

      {/* Callouts */}
      <div className="mt-4 flex gap-.5">
        {status === "red" && <span className="reason-chip" style={{borderColor: 'var(--danger)', color:'var(--danger)'}}>Urgent referral</span>}
        {status === "yellow" && <span className="reason-chip" style={{borderColor: 'var(--warn)', color:'var(--warn)'}}>Doctor visit recommended</span>}
        {status === "green" && <span className="reason-chip" style={{borderColor: 'var(--ok)', color:'var(--ok)'}}>Self-monitoring</span>}
      </div>
    </div>
  );
}
