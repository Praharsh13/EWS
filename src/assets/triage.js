// export function computeScore(selectedMap, attributes) {
//     // selectedMap: { [id]: boolean }
//     return attributes.reduce((sum, attr) => sum + (selectedMap[attr.id] ? attr.weight : 0), 0);
//   }
  
//   export function scoreToStatus(score, thresholds) {
//     if (score <= thresholds.greenMax)  return 'green';
//     if (score <= thresholds.yellowMax) return 'yellow';
//     return 'red';
//   }
  
//   export function statusMeta(status) {
//     if (status === 'green')  return { label: 'OK',          color: 'var(--ok)',    blurb: 'No urgent signs.' };
//     if (status === 'yellow') return { label: 'Caution',     color: 'var(--warn)',  blurb: 'See a doctor soon.' };
//     return {                   label: 'Urgent',      color: 'var(--danger)', blurb: 'Prominent warning signs.' };
//   }
  

export function computeScore(selectedMap, attributes) {
    return attributes.reduce((sum, attr) => sum + ((selectedMap?.[attr.id]) ? attr.weight : 0), 0);
  }
  
  export function scoreToStatus(patient, score, thresholds) {
    if (patient?.incomplete) return "incomplete";
    if (patient?.surveillance) return "surveillance";
  
    if (score <= thresholds.greenMax)  return "low";      // was "green"
    if (score <= thresholds.yellowMax) return "yellow";
    return "red";
  }
  
  
  // export function statusMeta(status) {
  //   if (status === 'green')  return { label: 'OK',      color: 'var(--ok)',     blurb: 'No urgent signs.' };
  //   if (status === 'yellow') return { label: 'Caution', color: 'var(--warn)',   blurb: 'See a doctor soon.' };
  //   return {                   label: 'Urgent',   color: 'var(--danger)', blurb: 'Prominent warning signs.' };
  // }
  export function statusMeta(status) {
    switch (status) {
      case "low":
        return { label: "Low risk",     color: "var(--ok)",     blurb: "No urgent signs." };
      case "yellow":
        return { label: "Caution",      color: "var(--warn)",   blurb: "See a doctor soon." };
      case "red":
        return { label: "Urgent",       color: "var(--danger)", blurb: "Prominent warning signs." };
      case "incomplete":
        return { label: "Incomplete data", color: "var(--white)",  blurb: "Missing key information." };
      case "surveillance":
        return { label: "Ongoing surveillance", color: "var(--grey)", blurb: "Under monitoring." };
      default:
        return { label: "Unknown", color: "var(--muted)", blurb: "" };
    }
  }