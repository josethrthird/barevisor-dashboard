"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { HypervisorStats } from "@/lib/types";

interface SystemInfoProps {
  stats: HypervisorStats;
}

function StatusDot({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-block h-2 w-2 rounded-full ${
        active ? "bg-emerald-400" : "bg-zinc-600"
      }`}
    />
  );
}

export function SystemInfo({ stats }: SystemInfoProps) {
  const items = [
    { label: "CPU", value: stats.cpu_model },
    { label: "Cores", value: `${stats.logical_cores} logical` },
    {
      label: "SVM",
      value: stats.svm_active ? "Active" : "Inactive",
      active: stats.svm_active,
    },
    {
      label: "NPT",
      value: stats.npt_enabled ? "Enabled" : "Disabled",
      active: stats.npt_enabled,
    },
    { label: "ASID", value: stats.vmcb.guest_asid.toString() },
    {
      label: "nCR3",
      value: stats.vmcb.ncr3,
      mono: true,
    },
  ];

  return (
    <Card className="border-white/5 bg-zinc-900/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-zinc-400">
          System
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <span className="text-xs text-zinc-500">{item.label}</span>
            <div className="flex items-center gap-2">
              {"active" in item && <StatusDot active={item.active!} />}
              <span
                className={`text-xs text-zinc-200 ${
                  item.mono ? "font-mono" : ""
                }`}
              >
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
