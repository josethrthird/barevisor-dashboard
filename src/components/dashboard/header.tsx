"use client";

import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  mode: "connecting" | "live" | "demo";
  uptime: number;
}

function formatUptime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}h ${m}m ${s}s`;
}

export function Header({ mode, uptime }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-white/5 px-6 py-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
            <span className="text-sm font-bold text-black">B</span>
          </div>
          <h1 className="text-lg font-semibold tracking-tight text-white">
            BAREVISOR
          </h1>
        </div>
        <span className="text-xs font-mono text-zinc-500">
          AMD SVM Hypervisor Control Panel
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs font-mono text-zinc-500">
          {formatUptime(uptime)}
        </span>
        {mode === "live" && (
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/10">
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            Live
          </Badge>
        )}
        {mode === "demo" && (
          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/10">
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 inline-block" />
            Demo
          </Badge>
        )}
        {mode === "connecting" && (
          <Badge className="bg-zinc-500/10 text-zinc-400 border-zinc-500/20 hover:bg-zinc-500/10">
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-zinc-400 animate-pulse inline-block" />
            Connecting...
          </Badge>
        )}
      </div>
    </header>
  );
}
