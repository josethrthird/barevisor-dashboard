"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono text-zinc-500">{label}</span>
        <span className="text-xs font-mono text-zinc-600">
          0x{value.toString(16).padStart(8, "0")}
        </span>
      </div>
      <div className="flex flex-wrap gap-[2px]">
        {Array.from({ length: 32 }, (_, i) => 31 - i).map((bit) => {
          const set = (value & (1 << bit)) !== 0;
          const name = bits[bit];
          return (
            <div
              key={bit}
              className={`relative h-5 w-5 rounded-sm flex items-center justify-center text-[8px] font-mono cursor-default transition-colors ${
                set
                  ? "bg-emerald-500/30 text-emerald-300 border border-emerald-500/40"
                  : "bg-zinc-800/50 text-zinc-600 border border-zinc-700/30"
              } ${hovered === bit ? "ring-1 ring-white/30" : ""}`}
              onMouseEnter={() => setHovered(bit)}
              onMouseLeave={() => setHovered(null)}
            >
              {set ? "1" : "0"}
              {hovered === bit && name && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-[10px] text-zinc-200 whitespace-nowrap z-50">
                  bit {bit}: {name}
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
    <Card className="border-white/5 bg-zinc-900/50 col-span-2">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-zinc-400">
          VMCB Explorer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
        <div className="grid grid-cols-3 gap-4 pt-2">
          <div>
            <span className="text-[10px] text-zinc-500 block">np_enable</span>
            <span
              className={`text-xs font-mono ${
                vmcb.np_enable ? "text-emerald-400" : "text-zinc-500"
              }`}
            >
              {vmcb.np_enable}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 block">guest_asid</span>
            <span className="text-xs font-mono text-zinc-200">
              {vmcb.guest_asid}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 block">tlb_control</span>
            <span className="text-xs font-mono text-zinc-200">
              {vmcb.tlb_control}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
