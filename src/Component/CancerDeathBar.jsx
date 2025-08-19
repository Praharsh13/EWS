import React, { useState,useMemo } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

// export default function CancerDeathsBar({ data }) {
//   const { theme } = useTheme();
//   const isDark = theme === "dark";

//   const colors = {
//     grid: isDark ? "#1f2937" : "#e2e8f0",   // slate-800 / slate-200
//     axis: isDark ? "#94a3b8" : "#475569",   // slate-400 / slate-600
//     fill: isDark ? "#60a5fa" : "#2563eb",   // blue-400 / blue-600
//     card: isDark ? "#0b1220" : "#ffffff",
//     fg:   isDark ? "#e2e8f0" : "#0f172a",
//   };

//   return (
//     <ResponsiveContainer width="100%" height="100%">
//       <BarChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
//         <XAxis dataKey="type" stroke={colors.axis} />
//         <YAxis stroke={colors.axis} />
//         <Tooltip
//           contentStyle={{ background: colors.card, border: `1px solid ${colors.grid}` }}
//           labelStyle={{ color: colors.fg }}
//           itemStyle={{ color: colors.fg }}
//         />
//         <Bar dataKey="deaths" fill={colors.fill} radius={[6, 6, 0, 0]} />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// }
export default function CancerDeathsBar({
    data,                             // legacy prop (array)
    datasets,                         // new prop (object)
    defaultDataset = "global",
    defaultCountry = "GLOBAL",
    showCountry = true,
  }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
  
    // Normalize props (support legacy `data`)
    const base = useMemo(() => {
      if (datasets && (datasets.global || datasets.male || datasets.female || datasets.byCountry)) {
        return datasets;
      }
      return { global: Array.isArray(data) ? data : [] };
    }, [datasets, data]);
  
    const hasMale     = Array.isArray(base.male) && base.male.length > 0;
    const hasFemale   = Array.isArray(base.female) && base.female.length > 0;
    const countryMap  = base.byCountry || {};
    const countryKeys = Object.keys(countryMap);
    const hasCountry  = showCountry && countryKeys.length > 0;
  
    const [mode, setMode] = useState((hasMale || hasFemale) ? defaultDataset : "global");
    const [country, setCountry] = useState(defaultCountry);
  
    // Pick the active series
    const series = useMemo(() => {
      if (hasCountry && country !== "GLOBAL" && countryMap[country]) return countryMap[country];
      if (mode === "male"   && hasMale)   return base.male;
      if (mode === "female" && hasFemale) return base.female;
      return base.global || [];
    }, [mode, country, base, hasMale, hasFemale, hasCountry, countryMap]);
  
    // Theme colours
    const colors = {
      grid:  isDark ? "#1f2937" : "#e2e8f0",  // subtle solid grid
      axis:  isDark ? "#94a3b8" : "#475569",
      card:  isDark ? "#0b1220" : "#ffffff",
      fg:    isDark ? "#e2e8f0" : "#0f172a",
      brand1:isDark ? "#60a5fa" : "#2563eb",
      brand2:isDark ? "#f9a8d4" : "#f472b6",
    };
  
    return (
      <div className="h-full w-full">
        {/* Controls */}
        <div className="mb-2 flex items-center justify-end gap-2">
          {hasCountry && (
            <div className="select-wrap">
              <select
                className="select"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                aria-label="Select country"
              >
                <option value="GLOBAL">Global</option>
                {countryKeys.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          )}
  
          {(hasMale || hasFemale) && (
            <div className="select-wrap">
              <select
                className="select"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                aria-label="Select cohort"
              >
                <option value="global">All</option>
                <option value="male"   disabled={!hasMale}>Male</option>
                <option value="female" disabled={!hasFemale}>Female</option>
              </select>
            </div>
          )}
        </div>
  
        {/* Chart */}
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            data={series}
            margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
            barCategoryGap={18}
          >
            <defs>
              <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"  stopColor={colors.brand1} />
                <stop offset="100%" stopColor={colors.brand2} />
              </linearGradient>
            </defs>
  
            {/* Solid, subtle grid (no dots) — or remove this line to have no grid at all */}
            <CartesianGrid stroke={colors.grid} />
  
            <XAxis
              dataKey="type"
              stroke={colors.axis}
              tick={{ fill: colors.axis, fontSize: 12 }}
              tickMargin={8}
              tickLine={false}
              axisLine={{ stroke: colors.grid }}
            />
            <YAxis
              stroke={colors.axis}
              tick={{ fill: colors.axis, fontSize: 12 }}
              tickFormatter={(v) => Intl.NumberFormat().format(v)}
              tickMargin={6}
              tickLine={false}
              axisLine={{ stroke: colors.grid }}
            />
  
            {/* No hover cursor/line */}
            <Tooltip
              cursor={false}
              contentStyle={{
                background: colors.card,
                border: `1px solid ${colors.grid}`,
                borderRadius: 10,
              }}
              labelStyle={{ color: colors.fg }}
              itemStyle={{ color: colors.fg }}
              formatter={(v) => Intl.NumberFormat().format(v)}
            />
  
            {/* No white outline on bars */}
            <Bar
              dataKey="deaths"
              fill="url(#barGrad)"
              radius={[8, 8, 0, 0]}
              maxBarSize={48}
              stroke="none"
              animationDuration={350}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }