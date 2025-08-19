export const TRIAGE_ATTRIBUTES = [
    { id: 'fever',           label: 'Fever >38°C',              weight: 2, color: '#f59e0b' },
    { id: 'cough',           label: 'Persistent cough',         weight: 2, color: '#f59e0b' },
    { id: 'weightLoss',      label: 'Unintentional weight loss',weight: 3, color: '#ef4444' },
    { id: 'abnormalImaging', label: 'Abnormal imaging',         weight: 3, color: '#ef4444' },
    { id: 'familyHistory',   label: 'Family history',           weight: 1, color: '#60a5fa' },
    { id: 'smoking',         label: 'Heavy smoker',             weight: 2, color: '#f59e0b' },
    { id: 'age60',           label: 'Age ≥ 60',                 weight: 2, color: '#a78bfa' },
    { id: 'bloodInStool',    label: 'Blood in stool',           weight: 3, color: '#ef4444' },
    { id: 'skinLesion',      label: 'Changing skin lesion',     weight: 2, color: '#10b981' },
    { id: 'chronicPain',     label: 'Chronic unexplained pain', weight: 2, color: '#f59e0b' },
  ];
  
  export const TRIAGE_THRESHOLDS = { greenMax: 3, yellowMax: 6 };
  
  