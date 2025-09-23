// import "leaflet/dist/leaflet.css";
// import React, { useMemo } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import L from "leaflet";

// // 4-status colors (match your table)
// function statusColor(status) {
//   switch (status) {
//     case "yellow": return "var(--warn)";      // yellow
//     case "red": return "var(--danger)";       // red
//     case "surveillance": return "var(--white)"; // white
//     case "incomplete":
//     default: return "var(--grey)";            // gray
//   }
// }

// function DotIcon({ color, ring }) {
//   // Return a Leaflet DivIcon instance
//   return L.divIcon({
//     className: "pm-divicon",
//     html: `<span class="pm-dot" style="
//       background:${color};
//       ${ring ? 'box-shadow: inset 0 0 0 1px var(--card-border);' : ''}
//     "></span>`,
//     iconSize: [18, 18],
//     iconAnchor: [9, 9],
//     popupAnchor: [0, -9],
//   });
// }

// function FitBounds({ points }) {
//   const map = useMap();
//   React.useEffect(() => {
//     if (!points.length) return;
//     const bounds = L.latLngBounds(points.map(p => [p.lat, p.lng]));
//     map.fitBounds(bounds.pad(0.2));
//   }, [points, map]);
//   return null;
// }

// export default function PatientMap({ patients }) {
//   // Prepare points: only those with lat/lng
//   const points = useMemo(() => {
//     return (patients || [])
//       .map(p => ({
//         id: p.id,
//         name: p.name,
//         age: p.age,
//         sex: p.sex,
//         cancers: p.cancers || [],
//         status: p.status || (p.incomplete ? "incomplete" : p.surveillance ? "surveillance" : "yellow"),
//         zip: p.location?.zip,
//         city: p.location?.city,
//         lat: p.location?.lat,
//         lng: p.location?.lng,
//       }))
//       .filter(p => Number.isFinite(p.lat) && Number.isFinite(p.lng));
//   }, [patients]);

//   const center = points[0] ? [points[0].lat, points[0].lng] : [39.5, -98.35]; // US center fallback

//   return (
//     <div className="map-card">
//       <div className="map-head">
//         <div>
//           <div className="section-title">Patient Cases Map</div>
//           <div className="section-sub">Pins show postcode/ZIP</div>
//         </div>
//         <div className="map-legend">
//           <span><i className="mld mld-yellow" /> Caution</span>
//           <span><i className="mld mld-red" /> Urgent</span>
//           <span><i className="mld mld-grey" /> Incomplete</span>
//           <span><i className="mld mld-white" /> Surveillance</span>
//         </div>
//       </div>

//       <MapContainer center={center} zoom={5} className="map-wrap">
//         <TileLayer
//           attribution='&copy; OpenStreetMap'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         <FitBounds points={points} />

//         {points.map(p => {
//           const color = statusColor(p.status);
//           const ring = p.status === "surveillance";
//           const icon = DotIcon({ color, ring });

//           const initials = (p.name || "")
//             .split(/\s+/).filter(Boolean).slice(0,2)
//             .map(s => s[0]?.toUpperCase() || "").join("");

//           return (
//             <Marker key={p.id} position={[p.lat, p.lng]} icon={icon}>
//               <Popup>
//                 <div className="popup">
//                   <div className="popup-title">{initials} <span className="popup-id">({p.id})</span></div>
//                   <div className="popup-sub">{p.age} / {p.sex}</div>
//                   <div className="popup-row"><b>Postcode:</b> {p.zip || "—"}</div>
//                   <div className="popup-row"><b>City:</b> {p.city || "—"}</div>
//                   <div className="popup-row"><b>Status:</b> {p.status}</div>
//                   <div className="popup-row"><b>Cancers:</b> {(p.cancers || []).join(", ") || "—"}</div>
//                 </div>
//               </Popup>
//             </Marker>
//           );
//         })}
//       </MapContainer>
//     </div>
//   );
// }
// import React, { useMemo } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import L from "leaflet";

// // Minimal fallback geocoder (covers the demo ZIPs/cities you used)
// const GEO_BY_ZIP = {
//   "94103":[37.7749,-122.4194],
//   "10001":[40.7484,-73.9967],
//   "02108":[42.3587,-71.0636],
//   "60601":[41.8864,-87.6186],
//   "75201":[32.7876,-96.7996],
//   "98101":[47.6101,-122.3344],
//   "90012":[34.0614,-118.2436],
//   "33130":[25.7680,-80.2000],
//   "30303":[33.7529,-84.3925],
//   "80202":[39.7525,-104.9995],
// };
// const GEO_BY_CITY = {
//   "San Francisco, CA":[37.7749,-122.4194],
//   "New York, NY":[40.7484,-73.9967],
//   "Boston, MA":[42.3587,-71.0636],
//   "Chicago, IL":[41.8864,-87.6186],
//   "Dallas, TX":[32.7876,-96.7996],
//   "Seattle, WA":[47.6101,-122.3344],
//   "Los Angeles, CA":[34.0614,-118.2436],
//   "Miami, FL":[25.7680,-80.2000],
//   "Atlanta, GA":[33.7529,-84.3925],
//   "Denver, CO":[39.7525,-104.9995],
// };

// function statusColor(status) {
//   switch (status) {
//     case "yellow": return "var(--warn)";       // yellow
//     case "red": return "var(--danger)";        // red
//     case "surveillance": return "var(--white)";// white
//     case "incomplete":
//     default: return "var(--grey)";             // gray
//   }
// }

// function makeDotIcon({ color, ring }) {
//   return L.divIcon({
//     className: "pm-divicon",
//     html: `<span class="pm-dot" style="
//       background:${color};
//       ${ring ? "box-shadow: inset 0 0 0 1px var(--card-border);" : ""}
//     "></span>`,
//     iconSize: [18, 18],
//     iconAnchor: [9, 9],
//     popupAnchor: [0, -9],
//   });
// }

// function FitBounds({ points }) {
//   const map = useMap();
//   React.useEffect(() => {
//     if (!points.length) return;
//     const bounds = L.latLngBounds(points.map(p => [p.lat, p.lng]));
//     map.fitBounds(bounds.pad(0.2));
//   }, [points, map]);
//   return null;
// }

// export default function PatientMap({ patients = [] }) {
//   // Build mappable points with robust lat/lng fallback
//   const { points, skipped } = useMemo(() => {
//     const pts = [];
//     let miss = 0;

//     for (const p of patients) {
//       // status (for color)
//       const status = p.status || (p.incomplete ? "incomplete" : p.surveillance ? "surveillance" : "yellow");
//       const color = statusColor(status);
//       const ring = status === "surveillance";

//       // try location.lat/lng first
//       let lat = p.location?.lat ?? p.lat;
//       let lng = p.location?.lng ?? p.lng;

//       // fallback via ZIP, then City
//       if (!(Number.isFinite(lat) && Number.isFinite(lng))) {
//         const zip = p.location?.zip && String(p.location.zip);
//         if (zip && GEO_BY_ZIP[zip]) {
//           [lat, lng] = GEO_BY_ZIP[zip];
//         } else {
//           const city = p.location?.city;
//           if (city && GEO_BY_CITY[city]) {
//             [lat, lng] = GEO_BY_CITY[city];
//           }
//         }
//       }

//       if (Number.isFinite(lat) && Number.isFinite(lng)) {
//         pts.push({
//           id: p.id,
//           name: p.name,
//           age: p.age,
//           sex: p.sex,
//           cancers: p.cancers || [],
//           status,
//           color,
//           ring,
//           zip: p.location?.zip,
//           city: p.location?.city,
//           lat, lng,
//         });
//       } else {
//         miss++;
//       }
//     }
//     return { points: pts, skipped: miss };
//   }, [patients]);

//   const center = points[0] ? [points[0].lat, points[0].lng] : [39.5, -98.35]; // US fallback

//   return (
//     <div className="map-card">
//       <div className="map-head">
//         <div>
//           <div className="section-title">Patient Cases Map</div>
//           <div className="section-sub">Pins show postcode/ZIP; color-coded by status</div>
//         </div>
//         <div className="map-legend">
//           <span><i className="mld mld-yellow" /> Caution</span>
//           <span><i className="mld mld-red" /> Urgent</span>
//           <span><i className="mld mld-grey" /> Incomplete</span>
//           <span><i className="mld mld-white" /> Surveillance</span>
//         </div>
//       </div>

//       <MapContainer center={center} zoom={5} className="map-wrap">
//         <TileLayer
//           attribution="&copy; OpenStreetMap"
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <FitBounds points={points} />

//         {points.map((p) => (
//           <Marker key={p.id} position={[p.lat, p.lng]} icon={makeDotIcon({ color: p.color, ring: p.ring })}>
//             <Popup>
//               <div className="popup">
//                 <div className="popup-title">
//                   {((p.name||"").split(/\s+/).slice(0,2).map(s=>s[0]?.toUpperCase()||"").join(""))}
//                   <span className="popup-id"> ({p.id})</span>
//                 </div>
//                 <div className="popup-sub">{p.age} / {p.sex}</div>
//                 <div className="popup-row"><b>Postcode:</b> {p.zip || "—"}</div>
//                 <div className="popup-row"><b>City:</b> {p.city || "—"}</div>
//                 <div className="popup-row"><b>Status:</b> {p.status}</div>
//                 <div className="popup-row"><b>Cancers:</b> {(p.cancers || []).join(", ") || "—"}</div>
//               </div>
//             </Popup>
//           </Marker>
//         ))}
//       </MapContainer>

//       {/* Friendly note if nothing plotted */}
//       {points.length === 0 && (
//         <div className="muted" style={{ padding: 12 }}>
//           No mappable patients (missing lat/lng/ZIP). Add coords to your data or ensure ZIPs match the fallback list.
//         </div>
//       )}
//       {skipped > 0 && points.length > 0 && (
//         <div className="muted" style={{ padding: 12 }}>
//           {skipped} patient(s) skipped due to missing coordinates.
//         </div>
//       )}
//     </div>
//   );
// }
import "leaflet/dist/leaflet.css";
import React, { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

const statusFill = {
  red: "var(--danger)",
  yellow: "var(--warn)",
  surveillance: "var(--white)",
  incomplete: "var(--grey)",
};

// Badge-style icon
function BadgeIcon({ status, label }) {
  const fill = statusFill[status] || "var(--grey)";
  return L.divIcon({
    className: "pm-divicon",
    html: `
      <span class="pm-badge">
        <span class="pm-badge-dot" style="background:${fill}"></span>
        <span>${label ?? ""}</span>
      </span>
    `,
    iconSize: [34, 20],
    iconAnchor: [17, 10],
    popupAnchor: [0, -12],
  });
}

// ---------- 1) Status color (as you had) ----------
function statusColor(status) {
  switch (status) {
    case "yellow": return "var(--warn)";
    case "red": return "var(--danger)";
    case "surveillance": return "var(--white)";
    case "incomplete":
    default: return "var(--grey)";
  }
}

// ---------- 2) NYC hospitals + data generator ----------
const NYC_HOSPITALS = [
  { id:"H-MSKCC",   name:"Memorial Sloan Kettering Cancer Center", borough:"Manhattan", zip:"10065", lat:40.7640, lng:-73.9558 },
  { id:"H-NYP-WC",  name:"NewYork-Presbyterian / Weill Cornell",   borough:"Manhattan", zip:"10065", lat:40.7645, lng:-73.9549 },
  { id:"H-MTSINAI", name:"Mount Sinai Hospital",                   borough:"Manhattan", zip:"10029", lat:40.7896, lng:-73.9532 },
  { id:"H-NYU",     name:"NYU Langone (Tisch)",                    borough:"Manhattan", zip:"10016", lat:40.7429, lng:-73.9742 },
  { id:"H-BELLEV",  name:"NYC Health + Hospitals/Bellevue",        borough:"Manhattan", zip:"10016", lat:40.7391, lng:-73.9754 },
  { id:"H-LENOX",   name:"Lenox Hill Hospital",                    borough:"Manhattan", zip:"10075", lat:40.7737, lng:-73.9587 },
  { id:"H-KINGS",   name:"NYC Health + Hospitals/Kings County",    borough:"Brooklyn",  zip:"11203", lat:40.6565, lng:-73.9447 },
  { id:"H-DOWNST",  name:"SUNY Downstate Medical Center",          borough:"Brooklyn",  zip:"11203", lat:40.6559, lng:-73.9456 },
  { id:"H-JAMAICA", name:"Jamaica Hospital Medical Center",        borough:"Queens",    zip:"11418", lat:40.7005, lng:-73.8160 },
  { id:"H-SIUH",    name:"Staten Island University Hospital",      borough:"Staten Isl",zip:"10314", lat:40.5814, lng:-74.1563 },
  { id:"H-MONTE",   name:"Montefiore Medical Center (Moses)",      borough:"Bronx",     zip:"10467", lat:40.8806, lng:-73.8780 },
];

const CANCERS = [
  "Breast","Prostate","Lung","Colorectal","Ovarian","Pancreatic","Leukemia","Liver"
];

const STATUSES = ["red","yellow","surveillance","incomplete"];

function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function sample(arr) { return arr[randInt(0, arr.length - 1)]; }
function sampleN(arr, n) {
  const a = [...arr]; const out = [];
  for (let i=0;i<n && a.length;i++) out.push(a.splice(randInt(0,a.length-1),1)[0]);
  return out;
}

function randomSex() { return sample(["M","F"]); }
function randomCancers() { return sampleN(CANCERS, randInt(1,2)); }

function patientsForHospital(h, count=6) {
  return Array.from({ length: count }).map((_, i) => {
    const status = sample(STATUSES);
    return {
      id: `${h.id}-P${String(i+1).padStart(2,"0")}`,
      name: `${h.borough} Case ${i+1}`,
      age: randInt(22, 86),
      sex: randomSex(),
      cancers: randomCancers(),
      status, // one of: red/yellow/surveillance/incomplete
      incomplete: status === "incomplete",
      surveillance: status === "surveillance",
      location: {
        city: "New York",
        borough: h.borough,
        zip: h.zip,
        lat: h.lat + (Math.random()-0.5) * 0.01, // tiny jitter around hospital
        lng: h.lng + (Math.random()-0.5) * 0.01,
      },
    };
  });
}

function generateNYData() {
  // ~6 patients per hospital for a nice spread
  return NYC_HOSPITALS.flatMap(h => patientsForHospital(h, 6));
}

// ---------- 3) Icon + FitBounds (as you had) ----------
function DotIcon({ color, ring }) {
  return L.divIcon({
    className: "pm-divicon",
    html: `<span class="pm-dot" style="
      background:${color};
      ${ring ? 'box-shadow: inset 0 0 0 1px var(--card-border);' : ''}
    "></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -9],
  });
}

function FitBounds({ points }) {
  const map = useMap();
  React.useEffect(() => {
    if (!points.length) return;
    const bounds = L.latLngBounds(points.map(p => [p.lat, p.lng]));
    map.fitBounds(bounds.pad(0.2));
  }, [points, map]);
  return null;
}

// NYC bounding box (rough): keep to NYC only even if external data sneaks in
const NYC_BOUNDS = {
  minLat: 40.48, maxLat: 40.95,
  minLng: -74.27, maxLng: -73.68,
};
const isInNYC = (lat,lng) =>
  lat >= NYC_BOUNDS.minLat && lat <= NYC_BOUNDS.maxLat &&
  lng >= NYC_BOUNDS.minLng && lng <= NYC_BOUNDS.maxLng;

// ---------- 4) Map component ----------
export default function PatientMap({ patients }) {
  // If not provided, auto-generate New York dataset
  const nySeed = useMemo(() => generateNYData(), []);
  const source = patients && patients.length ? patients : nySeed;

  // Prepare points: NYC only + with lat/lng
  const points = useMemo(() => {
    return (source || [])
      .map(p => ({
        id: p.id,
        name: p.name,
        age: p.age,
        sex: p.sex,
        cancers: p.cancers || [],
        status: p.status || (p.incomplete ? "incomplete" : p.surveillance ? "surveillance" : "yellow"),
        zip: p.location?.zip,
        city: p.location?.city,
        lat: p.location?.lat,
        lng: p.location?.lng,
      }))
      .filter(p => Number.isFinite(p.lat) && Number.isFinite(p.lng) && isInNYC(p.lat, p.lng));
  }, [source]);

  const defaultCenter = [40.7128, -74.0060]; // Manhattan
  const center = points[0] ? [points[0].lat, points[0].lng] : defaultCenter;

  return (
    <div className="map-card">
      <div className="map-head">
        <div>
          <div className="section-title">Patient Cases Map — New York City</div>
          <div className="section-sub">Pins are jittered around major hospitals</div>
        </div>
        <div className="map-legend">
          <span><i className="mld mld-yellow" /> Caution</span>
          <span><i className="mld mld-red" /> Urgent</span>
          <span><i className="mld mld-grey" /> Incomplete</span>
          <span><i className="mld mld-white" /> Surveillance</span>
        </div>
      </div>

      <MapContainer center={center} zoom={16} className="map-wrap">
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds points={points} />

        {/* {points.map(p => {
          const color = statusColor(p.status);
          const ring = p.status === "surveillance";
          const icon = DotIcon({ color, ring });

          const initials = (p.name || "")
            .split(/\s+/).filter(Boolean).slice(0,2)
            .map(s => s[0]?.toUpperCase() || "").join("");

          return (
            <Marker key={p.id} position={[p.lat, p.lng]} icon={icon}>
              <Popup>
                <div className="popup">
                  <div className="popup-title">
                    {initials} <span className="popup-id">({p.id})</span>
                  </div>
                  <div className="popup-sub">{p.age} / {p.sex}</div>
                  <div className="popup-row"><b>ZIP:</b> {p.zip || "—"}</div>
                  <div className="popup-row"><b>City:</b> {p.city || "—"}</div>
                  <div className="popup-row"><b>Status:</b> {p.status}</div>
                  <div className="popup-row"><b>Cancers:</b> {(p.cancers || []).join(", ") || "—"}</div>
                </div>
              </Popup>
            </Marker>
          );
        })} */}

{points.map(p => {
  // label: use sex, age, or ⚕︎
  const label = p.sex || "⚕︎";

  const icon = BadgeIcon({ status: p.status, label });

  return (
    <Marker
      key={p.id}
      position={[p.lat, p.lng]}
      icon={icon}
      zIndexOffset={p.status === "red" ? 500 : 0} // urgent on top
    >
      <Popup>
        <div className="popup">
          <div className="popup-title">
            {p.name} <span className="popup-id">({p.id})</span>
          </div>
          <div className="popup-sub">{p.age} / {p.sex}</div>
          <div className="popup-row"><b>ZIP:</b> {p.zip || "—"}</div>
          <div className="popup-row"><b>City:</b> {p.city || "—"}</div>
          <div className="popup-row"><b>Status:</b> {p.status}</div>
          <div className="popup-row"><b>Cancers:</b> {(p.cancers || []).join(", ") || "—"}</div>
        </div>
      </Popup>
    </Marker>
  );
})}

      </MapContainer>
    </div>
  );
}
