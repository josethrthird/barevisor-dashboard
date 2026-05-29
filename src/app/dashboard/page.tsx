"use client";

import { useHypervisor } from "@/lib/use-hypervisor";
import { Header } from "@/components/dashboard/header";
import { SystemInfo } from "@/components/dashboard/system-info";
import { StatCards } from "@/components/dashboard/stat-cards";
import { VmexitChart } from "@/components/dashboard/vmexit-chart";
import { VmexitBreakdown } from "@/components/dashboard/vmexit-breakdown";
import { VmcbExplorer } from "@/components/dashboard/vmcb-explorer";
import { StealthFilters } from "@/components/dashboard/stealth-filters";
import { HookManager } from "@/components/dashboard/hook-manager";
import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function DashboardPage() {
  const { stats, history, mode } = useHypervisor();

  if (!stats) {
    return (
      <div className="dark min-h-screen bg-[#09090b] text-[#f9fafb] flex items-center justify-center">
        <div className="flex items-center gap-3 text-[#52525b]">
          <div className="h-4 w-4 rounded-full border-2 border-[#3f3f46] border-t-[#71717a] animate-spin" />
          <span className="text-sm font-mono">Connecting to hypervisor...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="dark min-h-screen bg-[#09090b] text-[#f9fafb] flex flex-col">
      <Header mode={mode} uptime={stats.uptime_seconds} />
      <SystemInfo stats={stats} />
      <motion.main
        className="flex-1 px-6 py-6 space-y-6 max-w-[1440px] mx-auto w-full"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUp}>
          <StatCards
            counts={stats.vmexit_counts}
            uptimeSeconds={stats.uptime_seconds}
          />
        </motion.div>
        <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <VmexitChart history={history} />
          <VmexitBreakdown counts={stats.vmexit_counts} />
        </motion.div>
        <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <VmcbExplorer vmcb={stats.vmcb} />
          <StealthFilters stealth={stats.stealth} />
        </motion.div>
        <motion.div variants={fadeUp}>
          <HookManager hooks={stats.hooks} />
        </motion.div>
      </motion.main>
      <footer className="border-t border-white/[0.04] px-6 py-4 text-center">
        <span className="text-xs text-zinc-500 font-mono">
          Barevisor v0.1.0 — AMD SVM/NPT — {stats.cpu_model}
        </span>
      </footer>
    </div>
  );
}
