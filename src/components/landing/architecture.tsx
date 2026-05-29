"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Zap, Play, Monitor } from "lucide-react";

const nodes = [
  {
    icon: Cpu,
    label: "Boot Shim",
    sub: "UEFI DXE driver",
  },
  {
    icon: Zap,
    label: "HV Driver",
    sub: "SVM initialization",
  },
  {
    icon: Play,
    label: "VMRUN",
    sub: "Enter guest mode",
  },
  {
    icon: Monitor,
    label: "Guest OS",
    sub: "Windows kernel",
  },
];

const nodeVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: i * 0.12,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

const arrowVariant = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: (i: number) => ({
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 0.3,
      delay: i * 0.12 + 0.1,
      ease: "easeOut" as const,
    },
  }),
};

export function Architecture() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section id="architecture" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-950 tracking-tight">
            Architecture
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
            From UEFI boot shim to guest OS — the complete virtualization
            pipeline
          </p>
        </div>

        <div ref={ref}>
          {/* Main forward flow */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-0">
            {nodes.map((node, i) => (
              <div key={node.label} className="flex items-center">
                {/* Node */}
                <motion.div
                  variants={nodeVariant}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  custom={i}
                  className="bg-white border border-gray-200 rounded-xl px-6 py-4 text-center min-w-[140px] hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mx-auto mb-2">
                    <node.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {node.label}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{node.sub}</div>
                </motion.div>

                {/* Arrow (not after last) */}
                {i < nodes.length - 1 && (
                  <motion.div
                    variants={arrowVariant}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    custom={i}
                    className="hidden md:flex items-center mx-2 origin-left"
                  >
                    <div className="w-8 h-px bg-gray-300" />
                    <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-gray-300" />
                  </motion.div>
                )}

                {/* Vertical arrow for mobile (not after last) */}
                {i < nodes.length - 1 && (
                  <motion.div
                    variants={arrowVariant}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    custom={i}
                    className="flex md:hidden items-center justify-center my-2 origin-top"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-px h-6 bg-gray-300" />
                      <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-gray-300" />
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Return path */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="hidden md:block mt-6"
          >
            <div className="max-w-[520px] mx-auto relative">
              {/* Curved return path */}
              <svg
                viewBox="0 0 520 48"
                fill="none"
                className="w-full"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d="M 480 4 C 480 32, 480 40, 440 40 L 80 40 C 40 40, 40 32, 40 4"
                  stroke="#d1d5db"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  fill="none"
                />
                <polygon points="36,8 40,0 44,8" fill="#d1d5db" />
              </svg>

              {/* Labels on the return path */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-4 bg-white px-4 py-1.5 rounded-full border border-gray-200 text-xs">
                  <span className="text-amber-600 font-semibold">VMEXIT</span>
                  <span className="text-gray-300">→</span>
                  <span className="text-blue-600 font-semibold">Handler</span>
                  <span className="text-gray-300">→</span>
                  <span className="text-emerald-600 font-semibold">VMRUN</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile return path */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex md:hidden items-center justify-center mt-6"
          >
            <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-dashed border-gray-300 text-xs">
              <span className="text-amber-600 font-semibold">VMEXIT</span>
              <span className="text-gray-300">→</span>
              <span className="text-blue-600 font-semibold">Handler</span>
              <span className="text-gray-300">→</span>
              <span className="text-emerald-600 font-semibold">VMRUN</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
