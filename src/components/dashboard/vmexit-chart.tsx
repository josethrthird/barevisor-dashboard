"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const COLORS = {
  cpuid: "#34d399",
  rdtsc: "#60a5fa",
  msr: "#a78bfa",
  npf: "#f87171",
  other: "#fbbf24",
};

export function VmexitChart({ history }: VmexitChartProps) {
  const data = history.map((s, i) => ({
    idx: i,
    ...s,
  }));

  return (
    <Card className="border-white/5 bg-zinc-900/50 col-span-2">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-zinc-400">
            VMEXIT Rate
          </CardTitle>
          <div className="flex items-center gap-3">
            {Object.entries(COLORS).map(([key, color]) => (
              <div key={key} className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-[10px] font-mono uppercase text-zinc-500">
                  {key}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                {Object.entries(COLORS).map(([key, color]) => (
                  <linearGradient
                    key={key}
                    id={`grad-${key}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.03)"
              />
              <XAxis
                dataKey="idx"
                tick={false}
                axisLine={{ stroke: "rgba(255,255,255,0.05)" }}
              />
              <YAxis
                tick={{ fill: "#71717a", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                width={30}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  fontSize: 11,
                }}
                labelStyle={{ display: "none" }}
              />
              {Object.entries(COLORS).map(([key, color]) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={color}
                  fill={`url(#grad-${key})`}
                  strokeWidth={1.5}
                  dot={false}
                  isAnimationActive={false}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
