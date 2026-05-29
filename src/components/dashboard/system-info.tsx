"use client";

import type { HypervisorStats } from "@/lib/types";

interface SystemInfoProps {
  stats: HypervisorStats;
}

export function SystemInfo({ stats }: SystemInfoProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-1 px-6 py-2 border-b border-white/[0.06] bg-white/[0.02] overflow-hidden">
      <InfoItem label="CPU" value={stats.cpu_model} />
      <InfoItem label="Cores" value={`${stats.logical_cores}`} mono />
      <StatusItem label="SVM" active={stats.svm_active} />
      <StatusItem label="NPT" active={stats.npt_enabled} />
      <InfoItem label="ASID" value={stats.vmcb.guest_asid.toString()} mono />
      <InfoItem label="nCR3" value={stats.vmcb.ncr3} mono truncate />
    </div>
  );
}

function InfoItem({
  label,
  value,
  mono,
  truncate: shouldTruncate,
}: {
  label: string;
  value: string;
  mono?: boolean;
  truncate?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      <span className="text-xs text-zinc-500">{label}</span>
      <span
        className={`text-xs text-zinc-300 ${mono ? "font-mono" : ""} ${shouldTruncate ? "max-w-[180px] truncate" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

function StatusItem({ label, active }: { label: string; active: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-zinc-500">{label}</span>
      <span
        className={`inline-block h-1.5 w-1.5 rounded-full ${
          active ? "bg-blue-500" : "bg-zinc-600"
        }`}
      />
      <span
        className={`text-xs font-mono ${
          active ? "text-blue-400" : "text-zinc-600"
        }`}
      >
        {active ? "ON" : "OFF"}
      </span>
    </div>
  );
}
