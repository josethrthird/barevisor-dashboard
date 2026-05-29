"use client";

import { useState } from "react";
import type { VmcbConfig } from "@/lib/types";

interface VmcbExplorerProps {
  vmcb: VmcbConfig;
}

const MISC1_BITS: Record<number, string> = {
  0: "INTR",
  1: "NMI",
  2: "SMI",
  3: "INIT",
  4: "VINTR",
  5: "CR0_SEL_WR",
  6: "IDTR_RD",
  7: "GDTR_RD",
  8: "LDTR_RD",
  9: "TR_RD",
  10: "IDTR_WR",
  11: "GDTR_WR",
  12: "LDTR_WR",
  13: "TR_WR",
  14: "RDTSC",
  15: "RDPMC",
  16: "PUSHF",
  17: "POPF",
  18: "CPUID",
  19: "RSM",
  20: "IRET",
  21: "INTn",
  22: "INVD",
  23: "PAUSE",
  24: "HLT",
  25: "INVLPG",
  26: "INVLPGA",
  27: "IOIO_PROT",
  28: "MSR_PROT",
  29: "TASK_SWITCH",
  30: "FERR_FRZ",
  31: "SHUTDOWN",
};

const MISC2_BITS: Record<number, string> = {
  0: "VMRUN",
  1: "VMMCALL",
  2: "VMLOAD",
  3: "VMSAVE",
  4: "STGI",
  5: "CLGI",
  6: "SKINIT",
  7: "RDTSCP",
  8: "ICEBP",
  9: "WBINVD",
  10: "MONITOR",
  11: "MWAIT_UNCOND",
  12: "MWAIT_ARMED",
  13: "XSETBV",
  14: "RDPRU",
  15: "EFER_WR_TRAP",
  16: "CR0_WR_TRAP",
  17: "CR1_WR_TRAP",
  18: "CR2_WR_TRAP",
  19: "CR3_WR_TRAP",
  20: "CR4_WR_TRAP",
};

function BitField({
  value,
  bits,
  label,
}: {
  value: number;
  bits: Record<number, string>;
  label: string;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const activeBitCount = Array.from(
    { length: 32 },
    (_, i) => (value & (1 << i)) !== 0
  ).filter(Boolean).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 font-mono">{label}</span>
          <span className="text-xs text-zinc-600">{activeBitCount} set</span>
        </div>
        <span className="text-xs font-mono text-blue-500/50 tabular-nums">
          0x{value.toString(16).padStart(8, "0")}
        </span>
      </div>
      <div className="flex flex-wrap gap-1">
        {Array.from({ length: 32 }, (_, i) => 31 - i).map((bit) => {
          const set = (value & (1 << bit)) !== 0;
          const name = bits[bit];
          const isHovered = hovered === bit;

          return (
            <div
              key={bit}
              className={`relative flex items-center justify-center rounded-md font-mono cursor-default transition-all duration-150 select-none w-7 h-7 text-[10px]
                ${
                  set
                    ? isHovered
                      ? "bg-blue-500/25 border border-blue-500/50 scale-105"
                      : "bg-blue-500/15 border border-blue-500/30"
                    : isHovered
                      ? "bg-white/[0.04] border border-white/[0.08]"
                      : "bg-white/[0.02] border border-white/[0.04]"
                }
              `}
              onMouseEnter={() => setHovered(bit)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className={set ? "text-blue-300" : "text-zinc-600"}>
                {set ? "1" : "0"}
              </span>
              {isHovered && name && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50">
                  <div className="glass-card px-2.5 py-1.5 border-blue-500/20 whitespace-nowrap">
                    <span className="text-[10px] text-zinc-500">bit {bit}</span>
                    <span className="text-[10px] font-mono text-blue-300 ml-2">
                      {name}
                    </span>
                  </div>
                  <div className="w-1.5 h-1.5 bg-[#111113] border-b border-r border-white/[0.06] rotate-45 mx-auto -mt-[3px]" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function VmcbExplorer({ vmcb }: VmcbExplorerProps) {
  return (
    <div className="glass-card lg:col-span-2 p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm text-zinc-400 font-medium">
          VMCB Explorer
        </h3>
        <span className="text-xs text-zinc-600">
          Intercept Bit Fields
        </span>
      </div>
      <div className="space-y-5">
        <BitField
          value={vmcb.intercept_misc1}
          bits={MISC1_BITS}
          label="intercept_misc1"
        />
        <BitField
          value={vmcb.intercept_misc2}
          bits={MISC2_BITS}
          label="intercept_misc2"
        />
      </div>
      <div className="grid grid-cols-3 gap-6 mt-5 pt-4 border-t border-white/[0.04]">
        <div>
          <span className="text-xs text-zinc-500 block">np_enable</span>
          <span
            className={`text-sm font-mono font-bold mt-1 block ${
              vmcb.np_enable ? "text-blue-400" : "text-zinc-600"
            }`}
          >
            {vmcb.np_enable}
          </span>
        </div>
        <div>
          <span className="text-xs text-zinc-500 block">guest_asid</span>
          <span className="text-sm font-mono font-bold text-zinc-300 mt-1 block">
            {vmcb.guest_asid}
          </span>
        </div>
        <div>
          <span className="text-xs text-zinc-500 block">tlb_control</span>
          <span className="text-sm font-mono font-bold text-zinc-300 mt-1 block">
            {vmcb.tlb_control}
          </span>
        </div>
      </div>
    </div>
  );
}
