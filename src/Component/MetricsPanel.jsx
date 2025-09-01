// src/components/MetricsPanel.jsx
import { useMemo } from "react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";
// If you already use a theme hook (like in CancerDeathsBar), import it:

import ChartCard from "./ChartCard";    
import { useTheme } from "../context/ThemeContext";      // ← adjust path if needed

export default function MetricsPanel({ patients }) {
  const { theme } = useTheme?.() ?? { theme: "dark" }; // safe fallback
  const isDark = theme === "dark";

  // ——— Shared theme (same vibe as CancerDeathsBar) ———
  const colors = {
    grid:    isDark ? "#1f2937" : "#e2e8f0",
    axis:    isDark ? "#94a3b8" : "#475569",
    card:    isDark ? "#0b1220" : "#ffffff",
    fg:      isDark ? "#e2e8f0" : "#0f172a",
    brand1:  isDark ? "#60a5fa" : "#2563eb", // blue
    brand2:  isDark ? "#f9a8d4" : "#f472b6", // pink
    male:    isDark ? "#38bdf8" : "#0284c7",
    female:  isDark ? "#f0abfc" : "#d946ef",
    other:   isDark ? "#a3a3a3" : "#737373",
    pie:     ["#60a5fa","#f472b6","#22c55e","#f59e0b","#a78bfa","#14b8a6","#f43f5e","#84cc16","#06b6d4","#eab308"]
  };

  // ——— Prepare data ———
  const {
    cancerCounts, cancerBySex, attributesPie, ageBucketsLine
  } = useMemo(() => {
    const cancerCountsMap = new Map();
    const bySexMap = new Map(); // { cancerType: { M: n, F: n, O: n } }
    const attrCounts = new Map();
    const ageBuckets = new Map();

    const bucketOf = (age) => {
      if (age < 20) return "<20";
      if (age < 30) return "20-29";
      if (age < 40) return "30-39";
      if (age < 50) return "40-49";
      if (age < 60) return "50-59";
      if (age < 70) return "60-69";
      if (age < 80) return "70-79";
      return "80+";
    };

    patients.forEach((p) => {
      (p.cancers || []).forEach((c) => {
        cancerCountsMap.set(c, (cancerCountsMap.get(c) || 0) + 1);
        if (!bySexMap.has(c)) bySexMap.set(c, { M: 0, F: 0, O: 0 });
        const s = (p.sex === "M" || p.sex === "F") ? p.sex : "O";
        bySexMap.get(c)[s] += 1;
      });

      if (p.attributes) {
        Object.entries(p.attributes).forEach(([k, v]) => {
          if (v) attrCounts.set(k, (attrCounts.get(k) || 0) + 1);
        });
      }

      if (typeof p.age === "number") {
        const b = bucketOf(p.age);
        ageBuckets.set(b, (ageBuckets.get(b) || 0) + 1);
      }
    });

    const cancerCounts = [...cancerCountsMap.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    const cancerBySex = [...bySexMap.entries()]
      .map(([name, v]) => ({ name, male: v.M, female: v.F, other: v.O }))
      .sort((a, b) => (b.male + b.female + b.other) - (a.male + a.female + a.other));

    const attributesPie = [...attrCounts.entries()]
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);

    const ageOrder = ["<20","20-29","30-39","40-49","50-59","60-69","70-79","80+"];
    const ageBucketsLine = ageOrder.map((bucket) => ({
      bucket, count: ageBuckets.get(bucket) || 0
    }));

    return { cancerCounts, cancerBySex, attributesPie, ageBucketsLine };
  }, [patients]);

  // ——— Charts ———
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* 1) Detected cancers (total) */}
      <ChartCard
        title="Detected Cancers (Total)"
        subtitle="Count of patients with each cancer type"
        height={400}
        padding="20px 20px 8px 20px"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={cancerCounts}
            margin={{ top: 8, right: 12, left: 0, bottom: 8 }}
            barCategoryGap={18}
          >
            <defs>
              <linearGradient id="gradTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colors.brand1} />
                <stop offset="100%" stopColor={colors.brand2} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke={colors.grid} />
            <XAxis
              dataKey="name"
              stroke={colors.axis}
              tick={{ fill: colors.axis, fontSize: 12 }}
              tickMargin={10}
              tickLine={false}
              axisLine={{ stroke: colors.grid }}
              height={42}
            />
            <YAxis
              stroke={colors.axis}
              tick={{ fill: colors.axis, fontSize: 12 }}
              tickFormatter={(v) => Intl.NumberFormat().format(v)}
              tickMargin={8}
              tickLine={false}
              axisLine={{ stroke: colors.grid }}
              allowDecimals={false}
            />
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
            <Bar
              dataKey="count"
              fill="url(#gradTotal)"
              radius={[8, 8, 0, 0]}
              maxBarSize={48}
              stroke="none"
              animationDuration={350}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* 2) Who & which cancer (stacked by sex) */}
      <ChartCard
        title="Who & Which Cancer"
        subtitle="Patients with each cancer, split by sex"
        height={400}
        padding="20px 20px 8px 20px"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={cancerBySex}
            margin={{ top: 8, right: 12, left: 0, bottom: 8 }}
            barCategoryGap={18}
          >
            <defs>
              <linearGradient id="gradMale" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colors.male} />
                <stop offset="100%" stopColor={colors.brand1} />
              </linearGradient>
              <linearGradient id="gradFemale" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colors.female} />
                <stop offset="100%" stopColor={colors.brand2} />
              </linearGradient>
              <linearGradient id="gradOther" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colors.other} />
                <stop offset="100%" stopColor={isDark ? "#525252" : "#a3a3a3"} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke={colors.grid} />
            <XAxis
              dataKey="name"
              stroke={colors.axis}
              tick={{ fill: colors.axis, fontSize: 12 }}
              tickMargin={10}
              tickLine={false}
              axisLine={{ stroke: colors.grid }}
              height={42}
            />
            <YAxis
              stroke={colors.axis}
              tick={{ fill: colors.axis, fontSize: 12 }}
              tickFormatter={(v) => Intl.NumberFormat().format(v)}
              tickMargin={8}
              tickLine={false}
              axisLine={{ stroke: colors.grid }}
              allowDecimals={false}
            />
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
            <Legend
              wrapperStyle={{ color: colors.fg, fontSize: 12 }}
            />
            <Bar dataKey="male"   stackId="a" name="Male"   fill="url(#gradMale)"   radius={[8, 8, 0, 0]} />
            <Bar dataKey="female" stackId="a" name="Female" fill="url(#gradFemale)" radius={[8, 8, 0, 0]} />
            <Bar dataKey="other"  stackId="a" name="Other"  fill="url(#gradOther)"  radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* 3) Top clinical attributes (Pie) */}
      <ChartCard
        title="Top Clinical Attributes"
        subtitle="Most frequent positive attributes"
        height={400}
        padding="20px 20px 8px 20px"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
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
            <Legend wrapperStyle={{ color: colors.fg, fontSize: 12 }} />
            <Pie
              data={attributesPie}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={130}
              label={(d) => `${d.name} (${d.value})`}
              labelLine={false}
            >
              {attributesPie.map((_, i) => (
                <Cell key={i} fill={colors.pie[i % colors.pie.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* 4) Age distribution (Line) */}
      <ChartCard
        title="Age Distribution"
        subtitle="Patients per age bucket"
        height={400}
        padding="20px 20px 8px 20px"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={ageBucketsLine}
            margin={{ top: 8, right: 12, left: 0, bottom: 8 }}
          >
            <defs>
              <linearGradient id="gradLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={colors.brand1} />
                <stop offset="100%" stopColor={colors.brand2} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={colors.grid} />
            <XAxis
              dataKey="bucket"
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
              tickMargin={8}
              tickLine={false}
              axisLine={{ stroke: colors.grid }}
              allowDecimals={false}
            />
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
            <Line
              type="monotone"
              dataKey="count"
              stroke="url(#gradLine)"
              strokeWidth={3}
              dot={{ r: 3, stroke: colors.card, strokeWidth: 1 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
