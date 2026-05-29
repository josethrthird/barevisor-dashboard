"use client";

import type { VmexitTimeSample } from "@/lib/types";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface VmexitChartProps {
  history: VmexitTimeSample[];
}

const SERIES = [
  { key: "cpuid", color: "#6366f1", label: "CPUID" },
  { key: "rdtsc", color: "#3b82f6", label: "RDTSC" },
  { key: "msr", color: "#8b5cf6", label: "MSR" },
  { key: "npf", color: "#06b6d4", label: "NPF" },
  { key: "other", color: "#71717a", label: "Other" },
];

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ dataKey: string; value: number; color: string }>;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card px-3 py-2.5 text-xs space-y-1">
      {payload.map((p) => (
        <div
          key={p.dataKey}
          className="flex items-center gap-2 justify-between"
        >
          <div className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full shrink-0"
              style={{ backgroundColor: p.color }}
            />
            <span className="text-zinc-500">{p.dataKey}</span>
          </div>
          <span className="text-zinc-300 font-mono tabular-nums ml-4">
            {p.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export function VmexitChart({ history }: VmexitChartProps) {
  const data = history.map((s, i) => ({ idx: i, ...s }));

  return (
    <div className="glass-card lg:col-span-2 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm text-zinc-400 font-medium">
          VMEXIT Rate
        </h3>
        <div className="flex items-center gap-4">
          {SERIES.map((s) => (
            <div key={s.key} className="flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              <span className="text-xs text-zinc-500">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              {SERIES.map((s) => (
                <linearGradient
                  key={s.key}
                  id={`grad-${s.key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={s.color} stopOpacity={0.2} />
                  <stop offset="100%" stopColor={s.color} stopOpacity={0.01} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.03)"
              vertical={false}
            />
            <XAxis
              dataKey="idx"
              tick={false}
              axisLine={{ stroke: "rgba(255,255,255,0.04)" }}
              tickLine={false}
            />
            <YAxis
              tick={{
                fill: "#3f3f46",
                fontSize: 10,
                fontFamily: "var(--font-geist-mono)",
              }}
              axisLine={false}
              tickLine={false}
              width={32}
            />
            <Tooltip
              content={<ChartTooltip />}
              cursor={{ stroke: "rgba(255,255,255,0.06)" }}
            />
            {SERIES.map((s) => (
              <Area
                key={s.key}
                type="monotone"
                dataKey={s.key}
                stroke={s.color}
                fill={`url(#grad-${s.key})`}
                strokeWidth={1.5}
                dot={false}
                isAnimationActive={false}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
