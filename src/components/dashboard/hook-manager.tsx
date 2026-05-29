"use client";

import type { NptHook } from "@/lib/types";

interface HookManagerProps {
  hooks: NptHook[];
}

export function HookManager({ hooks }: HookManagerProps) {
  const activeCount = hooks.filter((h) => h.active).length;

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm text-zinc-400 font-medium">
          NPT Hook Manager
        </h3>
        <span className="text-xs text-zinc-500">
          <span className="text-blue-400 font-mono">{activeCount}</span>
          <span className="mx-1">/</span>
          <span className="font-mono">{hooks.length}</span> active
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-zinc-500 border-b border-white/[0.04]">
              <th className="pb-2.5 text-left font-medium text-xs">
                ID
              </th>
              <th className="pb-2.5 text-left font-medium text-xs">
                Guest RIP
              </th>
              <th className="pb-2.5 text-left font-medium text-xs">
                Shadow PA
              </th>
              <th className="pb-2.5 text-right font-medium text-xs">
                Hits
              </th>
              <th className="pb-2.5 text-right font-medium text-xs">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {hooks.map((hook) => (
              <tr
                key={hook.id}
                className="border-b border-white/[0.02] hover:bg-blue-500/[0.02] transition-colors"
              >
                <td className="py-3 font-mono text-zinc-500">{hook.id}</td>
                <td className="py-3 font-mono text-zinc-300">
                  {hook.guest_rip}
                </td>
                <td className="py-3 font-mono text-zinc-300">
                  {hook.shadow_pa}
                </td>
                <td className="py-3 font-mono text-zinc-300 text-right tabular-nums">
                  {hook.hit_count.toLocaleString()}
                </td>
                <td className="py-3 text-right">
                  {hook.active ? (
                    <span className="inline-flex items-center gap-1.5 text-xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      <span className="text-blue-400">Active</span>
                    </span>
                  ) : (
                    <span className="text-xs text-zinc-600">Inactive</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
