"use client";

import Link from "next/link";
import { motion } from "framer-motion";
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-violet-50/50 to-amber-50/30" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(37,99,235,0.08), transparent)",
        }}
      />

      <div className="relative pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-xs font-medium text-blue-700 tracking-wide">
              AMD SVM/NPT Hypervisor
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-950 leading-[1.08]"
          >
            Bare-Metal Hypervisor{" "}
            <span className="gradient-text">Introspection</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="mt-6 text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto"
          >
            Real-time monitoring and stealth control for an AMD SVM hypervisor
            with nested page table hooks, CPUID spoofing, and undetectable
            overlay injection.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/25 transition-all hover:shadow-xl hover:shadow-blue-600/30"
            >
              Launch Dashboard
              <span>→</span>
            </Link>
            <a
              href="https://github.com/josethrthird/barevisor-dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
            >
              <GitHubIcon className="w-4 h-4" />
              View Source
            </a>
          </motion.div>
        </div>

        {/* Browser mockup */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="rounded-xl shadow-2xl shadow-gray-900/10 overflow-hidden border border-gray-200/80">
            {/* Title bar */}
            <div className="bg-gray-100 px-4 py-3 flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-white rounded-md px-4 py-1 text-xs text-gray-400 font-mono border border-gray-200 min-w-[260px] text-center">
                  localhost:3000/dashboard
                </div>
              </div>
              <div className="w-[52px]" />
            </div>

            {/* Dashboard preview */}
            <div className="bg-[#0a0e17] p-6">
              {/* Header mock */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-blue-500/20" />
                  <div className="h-3 w-24 rounded bg-gray-700" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <div className="h-2.5 w-16 rounded bg-gray-700" />
                </div>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                {[
                  { label: "VMEXITS", value: "47,291", color: "bg-blue-500", w: "82%" },
                  { label: "CPUID", value: "12,847", color: "bg-violet-500", w: "71%" },
                  { label: "NPT FAULTS", value: "8,402", color: "bg-cyan-500", w: "65%" },
                  { label: "LATENCY", value: "0.84μs", color: "bg-emerald-500", w: "89%" },
                ].map((card) => (
                  <div
                    key={card.label}
                    className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-3"
                  >
                    <div className="text-[10px] text-gray-500 font-mono tracking-wider mb-1">
                      {card.label}
                    </div>
                    <div className="text-lg font-bold text-gray-100 font-mono">
                      {card.value}
                    </div>
                    <div className={`mt-2 h-1 rounded-full ${card.color}/20`}>
                      <div
                        className={`h-full rounded-full ${card.color}`}
                        style={{ width: card.w }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart mock */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-3 w-32 rounded bg-gray-700" />
                  <div className="flex gap-2">
                    <div className="h-5 w-12 rounded bg-white/[0.06]" />
                    <div className="h-5 w-12 rounded bg-white/[0.06]" />
                  </div>
                </div>
                <div className="flex items-end gap-1 h-24">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-blue-500/40"
                      style={{
                        height: `${30 + Math.sin(i * 0.5) * 25 + Math.cos(i * 0.8) * 20}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
