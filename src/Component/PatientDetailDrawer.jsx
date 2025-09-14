// import React from "react";

/** Small helper for key:value rows */
function KV({ k, v }) {
  return (
    <div className="kv">
      <div className="kv-k">{k}</div>
      <div className="kv-v">{v ?? "—"}</div>
    </div>
  );
}

export default function PatientDetailDrawer({
  open,
  patient,
  attributesCatalog = [],
  onClose,
  onAlert, // optional: parent can handle alerts
}) {
  if (!open || !patient) return null;

  // ---- helpers ----
  const attrList = attributesCatalog
    .filter((a) => patient.attributes?.[a.id])
    .map((a) => a.label);

  const probable = patient.riskProfile?.probableCancers || [];
  const labs = patient.lastCheckup?.labs || [];
  const imaging = patient.lastCheckup?.imaging || [];
  const history = patient.history || [];
  const meds = patient.medications || [];

  function deriveMajorDiagnosis(p) {
    if (p?.majorDiagnosis) return p.majorDiagnosis;
    const img0 = p?.lastCheckup?.imaging?.[0];
    if (img0?.impression) return img0.impression;
    if (img0?.result) return img0.result;
    const labHit = (p?.lastCheckup?.labs || []).find((l) =>
      String(l.value || "").toLowerCase().match(/positive|high|elev|>|</)
    );
    if (labHit) return `${labHit.test}: ${labHit.value}`;
    if (p?.lastCheckup?.notes) return p.lastCheckup.notes.split(".")[0];
    if ((p?.history || []).length) return p.history[0];
    return "—";
  }

  const majorDx = deriveMajorDiagnosis(patient);

  // risk color mapping (four colors only)
  function riskColor(prob) {
    if (prob >= 0.5) return { color: "var(--danger)", ring: false, label: "High" }; // red
    if (prob >= 0.2) return { color: "var(--warn)", ring: false, label: "Moderate" }; // yellow
    if (prob >= 0.1) return { color: "var(--grey)", ring: false, label: "Low" }; // gray
    return { color: "var(--white)", ring: true, label: "Very low" }; // white + inner ring
  }

  function sendAlert() {
    if (typeof onAlert === "function") {
      onAlert(patient);
    } else if (typeof window !== "undefined") {
      window.alert(`Alert sent for ${patient.name} (${patient.id})`);
    }
  }

  // care team & insurance/service (support both enriched + raw)
  const responsibleGroup =
    patient.careTeam?.group || patient.responsibleGroup || "—";
  const responsiblePractitioner =
    patient.careTeam?.practitioner ||
    patient.responsiblePractitioner ||
    patient.lastCheckup?.clinician ||
    "—";
  const insurancePlan = patient.insurance || "—";
  const serviceLine = patient.service || "—";

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside
        className="drawer-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Patient detail"
      >
        <header className="drawer-head">
          <div>
            <div className="drawer-title">{patient.name}</div>
            <div className="drawer-sub">
              {patient.id} • {patient.age} / {patient.sex}
            </div>
          </div>
          <div className="drawer-actions">
            <button className="btn btn-alert" onClick={sendAlert}>
              Send alert
            </button>
            <button className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </header>

        {/* Demographics (formerly Basics) */}
        <section className="drawer-sec">
          <h3 className="drawer-h3">Demographics</h3>
          <div className="grid-2">
            <KV k="City" v={patient.location?.city} />
            <KV k="Country" v={patient.location?.country} />
            <KV k="ZIP" v={patient.location?.zip} />
            <KV k="Phone" v={patient.contact?.phone} />
            <KV k="Email" v={patient.contact?.email} />
            <KV k="Responsible Group" v={responsibleGroup} />
            <KV k="Responsible Practitioner" v={responsiblePractitioner} />
          </div>
          <div className="chip-row">
            {(patient.cancers || []).map((c, i) => (
              <span key={c + i} className="chip">
                {c}
              </span>
            ))}
          </div>
        </section>

        {/* Insurance */}
        <section className="drawer-sec">
          <h3 className="drawer-h3">Insurance</h3>
          <div className="grid-2">
            <KV k="Plan" v={insurancePlan} />
            <KV k="Service" v={serviceLine} />
          </div>
        </section>

        {/* Attributes */}
        <section className="drawer-sec">
          <h3 className="drawer-h3">Attributes flagged</h3>
          {attrList.length ? (
            <div className="chip-row">
              {attrList.map((s, i) => (
                <span key={i} className="chip">
                  {s}
                </span>
              ))}
            </div>
          ) : (
            <div className="muted">No attributes captured.</div>
          )}
        </section>

        {/* Major Diagnostic */}
        <section className="drawer-sec">
          <h3 className="drawer-h3">Major diagnostic</h3>
          <div className="major-dx">{majorDx}</div>
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
                  <li key={i}>
                    <b>{img.type}:</b> {img.result}
                    {img.impression ? ` — ${img.impression}` : ""}
                  </li>
                ))}
              </ul>
            </>
          )}
          {labs.length > 0 && (
            <>
              <h4 className="drawer-h4">Labs</h4>
              <ul className="bullets">
                {labs.map((l, i) => (
                  <li key={i}>
                    <b>{l.test}:</b> {l.value}
                    {l.ref ? ` (ref ${l.ref})` : ""}
                  </li>
                ))}
              </ul>
            </>
          )}
          {patient.lastCheckup?.notes && (
            <p className="muted mt-1">{patient.lastCheckup.notes}</p>
          )}
        </section>

        {/* Risk Profile (color-coded) */}
        <section className="drawer-sec">
          <h3 className="drawer-h3">Risk profile</h3>
          {probable.length ? (
            <ul className="rp-list">
              {probable.map((r, i) => {
                const pct = Math.round((r.prob || 0) * 100);
                const { color, ring } = riskColor(r.prob || 0);
                return (
                  <li key={i} className="rp-item">
                    <span className="rp-dot" style={{
                      background: color,
                      boxShadow: ring ? "inset 0 0 0 1px var(--card-border)" : "none",
                    }} />
                    <span className="rp-label">{r.type}</span>
                    <div className="rp-bar">
                      <div
                        className="rp-fill"
                        style={{
                          width: `${pct}%`,
                          background: color,
                          boxShadow: ring ? "inset 0 0 0 1px var(--card-border)" : "none",
                        }}
                      />
                    </div>
                    <span className="rp-pct">{pct}%</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="muted">No model probabilities available.</div>
          )}
        </section>

        {/* History / Meds */}
        <section className="drawer-sec">
          <h3 className="drawer-h3">History & meds</h3>
          <div className="grid-2">
            <div>
              <h4 className="drawer-h4">History</h4>
              {history.length ? (
                <ul className="bullets">
                  {history.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              ) : (
                <div className="muted">—</div>
              )}
            </div>
            <div>
              <h4 className="drawer-h4">Medications</h4>
              {meds.length ? (
                <ul className="bullets">
                  {meds.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              ) : (
                <div className="muted">—</div>
              )}
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
