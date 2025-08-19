import React, { useState, useCallback } from "react";
import AttributeChecklist from "./AttributeChecklist";
import PatientTriageCard from "./PatientTriageCard";



export default function PatientTriagePanel({ attributes, thresholds }) {
  const [selected, setSelected] = useState({}); // { id: boolean }

  const onToggle = useCallback((id, value) => {
    setSelected(prev => ({ ...prev, [id]: value }));
  }, []);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 card p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="section-title">Patient Attributes</h3>
          <span className="muted text-xs">
            Selected: {Object.values(selected).filter(Boolean).length}
          </span>
        </div>
        <AttributeChecklist attributes={attributes} selected={selected} onToggle={onToggle} />
      </div>

      <PatientTriageCard attributes={attributes} selected={selected} thresholds={thresholds} />
    </section>
  );
}
