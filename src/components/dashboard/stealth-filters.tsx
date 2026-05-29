"use client";

import type { StealthStatus } from "@/lib/types";

interface StealthFiltersProps {
  stealth: StealthStatus;
}

const FILTERS = [
  {
    key: "cpuid_spoof" as const,
    label: "CPUID Spoof",
    description: "Hides HV presence from leaf 1 & 0x40000000",
  },
  {
    key: "rdtsc_offset" as const,
    label: "RDTSC Offset",
    description: "Compensates TSC delta from VMEXIT",
  },
  {
    key: "wda_bypass" as const,
    label: "WDA Bypass",
    description: "Blocks SetWindowDisplayAffinity via NPT",
  },
  {
    key: "efer_protect" as const,
    label: "EFER Protect",
    description: "Forces SVME on guest EFER writes",
  },
];

export function StealthFilters({ stealth }: StealthFiltersProps) {
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm text-zinc-400 font-medium mb-4">
        Stealth Filters
      </h3>
      <div className="space-y-2.5">
        {FILTERS.map((filter) => {
          const active = stealth[filter.key];
          return (
            <div
              key={filter.key}
              className={`flex items-center justify-between rounded-md px-3.5 py-2.5 transition-all duration-150 ${
                active
                  ? "bg-blue-500/[0.04] border border-blue-500/[0.12]"
                  : "bg-white/[0.01] border border-white/[0.04]"
              }`}
            >
              <div className="min-w-0">
                <p
                  className={`text-sm font-medium ${
                    active ? "text-blue-300" : "text-zinc-500"
                  }`}
                >
                  {filter.label}
                </p>
                <p className="text-xs text-zinc-600 mt-0.5">
                  {filter.description}
                </p>
              </div>
              <div
                className={`h-5 w-9 rounded-full flex items-center px-0.5 transition-all duration-150 shrink-0 ml-4 ${
                  active
                    ? "bg-blue-500/25 justify-end"
                    : "bg-white/[0.06] justify-start"
                }`}
              >
                <div
                  className={`h-3.5 w-3.5 rounded-full transition-all duration-150 ${
                    active ? "bg-blue-500" : "bg-zinc-600"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
