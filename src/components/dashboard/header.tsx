"use client";

import Link from "next/link";

interface HeaderProps {
  mode: "connecting" | "live" | "demo";
  uptime: number;
}

function formatUptime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function Header({ mode, uptime }: HeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 bg-[#09090b] border-b border-white/[0.06]">
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 transition-colors text-sm shrink-0"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="hidden sm:inline">Home</span>
        </Link>
        <div className="w-px h-4 bg-white/[0.06] hidden sm:block" />
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-7 w-7 rounded-md bg-blue-500 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-white">B</span>
          </div>
          <div className="flex items-center gap-2.5 min-w-0">
            <h1 className="text-sm font-semibold text-[#f9fafb]">Barevisor</h1>
            <span className="text-sm text-zinc-500 hidden sm:inline">AMD SVM / NPT</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 sm:gap-5 shrink-0">
        <span className="text-xs font-mono text-zinc-500 tabular-nums">
          {formatUptime(uptime)}
        </span>
        <div className="flex items-center gap-2">
          {mode === "live" && (
            <>
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-xs text-blue-400">
                Live
              </span>
            </>
          )}
          {mode === "demo" && (
            <>
              <span className="h-2 w-2 rounded-full bg-zinc-600" />
              <span className="text-xs text-zinc-500">
                Demo
              </span>
            </>
          )}
          {mode === "connecting" && (
            <>
              <span className="h-2 w-2 rounded-full bg-zinc-600 animate-pulse" />
              <span className="text-xs text-zinc-500">
                Connecting
              </span>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
