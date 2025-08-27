import React from "react";

/** Small helper for key:value rows */
function KV({ k, v }) {
  return (
    <div className="kv">
      <div className="kv-k">{k}</div>
      <div className="kv-v">{v ?? '—'}</div>
    </div>
  );
}

export default function PatientDetailDrawer({ open, patient, attributesCatalog = [], onClose }) {
  if (!open || !patient) return null;

  const attrList = attributesCatalog
    .filter(a => patient.attributes?.[a.id])
    .map(a => a.label);

  const probable = patient.riskProfile?.probableCancers || [];
  const labs = patient.lastCheckup?.labs || [];
  const imaging = patient.lastCheckup?.imaging || [];
  const history = patient.history || [];
  const meds = patient.medications || [];

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside className="drawer-panel" onClick={(e)=>e.stopPropagation()} role="dialog" aria-label="Patient detail">
        <header className="drawer-head">
          <div>
            <div className="drawer-title">{patient.name}</div>
            <div className="drawer-sub">{patient.id} • {patient.age} / {patient.sex}</div>
          </div>
          <button className="btn" onClick={onClose}>Close</button>
        </header>

        {/* Basics */}
        <section className="drawer-sec">
          <h3 className="drawer-h3">Basics</h3>
          <div className="grid-2">
            <KV k="City" v={patient.location?.city} />
            <KV k="Country" v={patient.location?.country} />
            <KV k="Phone" v={patient.contact?.phone} />
            <KV k="Email" v={patient.contact?.email} />
          </div>
          <div className="chip-row">
            {(patient.cancers || []).map((c, i) => (
              <span key={c+i} className="chip">{c}</span>
            ))}
          </div>
        </section>

        {/* Attributes */}
        <section className="drawer-sec">
          <h3 className="drawer-h3">Attributes flagged</h3>
          {attrList.length ? (
            <div className="chip-row">
              {attrList.map((s, i) => <span key={i} className="chip">{s}</span>)}
            </div>
          ) : <div className="muted">No attributes captured.</div>}
        </section>

        {/* Last Check-up */}
        <section className="drawer-sec">
          <h3 className="drawer-h3">Last check-up</h3>
          <div className="grid-2">
            <KV k="Date" v={patient.lastCheckup?.date} />
            <KV k="Clinician" v={patient.lastCheckup?.clinician} />
            <KV k="Clinic" v={patient.lastCheckup?.clinic} />
          </div>
          <div className="grid-2">
            <KV k="BP" v={patient.lastCheckup?.vitals?.bp} />
            <KV k="HR" v={patient.lastCheckup?.vitals?.hr} />
            <KV k="Temp" v={patient.lastCheckup?.vitals?.temp} />
            <KV k="SpO₂" v={patient.lastCheckup?.vitals?.spo2} />
          </div>

          {imaging.length > 0 && (
            <>
              <h4 className="drawer-h4">Imaging</h4>
              <ul className="bullets">
                {imaging.map((img, i) => (
                  <li key={i}><b>{img.type}:</b> {img.result}{img.impression ? ` — ${img.impression}` : ''}</li>
                ))}
              </ul>
            </>
          )}
          {labs.length > 0 && (
            <>
              <h4 className="drawer-h4">Labs</h4>
              <ul className="bullets">
                {labs.map((l, i) => (
                  <li key={i}><b>{l.test}:</b> {l.value}{l.ref ? ` (ref ${l.ref})` : ''}</li>
                ))}
              </ul>
            </>
          )}
          {patient.lastCheckup?.notes && <p className="muted mt-1">{patient.lastCheckup.notes}</p>}
        </section>

        {/* Risks */}
        <section className="drawer-sec">
          <h3 className="drawer-h3">Risk profile</h3>
          {probable.length ? (
            <ul className="bullets">
              {probable.map((r, i) => (
                <li key={i}><b>{r.type}:</b> {(r.prob*100).toFixed(0)}%</li>
              ))}
            </ul>
          ) : <div className="muted">No model probabilities available.</div>}
        </section>

        {/* History / Meds */}
        <section className="drawer-sec">
          <h3 className="drawer-h3">History & meds</h3>
          <div className="grid-2">
            <div>
              <h4 className="drawer-h4">History</h4>
              {history.length ? <ul className="bullets">{history.map((h,i)=><li key={i}>{h}</li>)}</ul> : <div className="muted">—</div>}
            </div>
            <div>
              <h4 className="drawer-h4">Medications</h4>
              {meds.length ? <ul className="bullets">{meds.map((m,i)=><li key={i}>{m}</li>)}</ul> : <div className="muted">—</div>}
            </div>
          </div>
        </section>

        {/* Lifestyle */}
        <section className="drawer-sec">
          <h3 className="drawer-h3">Lifestyle</h3>
          <div className="grid-3">
            <KV k="Smoking" v={patient.lifestyle?.smoking} />
            <KV k="Alcohol" v={patient.lifestyle?.alcohol} />
            <KV k="Activity" v={patient.lifestyle?.activity} />
          </div>
        </section>
      </aside>
    </div>
  );
}
