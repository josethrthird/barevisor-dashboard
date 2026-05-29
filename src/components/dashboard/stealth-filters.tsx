"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { StealthStatus } from "@/lib/types";

interface StealthFiltersProps {
  stealth: StealthStatus;
}

const FILTERS = [
  {
    key: "cpuid_spoof" as const,
    label: "CPUID Spoof",
    description: "Hides hypervisor presence from CPUID leaf 1 & 0x40000000",
  },
  {
    key: "rdtsc_offset" as const,
    label: "RDTSC Offset",
    description: "Compensates TSC delta to hide VMEXIT latency",
  },
  {
    key: "wda_bypass" as const,
    label: "WDA Bypass",
    description: "Blocks SetWindowDisplayAffinity via NPT shadow page",
  },
  {
    key: "efer_protect" as const,
    label: "EFER Protect",
    description: "Forces SVME bit on guest EFER writes via MSRPM",
  },
];

export function StealthFilters({ stealth }: StealthFiltersProps) {
  return (
    <Card className="border-white/5 bg-zinc-900/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-zinc-400">
          Stealth Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {FILTERS.map((filter) => {
          const active = stealth[filter.key];
          return (
            <div
              key={filter.key}
              className={`flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors ${
                active
                  ? "bg-emerald-500/5 border border-emerald-500/10"
                  : "bg-zinc-800/30 border border-zinc-700/20"
              }`}
            >
              <div>
                <p
                  className={`text-xs font-medium ${
                    active ? "text-emerald-300" : "text-zinc-500"
                  }`}
                >
                  {filter.label}
                </p>
                <p className="text-[10px] text-zinc-600 mt-0.5">
                  {filter.description}
                </p>
              </div>
              <div
                className={`h-5 w-9 rounded-full flex items-center px-0.5 transition-colors ${
                  active ? "bg-emerald-500/30 justify-end" : "bg-zinc-700/50 justify-start"
                }`}
              >
                <div
                  className={`h-4 w-4 rounded-full transition-colors ${
                    active ? "bg-emerald-400" : "bg-zinc-500"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
