"use client";

import { useHypervisor } from "@/lib/use-hypervisor";
import { Header } from "@/components/dashboard/header";
import { StatCards } from "@/components/dashboard/stat-cards";
import { SystemInfo } from "@/components/dashboard/system-info";
import { VmexitChart } from "@/components/dashboard/vmexit-chart";
import { VmexitBreakdown } from "@/components/dashboard/vmexit-breakdown";
import { VmcbExplorer } from "@/components/dashboard/vmcb-explorer";
import { StealthFilters } from "@/components/dashboard/stealth-filters";
import { HookManager } from "@/components/dashboard/hook-manager";

export default function Home() {
  const { stats, history, mode } = useHypervisor();

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-3 text-zinc-500">
          <div className="h-4 w-4 rounded-full border-2 border-zinc-600 border-t-zinc-300 animate-spin" />
          <span className="text-sm">Connecting to hypervisor...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header mode={mode} uptime={stats.uptime_seconds} />
      <main className="flex-1 p-6 space-y-4 max-w-[1400px] mx-auto w-full">
        <StatCards
          counts={stats.vmexit_counts}
          uptimeSeconds={stats.uptime_seconds}
        />
        <div className="grid grid-cols-3 gap-4">
          <VmexitChart history={history} />
          <VmexitBreakdown counts={stats.vmexit_counts} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <VmcbExplorer vmcb={stats.vmcb} />
          <StealthFilters stealth={stats.stealth} />
        </div>
        <HookManager hooks={stats.hooks} />
      </main>
      <footer className="border-t border-white/5 px-6 py-3 text-center">
        <span className="text-[10px] text-zinc-600 font-mono">
          BAREVISOR v0.1.0 — AMD SVM/NPT Hypervisor — {stats.cpu_model}
        </span>
      </footer>
    </div>
  );
}
