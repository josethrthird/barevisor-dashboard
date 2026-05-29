"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { VmexitCounts } from "@/lib/types";

interface StatCardsProps {
  counts: VmexitCounts;
  uptimeSeconds: number;
}

export function StatCards({ counts, uptimeSeconds }: StatCardsProps) {
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const rate = uptimeSeconds > 0 ? (total / uptimeSeconds).toFixed(1) : "0";

  const cards = [
    {
      label: "Total VMEXITs",
      value: total.toLocaleString(),
      color: "text-white",
    },
    {
      label: "Exits/sec",
      value: rate,
      color: "text-emerald-400",
    },
    {
      label: "CPUID Exits",
      value: counts.cpuid.toLocaleString(),
      color: "text-emerald-400",
    },
    {
      label: "RDTSC Exits",
      value: counts.rdtsc.toLocaleString(),
      color: "text-blue-400",
    },
    {
      label: "MSR Exits",
      value: (counts.rdmsr + counts.wrmsr).toLocaleString(),
      color: "text-violet-400",
    },
    {
      label: "NPF Exits",
      value: counts.npf.toLocaleString(),
      color: "text-red-400",
    },
  ];

  return (
    <div className="grid grid-cols-6 gap-3">
      {cards.map((card) => (
        <Card key={card.label} className="border-white/5 bg-zinc-900/50">
          <CardContent className="pt-4 pb-3 px-4">
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
              {card.label}
            </p>
            <p className={`text-xl font-bold font-mono mt-1 ${card.color}`}>
              {card.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
