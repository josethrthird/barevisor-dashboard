"use client";

import { useEffect, useRef, useState } from "react";
import type { VmexitCounts } from "@/lib/types";

interface StatCardsProps {
  counts: VmexitCounts;
  uptimeSeconds: number;
}

function AnimatedNumber({
  value,
  decimals = 0,
}: {
  value: number;
  decimals?: number;
}) {
  const [display, setDisplay] = useState(0);
  const prevRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const from = prevRef.current;
    const to = value;
    const start = performance.now();
    const duration = 500;

    function tick(now: number) {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(from + (to - from) * eased);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    prevRef.current = to;
    return () => cancelAnimationFrame(rafRef.current);
  }, [value]);

  return decimals > 0
    ? display.toFixed(decimals)
    : Math.round(display).toLocaleString();
}

const CARDS = [
  {
    key: "total",
    label: "Total VMEXITs",
    border: "border-t-zinc-400/40",
    text: "text-[#f9fafb]",
  },
  {
    key: "rate",
    label: "Exits / sec",
    border: "border-t-blue-500/60",
    text: "text-blue-400",
  },
  {
    key: "cpuid",
    label: "CPUID",
    border: "border-t-indigo-500/60",
    text: "text-indigo-400",
  },
  {
    key: "rdtsc",
    label: "RDTSC",
    border: "border-t-blue-400/60",
    text: "text-blue-300",
  },
  {
    key: "msr",
    label: "MSR R/W",
    border: "border-t-violet-500/60",
    text: "text-violet-400",
  },
  {
    key: "npf",
    label: "NPF",
    border: "border-t-cyan-500/60",
    text: "text-cyan-400",
  },
] as const;

export function StatCards({ counts, uptimeSeconds }: StatCardsProps) {
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const rate = uptimeSeconds > 0 ? total / uptimeSeconds : 0;

  const values: Record<string, number> = {
    total,
    rate,
    cpuid: counts.cpuid,
    rdtsc: counts.rdtsc,
    msr: counts.rdmsr + counts.wrmsr,
    npf: counts.npf,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {CARDS.map((card) => (
        <div
          key={card.key}
          className={`glass-card glass-card-hover border-t-2 ${card.border} px-4 pt-4 pb-4`}
        >
          <p className="text-xs text-zinc-500 mb-2">{card.label}</p>
          <p
            className={`text-2xl font-bold font-mono tabular-nums ${card.text}`}
          >
            <AnimatedNumber
              value={values[card.key]}
              decimals={card.key === "rate" ? 1 : 0}
            />
          </p>
        </div>
      ))}
    </div>
  );
}
