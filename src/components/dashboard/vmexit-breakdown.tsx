"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { VmexitCounts } from "@/lib/types";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface VmexitBreakdownProps {
  counts: VmexitCounts;
}

const COLORS = [
  "#34d399",
  "#60a5fa",
  "#818cf8",
  "#a78bfa",
  "#c084fc",
  "#f87171",
  "#fbbf24",
  "#fb923c",
  "#94a3b8",
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
    <Card className="border-white/5 bg-zinc-900/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-zinc-400">
          VMEXIT Breakdown
        </CardTitle>
        <p className="text-2xl font-bold font-mono text-white">
          {total.toLocaleString()}
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="h-[140px] w-[140px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={entries}
                  innerRadius={40}
                  outerRadius={65}
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
          </div>
          <div className="space-y-1.5 flex-1 min-w-0">
            {entries.map((entry, i) => (
              <div key={entry.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  />
                  <span className="text-[11px] font-mono text-zinc-400">
                    {entry.name}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-zinc-300">
                  {entry.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
