// src/components/DashboardHero.jsx
// import React from "react";

// export default function DashboardHero({
//   video = "/ewslogo.mp4",
//   image = "/vision.png",
//   title = "AI Cancer Detection Dashboard",
//   subtitle = "Operational overview • updated live. Explore mortality trends, cohort ratios, and triage signals.",
//   tag = "Live • production",
//   right = null,
// }) {
//   return (
//     <div className="dash-hero">
//       {video ? (
//         <video className="dash-hero-media" src={video} autoPlay muted loop playsInline />
//       ) : (
//         <img className="dash-hero-media" src={image} alt="" />
//       )}

//       <div className="dash-hero-overlay">
      
//         <div className="dash-hero-title">{title}</div>
//         <div className="dash-hero-sub">{subtitle}</div>

//         <div className="flex flex-wrap gap-8 items-center mt-1">
         
//           {right}
//         </div>
//       </div>
//     </div>
//   );
// }
// import React from "react";

// export default function DashboardHero({
//   video = "/ewslogo.mp4",
//   image = "/vision.png",
//   title = "AI Cancer Detection Dashboard",
//   subtitle = "Operational overview • updated live. Explore mortality trends, cohort ratios, and triage signals.",
//   right = null,
// }) {
//   return (
//     <div className="dash-hero relative w-full h-[55vh] min-h-[420px] rounded-3xl overflow-hidden shadow-xl">
//       {/* Background Media */}
//       {video ? (
//         <video
//           className="absolute inset-0 w-full h-full object-cover"
//           src={video}
//           autoPlay
//           muted
//           loop
//           playsInline
//         />
//       ) : (
//         <img
//           className="absolute inset-0 w-full h-full object-cover"
//           src={image}
//           alt=""
//         />
//       )}

//       {/* Dark / gradient overlay */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

//       {/* Content Overlay */}
//       <div className="relative z-10 flex flex-col justify-end h-full p-10 text-white">
//         {/* Title */}
//         <h1 className="text-4xl md:text-5xl font-bold tracking-tight drop-shadow-lg">
//           {title}
//         </h1>

//         {/* Subtitle */}
//         <p className="mt-3 text-lg md:text-xl text-slate-200 max-w-2xl">
//           {subtitle}
//         </p>

//         {/* Actions */}
//         {right && (
//           <div className="flex flex-wrap gap-4 mt-6">{right}</div>
//         )}
//       </div>
//     </div>
//   );
// }
import React from "react";

export default function DashboardHero({
  video = "/ewslogo.mp4",
  image = "/vision.png",
  title = "AI Cancer Detection Dashboard",
  subtitle = "Operational overview • updated live. Explore mortality trends, cohort ratios, and triage signals.",
  tag = "Live • production",
  right = null,
}) {
  return (
    <div className="dash-hero relative w-full h-[55vh] min-h-[420px] rounded-3xl overflow-hidden shadow-xl">
      {/* Background Media */}
      {video ? (
        <video
          className="dash-hero-media absolute inset-0 w-full h-full object-cover"
          src={video}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <img
          className="dash-hero-media absolute inset-0 w-full h-full object-cover"
          src={image}
          alt=""
        />
      )}

      {/* Dark / gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col justify-end h-full p-10 text-white">
        {/* Tag */}
        <div className="inline-block px-3 py-1 mb-3 rounded-full bg-green-500/20 text-green-300 text-xs font-semibold tracking-wide">
          {tag}
        </div>

        {/* Title */}
        <h1 className="dash-hero-title text-4xl md:text-5xl font-bold tracking-tight drop-shadow-lg">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="dash-hero-sub mt-3 text-lg md:text-xl text-slate-200 max-w-2xl">
          {subtitle}
        </p>

        {/* Actions */}
        {right && (
          <div className="flex flex-wrap gap-4 mt-6">{right}</div>
        )}
      </div>
    </div>
  );
}
