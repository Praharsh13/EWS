import React,{useState,useMemo} from "react";
//import Header from "./Component/Header.jsx";
import KpiCard from "./Component/KpiCard.jsx";
import CancerDeathsBar from "./Component/CancerDeathBar.jsx";
import GenderRatioPie from "./Component/GenderRatioPie.jsx";
import { kpis, cancerDeaths,cancerDeathsMale,cancerDeathsFemale,cancerDeathsByCountry, genderRatio } from "./data/mock.js";
import PatientTriagePanel from "./Component/PatientTriagePanel.jsx";

import Layout from "./Component/Layout.jsx";
import ChartCard from "./Component/ChartCard.jsx";
import MatteFeature from "./Component/MatteFeature.jsx";
import DashboardHero from "./Component/DashboardHero.jsx";
import TriageTable from "./Component/TriageTable.jsx";
import { PATIENTS } from "./data/patients.js";
import { TRIAGE_ATTRIBUTES, TRIAGE_THRESHOLDS } from "./data/triage.js";
import { visitorKpis } from "./data/visitorMetrics.js";
import { useAuth } from "./context/AuthContext";
import AuthBar from "./Component/AuthBar.jsx";
import LoginCard from "./Component/LoginCard.jsx";
import MetricsPanel from "./Component/MetricsPanel.jsx"
import "leaflet/dist/leaflet.css";
import PatientMap from "./Component/PatientMap.jsx";
import { PATIENTS_NYC } from "./data/Map_Patients.js";


// function CompactHero({
//   video = "/ewslogo.mp4",
//   image = "/vision.png",
//   title = "EWS Predict: AI Cancer Risk Identification Dashboard",
//   subtitle = "Live operational view",
// }) {
//   return (
//     <div className="w-full">
//       {/* Gradient border wrapper */}
//       <div className="
//         relative rounded-2xl p-[1px]
//         bg-gradient-to-r from-brand-500/40 via-transparent to-brand-500/40
//         shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)]
//       ">
//         {/* Glass card */}
//         <div className="
//           rounded-2xl
//           bg-white/70 dark:bg-slate-900/60
//           backdrop-blur-md supports-[backdrop-filter]:backdrop-blur
//           ring-1 ring-slate-200/60 dark:ring-white/10
//         ">
//           {/* Subtle top accent line */}
//           <div className="h-1 rounded-t-2xl bg-gradient-to-r from-brand-500/50 via-transparent to-brand-500/50" />

//           <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
//             <div className="mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//               {/* Logo block */}
//               <div className="flex items-center gap-3 sm:gap-4">
//                 <div className="
//                   relative shrink-0 overflow-hidden
//                   h-14 w-14 lg:h-16 lg:w-16
//                   rounded-2xl
//                   bg-slate-100/80 dark:bg-slate-800/70
//                   ring-1 ring-slate-200/70 dark:ring-white/10
//                   shadow-sm
//                 ">
//                   <video
//                     className="hidden sm:block h-full w-full object-cover"
//                     src={video}
//                     autoPlay
//                     loop
//                     muted
//                     playsInline
//                   />
//                   <img
//                     className="sm:hidden h-full w-full object-contain p-1"
//                     src={image}
//                     alt="EWS logo"
//                   />
//                 </div>

//                 {/* Text stack */}
//                 <div className="text-center sm:text-left">
//                   {/* Title: split visually but keep your prop semantics */}
//                   <h1 className="text-lg sm:text-xl lg:text-2xl font-extrabold tracking-tight">
//                     <span className="text-brand-600">EWS</span> Predict
//                   </h1>
//                   <p className="mt-0.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
//                     AI Cancer Risk Identification Dashboard
//                   </p>
//                   <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 italic">
//                     {subtitle}
//                   </p>
//                 </div>
//               </div>

//               {/* Right side CTA / quick stats (optional) */}
//               {/* <div className="mt-1 sm:mt-0">
//                 <span className="inline-flex items-center rounded-full px-3 py-1 text-xs
//                   bg-emerald-50 dark:bg-emerald-900/30
//                   text-emerald-700 dark:text-emerald-300
//                   ring-1 ring-emerald-200/60 dark:ring-emerald-800/60">
//                   Model v2.3 • Uptime 99.98%
//                 </span>
//               </div> */}
//             </div>
//           </div>

//           {/* Soft bottom divider */}
//           <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-300/50 dark:via-white/10 to-transparent" />
//         </div>
//       </div>
//     </div>
//   );
// }

function LogoBlock({ image = "/ewslogo.png", video = "/ewslogo.mp4" }) {
  const [imgOk, setImgOk] = React.useState(true);

  return (
    <div className="relative shrink-0 overflow-hidden
                h-16 w-16 lg:h-20 lg:w-20
                rounded-2xl bg-slate-100/80 dark:bg-slate-800/70
                ring-1 ring-slate-200/70 dark:ring-white/10 shadow-sm">

  {/* Image: full-bleed like video on mobile */}
  <img
    src={image}
    alt="EWS logo"
    className={`absolute inset-0 h-full w-full object-cover z-10 transition-transform duration-300 ${imgOk ? "block" : "hidden"}`}
    loading="eager"
    onError={() => setImgOk(false)}
  />

  {/* Subtle sheen (optional) */}
  <div className="pointer-events-none absolute inset-0 rounded-2xl
                  bg-gradient-to-tr from-white/10 via-transparent to-transparent" />

  {/* Placeholder when image can’t load */}
  {!imgOk && (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <div className="h-full w-full rounded-2xl
                      bg-gradient-to-br from-brand-500/20 to-brand-600/30
                      flex items-center justify-center">
        <span className="text-brand-600 font-extrabold text-lg lg:text-xl">EWS</span>
      </div>
    </div>
  )}


      {/* Desktop only: overlay video above image */}
      <video
        className="hidden sm:block absolute inset-0 h-full w-full object-cover z-20"
        src={video}
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
}

 function CompactHero({
  video = "/ewslogo.mp4",
  image = "/ewslogo.png",
  title = "EWS Predict: AI Cancer Risk Identification Dashboard",
  subtitle = "Live operational view",
}) {
  return (
    <div className="w-full">
      <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-brand-500/40 via-transparent to-brand-500/40
                      shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)]">
        <div className="rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-md
                        supports-[backdrop-filter]:backdrop-blur ring-1 ring-slate-200/60 dark:ring-white/10">
          <div className="h-1 rounded-t-2xl bg-gradient-to-r from-brand-500/50 via-transparent to-brand-500/50" />
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
            <div className="mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Left: Logo + Text */}
              <div className="flex items-center gap-3 sm:gap-4">
                <LogoBlock image={image} video={video} />
                <div className="text-center sm:text-left">
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-extrabold tracking-tight">
                    <span className="text-brand-600">EWS</span> Predict
                  </h1>
                  <p className="mt-0.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    AI Cancer Risk Identification Dashboard
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 italic">
                    {subtitle}
                  </p>
                </div>
              </div>
              {/* Right slot (optional) */}
            </div>
          </div>
          <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-300/50 dark:via-white/10 to-transparent" />
        </div>
      </div>
    </div>
  );
}






import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";

const baseBtn =
  "inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";
const activeBtn =
  "bg-brand-600 text-white focus:ring-brand-600 hover:bg-brand-700"; // active hover = darker shade
const inactiveBtn =
  "border border-slate-300 text-slate-700 hover:bg-slate-100 " +
  "dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"; // hover dark in dark mode
//Navbutton
// function NavButton({ id, icon, label, view, setView }) {
//   const isActive = view === id;
//   return (
//     <button
//       onClick={() => setView(id)}
//       className={`${baseBtn} ${isActive ? activeBtn : inactiveBtn}`}
//       aria-current={isActive ? "page" : undefined}
//     >
//       <span className="mr-1">{icon}</span>
//       {label}
//     </button>
//   );
// }

function NavButton({ id, icon, label, view, setView, extraClass = "" }) {
  const isActive = view === id;
  const baseBtn =
    "inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  const activeBtn =
    "bg-brand-600 text-white focus:ring-brand-600 hover:bg-brand-700";
  const inactiveBtn =
    "border border-slate-300 text-slate-700 hover:bg-slate-100 " +
    "dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700";

  return (
    <button
      onClick={() => setView(id)}
      className={`${baseBtn} ${isActive ? activeBtn : inactiveBtn} ${extraClass}`}
      aria-current={isActive ? "page" : undefined}
    >
      <span className="mr-1">{icon}</span>
      {label}
    </button>
  );
}



export default function App() {
  const { user } = useAuth();
  const [view, setView] = useState("dashboard"); // dashboard | triage | anotherPage
  const othersGlobal = Math.max(0, 100 - (genderRatio.male + genderRatio.female));

  

  if (!user) {
    return (
      <div className="min-h-screen app-bg">
        <section className="section">{/* ← removed hero-compact */}
          <DashboardHero
            video="/ewslogo.mp4"
            image="/vision.png"
            title="EWS Predict: AI Cancer Risk Identification Dashboard"
            subtitle="Welcome. Sign in to view live KPIs, data visualization and triage."
          />
        </section>
  
        <section className="section">
          <LoginCard />
        </section>
  
        <div className="section"><div className="hr-line" /></div>
      </div>
    );
  }
  

  // Logged-in user views
  return (
    // <div className="min-h-screen app-bg">
    //   {/* HERO with nav buttons */}
    //   <section className="section">
    //     <DashboardHero
    //       video="/ewslogo.mp4"
    //       image="/vision.png"
    //       title="EWS Predict: AI Cancer Risk Identification Dashboard"
    //       subtitle="Live operational view"
    //       right={<AuthBar />}
    //     />
    <div className="min-h-screen app-bg">
    <header className="topbar">
      <AuthBar />
    </header>

    <section className="section hero-compact">{/* ← compact only when logged in */}
      {/* <DashboardHero
        video="/ewslogo.mp4"
        image="/vision.png"
        title="EWS Predict: AI Cancer Risk Identification Dashboard"
        subtitle="Live operational view"
      /> */}

<CompactHero
    video="/ewslogo.mp4"
    image="/ewslogo.png"
    title="EWS Predict: AI Cancer Risk Identification Dashboard"
    subtitle="Live operational view"
  />
        {/* <div className="mt-6 flex flex-wrap gap-4">
          <button className="btn btn-primary" onClick={() => setView("dashboard")}>
            📊 Main
          </button>
          <button className="btn btn-secondary" onClick={() => setView("triage")}>
            🚦 Patient Alert
          </button>
          <button className="btn btn-outline" onClick={() => setView("metrics")}>📈 Cohort Metrics</button>
          <button className="btn btn-accent" onClick={() => setView("ewi")}>

    👥 EWS Team
  </button>
 
<button className="btn btn-outline" onClick={() => setView("map")}>🗺️ Case Map</button>

        </div> */}

{/* <div className="mt-6 flex flex-wrap gap-3" role="tablist" aria-label="Main sections">
  <NavButton id="dashboard" icon="📊" label="Main"          view={view} setView={setView} />
  <NavButton id="triage"    icon="🚦" label="Patient Alert"  view={view} setView={setView} />
  <NavButton id="metrics"   icon="📈" label="Cohort Metrics" view={view} setView={setView} />
 
  <NavButton id="map"       icon="🗺️" label="Case Map"      view={view} setView={setView} />
  <NavButton id="ewi"       icon="👥" label="EWS Team"       view={view} setView={setView} />
</div> */}

<div className="mt-6 flex items-center justify-between" role="tablist" aria-label="Main sections">
  {/* Left side: main nav buttons */}
  <div className="flex flex-wrap gap-3">
    <NavButton id="dashboard" icon="📊" label="Main"          view={view} setView={setView} />
    <NavButton id="triage"    icon="🚦" label="Patient Alert"  view={view} setView={setView} />
    <NavButton id="metrics"   icon="📈" label="Cohort Metrics" view={view} setView={setView} />
    <NavButton id="map"       icon="🗺️" label="Case Map"      view={view} setView={setView} />
  </div>

  {/* Right side: special EWS button */}
  <NavButton
    id="ewi"
    icon="👥"
    label="EWS Team"
    view={view}
    setView={setView}
    extraClass="bg-indigo-600 text-white hover:bg-indigo-700"
  />
</div>


<div className="relative mt-2 h-1 w-full max-w-xl bg-slate-200 dark:bg-slate-700 rounded">
  <div
    className="absolute h-1 bg-brand-600 rounded transition-all duration-300"
    style={{
      width: "20%", // 5 tabs → 20% each
      left:
        ({ dashboard: 0, triage: 20, metrics: 40, ewi: 60, map: 80 }[view] || 0) + "%"
    }}
  />
</div>
      </section>

      {/* Dashboard page */}
      {view === "dashboard" && (
        <>
          <section className="section">
            <div className="section-head">
              <div>
                <div className="section-title">Key Metrics</div>
                <div className="section-sub">Model performance & current information</div>
              </div>
            </div>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <KpiCard label="Detection Rate" value="92%" trend="+1.2%" icon="🧠" />
              <KpiCard label="False Positives" value="5%" trend="-0.4%" icon="⚖️" />
              <KpiCard label="False Negatives" value="3%" trend="+0.1%" icon="🧪" />
              <KpiCard label="Active Alerts" value="7" trend="+2" icon="🚨" />
            </div> */}
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
  <KpiCard label="Active Red Alert"    value="3"   trend="+1" icon="🔴" variant="rose" />
  <KpiCard label="Active Yellow Alert" value="5"   trend="0"  icon="🟡" variant="amber" />
  <KpiCard label="Patient Volume"       value="M: 120 • F: 95" trend="+4" icon="👥" variant="teal" />
  <KpiCard label="Avg Visits / Day"       value="240" trend="+12" icon="📅" variant="brand" />
  <KpiCard label="Last Data Feed"       value="2025-09-14 10:45" trend="—" icon="⏱" variant="slate" span={1}  />
</div>
          </section>

          <section className="section">
            <div className="section-head">
              <div>
                <div className="section-title">Population Overview</div>
                <div className="section-sub">Compare mortality by cancer type and track cohort balance</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <ChartCard title="Cancer Types & Deaths" subtitle="Filter by cohort or country" height={360}>
                  <CancerDeathsBar
                    datasets={{
                      global: cancerDeaths,
                      male: cancerDeathsMale,
                      female: cancerDeathsFemale,
                      byCountry: cancerDeathsByCountry,
                    }}
                    defaultDataset="global"
                    defaultCountry="GLOBAL"
                  />
                </ChartCard>
              </div>

              <ChartCard title="Male • Female" subtitle="Detected case ratio" height={360}>
                <GenderRatioPie
                  datasets={{
                    global: { male: genderRatio.male, female: genderRatio.female, others: othersGlobal },
                    byCountry: {
                      USA: { male: 56, female: 44, others: 0 },
                      GBR: { male: 53, female: 47, others: 0 },
                      IND: { male: 58, female: 42, others: 0 },
                    },
                  }}
                  defaultCountry="GLOBAL"
                />
              </ChartCard>
            </div>
          </section>

          <section className="section">
            <MatteFeature image="/problem.png">
             
             
            </MatteFeature>
          </section>
        </>
      )}

      {/* Triage page */}
      {view === "triage" && (
        <section className="section">
          <div className="section-head">
            <div>
              <div className="section-title">Patient Alert</div>
              <div className="section-sub">Automatic scoring from attributes • traffic-light priority</div>
            </div>
          </div>
          <TriageTable
            patients={PATIENTS}
            attributes={TRIAGE_ATTRIBUTES}
            thresholds={TRIAGE_THRESHOLDS}
          />
        </section>
      )}

{view === "metrics" && (
  <section className="section">
    <div className="section-head">
      <div>
        <div className="section-title">Cohort Metrics</div>
        <div className="section-sub">Detected cancers, demographics & attributes</div>
      </div>
    </div>
    <MetricsPanel patients={PATIENTS} />
  </section>
)}
{view === "ewi" && (
  <section className="section">
    <div className="section-head">
      <div>
        <div className="section-title">Enhanced Metrics</div>
        <div className="section-sub">High-level activity across the platform</div>
      </div>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <KpiCard label="Active Red Alert"    value="3"   trend="+1" icon="🔴" variant="rose" />
  <KpiCard label="Active Yellow Alert" value="5"   trend="0"  icon="🟡" variant="amber" />
  <KpiCard label="Patient Volume"       value="M: 120 • F: 95" trend="+4" icon="👥" variant="teal" />
  {/* <KpiCard label="Visits per Day"       value="240" trend="+12" icon="📅" variant="brand" /> */}
  <KpiCard label="Last Data Feed"       value="2025-09-14 10:45" trend="—" icon="⏱" variant="slate" span={1}  />
              <KpiCard label="Total Patients" value="12,480" trend="+1.2%" icon="👥" />
              <KpiCard label="False Positives" value="5%" trend="-0.4%" icon="⚖️" />
              <KpiCard label="False Negatives" value="3%" trend="+0.1%" icon="🧪" />
              <KpiCard label="Total Active Alerts" value="7" trend="+2" icon="🚨" />
            </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
        
      
      
      {visitorKpis.map((k) => (
        <KpiCard key={k.label} {...k} />
      ))}
    </div>
  </section>
)}
{view === "map" && (
  <section className="section">
    <PatientMap patients={PATIENTS_NYC} />
  </section>
)}

    </div>
  );
}