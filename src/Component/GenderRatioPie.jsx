import React, { useMemo, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

/**
 * Works with EITHER:
 *  A) Legacy props:
 *     <GenderRatioPie male={55} female={40} others={5} />
 *
 *  B) Datasets + optional country:
 *     <GenderRatioPie
 *       datasets={{
 *         global:   { male: 55, female: 40, others: 5 },
 *         byCountry:{ USA:{ male:56,female:41,others:3 }, GBR:{...}, ... }
 *       }}
 *       defaultCountry="GLOBAL"
 *     />
 */


export default function GenderRatioPie({
  male,
  female,
  others = 0,
  datasets,
  defaultCountry = "GLOBAL",
  showCountry = true,
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const base = useMemo(() => {
    if (datasets && datasets.global) return datasets;
    return { global: { male: male || 0, female: female || 0, others: others || 0 } };
  }, [datasets, male, female, others]);

  const countryMap = base.byCountry || {};
  const countryKeys = Object.keys(countryMap);
  const hasCountry = showCountry && countryKeys.length > 0;

  const [country, setCountry] = useState(defaultCountry);

  const ratio = useMemo(() => {
    if (hasCountry && country !== "GLOBAL" && countryMap[country]) return countryMap[country];
    return base.global || { male: 0, female: 0, others: 0 };
  }, [country, base, hasCountry, countryMap]);

  const total = Math.max(1, (ratio.male || 0) + (ratio.female || 0) + (ratio.others || 0));
  const malePct   = Math.round(((ratio.male   || 0) / total) * 100);
  const femalePct = Math.round(((ratio.female || 0) / total) * 100);
  const othersPct = Math.max(0, 100 - malePct - femalePct);

  const data = [
    { name: "Male", value: malePct },
    { name: "Female", value: femalePct },
    { name: "Others", value: othersPct },
  ];

  const colors = {
    male:   isDark ? "#60a5fa" : "#2563eb",
    female: isDark ? "#f9a8d4" : "#f472b6",
    others: isDark ? "#34d399" : "#10b981",
    grid:   isDark ? "#1f2937" : "#e2e8f0",
    card:   isDark ? "#0b1220" : "#ffffff",
    fg:     isDark ? "#e2e8f0" : "#0f172a",
  };

  return (
    <div className="h-full w-full">
      {/* Dropdown (optional) */}
      {hasCountry && (
        <div className="mb-2 flex justify-end">
          <select
            className="select"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="GLOBAL">Global</option>
            {countryKeys.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      )}

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="58%"
            outerRadius="72%"
            paddingAngle={2}
            stroke="none"
            isAnimationActive
          >
            <Cell fill={colors.male} />
            <Cell fill={colors.female} />
            <Cell fill={colors.others} />
          </Pie>

          {/* Center text: percentages only */}
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
            {/* <tspan
              x="50%"
              dy="0"
              style={{ fill: colors.fg, fontSize: 18, fontWeight: 700 }}
            >
              {malePct}% • {femalePct}% • {othersPct}%
            </tspan> */}
          </text>

          <Tooltip
            cursor={false}
            contentStyle={{
              background: colors.card,
              border: `1px solid ${colors.grid}`,
              borderRadius: 10,
            }}
            labelStyle={{ color: colors.fg }}
            itemStyle={{ color: colors.fg }}
            formatter={(v, name) => [`${v}%`, name]}
          />
          <Legend verticalAlign="bottom" iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
