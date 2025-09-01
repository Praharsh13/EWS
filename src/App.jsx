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

// export default function App() {
//   return (
//     <div className="min-h-screen app-bg">
//       {/* HERO */}
//       <section className="section">
//         <DashboardHero
//           video="/ewslogo.mp4"             // keep your hero video feel; swap to image by setting video={null}
//           image="/vision.png"
//           title="AI Cancer Detection Dashboard"
//           subtitle="Operational overview • updated live. Explore mortality trends, cohort ratios, geospatial spread, and triage signals."
//           tag="Live • production"
//         />
//       </section>

//       {/* LOGO STRIP (optional) */}
//       {/* <section className="section">
//         <div className="card p-3">
//           <div className="logo-strip">
//             {["Carousel1","Carousel2","Carousel3","Carousel4","Carousel5","Carousel6","Carousel16","Carousel7","Carousel8","Carousel9","Carousel10","Carousel11","Carousel12","Carousel14","Carousel17","Carousel15"].map((n,i)=>(
//               <img key={i} src={`/carousel/${n}.png`} alt={n} />
//             ))}
//           </div>
//         </div>
//       </section> */}

//       {/* KPIs */}
//       <section className="section">
//         <div className="section-head">
//           <div>
//             <div className="section-title">Key Metrics</div>
//             <div className="section-sub">Snapshot of model performance & operational health</div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           <KpiCard label="Detection Rate" value="92%" trend="+1.2%" icon="🧠" />
//           <KpiCard label="False Positives" value="5%" trend="-0.4%" icon="⚖️" />
//           <KpiCard label="False Negatives" value="3%" trend="+0.1%" icon="🧪" />
//           <KpiCard label="Active Alerts" value="7" trend="+2" icon="🚨" />
//         </div>
//       </section>

//       {/* CHARTS */}
//       <section className="section">
//         <div className="section-head">
//           <div>
//             <div className="section-title">Population Overview</div>
//             <div className="section-sub">Cancer-specific mortality and cohort balance</div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//           <div className="lg:col-span-2">
//             {/* <ChartCard title="Cancer Types & Deaths" subtitle="Annual counts (mock)">
//               <CancerDeathsBar data={cancerDeaths} />
//             </ChartCard> */}
//            <ChartCard
//   title="Cancer Types & Deaths"
//   subtitle="Filter by cohort or country"
//   right={
//     /* extra quick action in header (optional) */
//     <button className="btn">Export CSV</button>
//   }
//   toolbar={
//     /* you can move the selects here if you prefer a full-width toolbar
//        but currently CancerDeathsBar renders its own small controls */
//     null
//   }
//   footer={
//     <div className="muted">
//       Values are annualized; hover bars for exact counts
//     </div>
//   }
//   height={320}
// >
//   <CancerDeathsBar
//     datasets={{
//       global: cancerDeaths,
//       male: cancerDeathsMale,
//       female: cancerDeathsFemale,
//       byCountry: cancerDeathsByCountry,
//     }}
//     defaultDataset="global"
//     defaultCountry="GLOBAL"
//   />
// </ChartCard>
//           </div>
//           {/* <ChartCard title="Male vs Female" subtitle="Detected case ratio">
//             <GenderRatioPie male={genderRatio.male} female={genderRatio.female} />
//           </ChartCard> */}
//           <ChartCard title="Male vs Female" subtitle="Detected case ratio">
//   <GenderRatioPie
//     datasets={{
//       global:   { male: 55, female: 45, others:67},
//       byCountry:{ USA:{ male:56, female:44 }, GBR:{ male:53, female:47 }, IND:{ male:58, female:42 } }
//     }}
//     defaultCountry="GLOBAL"
//   />
// </ChartCard>
//         </div>
//       </section>

//       {/* MATTE CALLOUT (like landing page, inside the dashboard flow) */}
//       <section className="section">
//         <MatteFeature image="/problem.png">
//           <p><b>Context matters.</b> Our system combines structured attributes, imaging cues, and longitudinal records to reduce misses.</p>
//           <p className="mt-1">Use the triage panel to quickly see *why* a patient is green/yellow/red — then jump to the relevant notes.</p>
//         </MatteFeature>
//       </section>

//       {/* TRIAGE */}
//       <section className="section">
//   <div className="section-head">
//     <div>
//       <div className="section-title">Patient Triage</div>
//       <div className="section-sub">Automatic scoring from attributes; traffic‑light priority</div>
//     </div>
//   </div>

//   <TriageTable
//     patients={PATIENTS}
//     attributes={TRIAGE_ATTRIBUTES}
//     thresholds={TRIAGE_THRESHOLDS}
//   />
// </section>
//       {/* FOOTER LINE */}
//       <div className="section"><div className="hr-line" /></div>
//     </div>
//   );
// }
// export default function App() {
//   // Demo navigation (sidebar buttons)
//   const [route, setRoute] = useState("dashboard"); // "home" | "dashboard" | "about"

//   // Helpers: compute a valid "others" so the pie adds to 100
//   const othersGlobal = Math.max(0, 100 - (genderRatio.male + genderRatio.female));

//   return (
//     <div className="min-h-screen app-bg">
    
//         {/* HOME (demo) */}
//         {/* {route === "home" && (
//           <>
//             <section className="section">
//               <DashboardHero
//                 video="/ewslogo.mp4"
//                 image="/vision.png"
//                 title="Early Warning Signals"
//                 subtitle="A focused workspace to surface cancer signals earlier—so teams can act faster with confidence."
//               />
//             </section>

//             <section className="section">
//               <div className="section-head">
//                 <div>
//                   <div className="section-title">What you can do</div>
//                   <div className="section-sub">
//                     Track model quality, compare populations, and prioritise care with triage.
//                   </div>
//                 </div>
//               </div>
//               <div className="card p-5">
//                 <p className="muted">
//                   Open <b>Dashboard</b> to see the live overview of model outputs and patient risk.
//                 </p>
//               </div>
//             </section>
//           </>
//         )} */}

     
//           {/* <>
//             {/* HERO */}
//             <section className="section">
//               <DashboardHero
//                 video="/ewslogo.mp4"
//                 image="/vision.png"
//                 title="AI Cancer Detection Dashboard"
//                 subtitle="Live operational view — mortality by cancer type, cohort ratios, and patient triage priorities."
//               />
//             </section>

//             {/* KPIs */}
//             <section className="section">
//               <div className="section-head">
//                 <div>
//                   <div className="section-title">Key Metrics</div>
//                   <div className="section-sub">
//                     Model performance & current load — updated continuously
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                 <KpiCard label="Detection Rate" value="92%" trend="+1.2%" icon="🧠" />
//                 <KpiCard label="False Positives" value="5%" trend="-0.4%" icon="⚖️" />
//                 <KpiCard label="False Negatives" value="3%" trend="+0.1%" icon="🧪" />
//                 <KpiCard label="Active Alerts" value="7" trend="+2" icon="🚨" />
//               </div>
//             </section>

//             {/* CHARTS */}
//             <section className="section">
//               <div className="section-head">
//                 <div>
//                   <div className="section-title">Population Overview</div>
//                   <div className="section-sub">
//                     Compare mortality by cancer type and track cohort balance across regions
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//                 {/* Bar chart */}
//                 <div className="lg:col-span-2">
//                   <ChartCard
//                     title="Cancer Types & Deaths"
//                     subtitle="Filter by cohort or country"
//                     right={<button className="btn">Export CSV</button>}
//                     footer={
//                       <div className="muted">Values are annualised; hover bars for exact counts</div>
//                     }
//                     height={360}
//                   >
//                     <CancerDeathsBar
//                       datasets={{
//                         global: cancerDeaths,
//                         male: cancerDeathsMale,
//                         female: cancerDeathsFemale,
//                         byCountry: cancerDeathsByCountry,
//                       }}
//                       defaultDataset="global"
//                       defaultCountry="GLOBAL"
//                     />
//                   </ChartCard>
//                 </div>

//                 {/* Pie chart */}
//                 <ChartCard
//                   title="Male • Female • Others"
//                   subtitle="Detected case ratio (country filter optional)"
//                   height={360}
//                 >
//                   <GenderRatioPie
//                     datasets={{
//                       global: {
//                         male: genderRatio.male,
//                         female: genderRatio.female,
//                         others: genderRatio.others,
//                       },
//                       byCountry: {
//                         USA: { male: 56, female: 44, others: 2 },
//                         GBR: { male: 53, female: 47, others: 4 },
//                         IND: { male: 58, female: 42, others: 1 },
//                       },
//                     }}
//                     defaultCountry="GLOBAL"
//                   />
//                 </ChartCard>
//               </div>
//             </section>

//             {/* CALLOUT */}
//             <section className="section">
//               <MatteFeature image="/problem.png">
//                 <p>
//                   <b>Context matters.</b> We blend structured attributes, imaging cues, and
//                   longitudinal records to reduce misses and surface early signals.
//                 </p>
//                 <p className="mt-1">
//                   Use triage to see <i>why</i> a patient is green/yellow/red, then jump straight to
//                   the notes that matter.
//                 </p>
//               </MatteFeature>
//             </section>

//             {/* TRIAGE */}
//             <section className="section">
//               <div className="section-head">
//                 <div>
//                   <div className="section-title">Patient Triage</div>
//                   <div className="section-sub">
//                     Automatic scoring from attributes • traffic‑light priority
//                   </div>
//                 </div>
//               </div>

//               <TriageTable
//                 patients={PATIENTS}
//                 attributes={TRIAGE_ATTRIBUTES}
//                 thresholds={TRIAGE_THRESHOLDS}
//               />
//             </section>

//             {/* FOOTER */}
//             <div className="section">
//               <div className="hr-line" />
//             </div>
//           </>
        

//         {/* ABOUT (demo) */}
       
      
//     </div>
//   );
// } */}

// export default function App() {
//   const { user } = useAuth();
//   const othersGlobal = Math.max(0, 100 - (genderRatio.male + genderRatio.female));

//   return (
//     <div className="min-h-screen app-bg">
//       {/* HERO */}
//       <section className="section">
//         <DashboardHero
//           video="/ewslogo.mp4"
//           image="/vision.png"
//           title="AI Cancer Detection Dashboard"
//           subtitle={
//             user
//               ? "Live operational view — mortality by cancer type, cohort ratios, and triage priorities."
//               : "Welcome. Sign in to view live KPIs, charts and triage. The visitor view shows high-level activity."
//           }
//           right={<AuthBar />}
//         />
//       </section>

//       {/* If NOT logged in: Visitor KPIs + Login */}
//       {!user && (
//         <>
//           <section className="section">
//             <div className="section-head">
//               <div>
//                 <div className="section-title">Overview (Visitor)</div>
//                 <div className="section-sub">High-level activity across the platform</div>
//               </div>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//               {visitorKpis.map((k) => (
//                 <KpiCard key={k.label} {...k} />
//               ))}
//             </div>
//           </section>

//           <section className="section">
//             <LoginCard />
//           </section>

//           <div className="section"><div className="hr-line" /></div>
//         </>
//       )}

//       {/* If logged in: full dashboard */}
//       {user && (
//         <>
//           {/* KPIs */}
//           <section className="section">
//             <div className="section-head">
//               <div>
//                 <div className="section-title">Key Metrics</div>
//                 <div className="section-sub">Model performance & current load — updated continuously</div>
//               </div>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//               <KpiCard label="Detection Rate" value="92%" trend="+1.2%" icon="🧠" />
//               <KpiCard label="False Positives" value="5%" trend="-0.4%" icon="⚖️" />
//               <KpiCard label="False Negatives" value="3%" trend="+0.1%" icon="🧪" />
//               <KpiCard label="Active Alerts" value="7" trend="+2" icon="🚨" />
//             </div>
//           </section>

//           {/* Charts */}
//           <section className="section">
//             <div className="section-head">
//               <div>
//                 <div className="section-title">Population Overview</div>
//                 <div className="section-sub">Compare mortality by cancer type and track cohort balance across regions</div>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//               <div className="lg:col-span-2">
//                 <ChartCard
//                   title="Cancer Types & Deaths"
//                   subtitle="Filter by cohort or country"
//                   right={<button className="btn">Export CSV</button>}
//                   footer={<div className="muted">Values are annualised; hover bars for exact counts</div>}
//                   height={360}
//                 >
//                   <CancerDeathsBar
//                     datasets={{
//                       global: cancerDeaths,
//                       male: cancerDeathsMale,
//                       female: cancerDeathsFemale,
//                       byCountry: cancerDeathsByCountry,
//                     }}
//                     defaultDataset="global"
//                     defaultCountry="GLOBAL"
//                   />
//                 </ChartCard>
//               </div>

//               <ChartCard title="Male • Female • Others" subtitle="Detected case ratio (country filter optional)" height={360}>
//                 <GenderRatioPie
//                   datasets={{
//                     global: { male: genderRatio.male, female: genderRatio.female, others: othersGlobal },
//                     byCountry: {
//                       USA: { male: 56, female: 44, others: 0 },
//                       GBR: { male: 53, female: 47, others: 0 },
//                       IND: { male: 58, female: 42, others: 0 },
//                     },
//                   }}
//                   defaultCountry="GLOBAL"
//                 />
//               </ChartCard>
//             </div>
//           </section>

//           {/* Callout */}
//           <section className="section">
//             <MatteFeature image="/problem.png">
//               <p><b>Context matters.</b> We blend structured attributes, imaging cues, and longitudinal records to reduce misses.</p>
//               <p className="mt-1">Use triage to see <i>why</i> a patient is green/yellow/red, then jump straight to the notes that matter.</p>
//             </MatteFeature>
//           </section>

//           {/* Triage */}
//           <section className="section">
//             <div className="section-head">
//               <div>
//                 <div className="section-title">Patient Triage</div>
//                 <div className="section-sub">Automatic scoring from attributes • traffic-light priority</div>
//               </div>
//             </div>
//             <TriageTable patients={PATIENTS} attributes={TRIAGE_ATTRIBUTES} thresholds={TRIAGE_THRESHOLDS} />
//           </section>

//           <div className="section"><div className="hr-line" /></div>
//         </>
//       )}
//     </div>
//   );
// }

import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";


export default function App() {
  const { user } = useAuth();
  const [view, setView] = useState("dashboard"); // dashboard | triage | anotherPage
  const othersGlobal = Math.max(0, 100 - (genderRatio.male + genderRatio.female));

  if (!user) {
    // Visitor view (same as before)
    return (
      <div className="min-h-screen app-bg">
        <section className="section">
          <DashboardHero
            video="/ewslogo.mp4"
            image="/vision.png"
            title="AI Cancer Detection Dashboard"
            subtitle="Welcome. Sign in to view live KPIs, charts and triage."
            right={<AuthBar />}
          />
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <div className="section-title">Overview </div>
              <div className="section-sub">High-level activity across the platform</div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {visitorKpis.map((k) => (
              <KpiCard key={k.label} {...k} />
            ))}
          </div>
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
    <div className="min-h-screen app-bg">
      {/* HERO with nav buttons */}
      <section className="section">
        <DashboardHero
          video="/ewslogo.mp4"
          image="/vision.png"
          title="AI Cancer Detection Dashboard"
          subtitle="Live operational view — choose a workspace."
          right={<AuthBar />}
        />
        <div className="mt-6 flex flex-wrap gap-4">
          <button className="btn btn-primary" onClick={() => setView("dashboard")}>
            📊 Dashboard
          </button>
          <button className="btn btn-secondary" onClick={() => setView("triage")}>
            🚦 Patient Triage
          </button>
          <button className="btn btn-outline" onClick={() => setView("metrics")}>📈 Metrics</button>
        </div>
      </section>

      {/* Dashboard page */}
      {view === "dashboard" && (
        <>
          <section className="section">
            <div className="section-head">
              <div>
                <div className="section-title">Key Metrics</div>
                <div className="section-sub">Model performance & current load</div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <KpiCard label="Detection Rate" value="92%" trend="+1.2%" icon="🧠" />
              <KpiCard label="False Positives" value="5%" trend="-0.4%" icon="⚖️" />
              <KpiCard label="False Negatives" value="3%" trend="+0.1%" icon="🧪" />
              <KpiCard label="Active Alerts" value="7" trend="+2" icon="🚨" />
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

              <ChartCard title="Male • Female • Others" subtitle="Detected case ratio" height={360}>
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
              <div className="section-title">Patient Triage</div>
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
    </div>
  );
}