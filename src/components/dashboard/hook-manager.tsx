"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { NptHook } from "@/lib/types";

interface HookManagerProps {
  hooks: NptHook[];
}

export function HookManager({ hooks }: HookManagerProps) {
  return (
    <Card className="border-white/5 bg-zinc-900/50 col-span-3">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-zinc-400">
            NPT Hook Manager
          </CardTitle>
          <span className="text-xs font-mono text-zinc-600">
            {hooks.filter((h) => h.active).length}/{hooks.length} active
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-zinc-500 border-b border-white/5">
                <th className="pb-2 text-left font-medium">ID</th>
                <th className="pb-2 text-left font-medium">Guest RIP</th>
                <th className="pb-2 text-left font-medium">Shadow PA</th>
                <th className="pb-2 text-right font-medium">Hits</th>
                <th className="pb-2 text-right font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {hooks.map((hook) => (
                <tr
                  key={hook.id}
                  className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-2.5 font-mono text-zinc-400">
                    #{hook.id}
                  </td>
                  <td className="py-2.5 font-mono text-zinc-200">
                    {hook.guest_rip}
                  </td>
                  <td className="py-2.5 font-mono text-zinc-200">
                    {hook.shadow_pa}
                  </td>
                  <td className="py-2.5 font-mono text-zinc-300 text-right">
                    {hook.hit_count.toLocaleString()}
                  </td>
                  <td className="py-2.5 text-right">
                    <Badge
                      className={
                        hook.active
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/10"
                          : "bg-zinc-500/10 text-zinc-500 border-zinc-500/20 hover:bg-zinc-500/10"
                      }
                    >
                      {hook.active ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
