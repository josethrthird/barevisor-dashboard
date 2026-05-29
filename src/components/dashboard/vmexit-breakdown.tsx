"use client";

import type { VmexitCounts } from "@/lib/types";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface VmexitBreakdownProps {
  counts: VmexitCounts;
}

const COLORS = [
  "#6366f1",
  "#3b82f6",
  "#818cf8",
  "#8b5cf6",
  "#a78bfa",
  "#06b6d4",
  "#22d3ee",
  "#71717a",
  "#52525b",
];

export function VmexitBreakdown({ counts }: VmexitBreakdownProps) {
  const entries = [
    { name: "CPUID", value: counts.cpuid },
    { name: "RDTSC", value: counts.rdtsc },
    { name: "RDTSCP", value: counts.rdtscp },
    { name: "RDMSR", value: counts.rdmsr },
    { name: "WRMSR", value: counts.wrmsr },
    { name: "NPF", value: counts.npf },
    { name: "VMMCALL", value: counts.vmmcall },
    { name: "SHUTDOWN", value: counts.shutdown },
    { name: "Unknown", value: counts.unknown },
  ].filter((e) => e.value > 0);

  const total = entries.reduce((s, e) => s + e.value, 0);

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm text-zinc-400 font-medium mb-2">
        Breakdown
      </h3>
      <div className="flex items-center gap-5 mt-3">
        <div className="relative h-[150px] w-[150px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={entries}
                innerRadius={44}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
                strokeWidth={0}
                isAnimationActive={false}
              >
                {entries.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-lg font-bold font-mono text-[#f9fafb] tabular-nums">
              {total.toLocaleString()}
            </span>
            <span className="text-xs text-zinc-500">
              Total
            </span>
          </div>
        </div>
        <div className="space-y-1.5 flex-1 min-w-0">
          {entries.map((entry, i) => {
            const pct =
              total > 0 ? ((entry.value / total) * 100).toFixed(1) : "0";
            return (
              <div
                key={entry.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-1.5 w-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  />
                  <span className="text-xs text-zinc-400">{entry.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-zinc-300 tabular-nums">
                    {entry.value.toLocaleString()}
                  </span>
                  <span className="text-xs font-mono text-zinc-600 w-12 text-right tabular-nums">
                    {pct}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
