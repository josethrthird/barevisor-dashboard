"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { HypervisorStats, VmexitTimeSample } from "./types";
import { generateMockStats, statsToTimeSample } from "./mock-data";

const WS_URL = "ws://localhost:8385/ws";
const HISTORY_SIZE = 60;

export function useHypervisor() {
  const [stats, setStats] = useState<HypervisorStats | null>(null);
  const [history, setHistory] = useState<VmexitTimeSample[]>([]);
  const [mode, setMode] = useState<"connecting" | "live" | "demo">(
    "connecting"
  );
  const wsRef = useRef<WebSocket | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const pushSample = useCallback(
    (newStats: HypervisorStats) => {
      const sample = statsToTimeSample(newStats);
      setHistory((prev) => {
        const next = [...prev, sample];
        return next.length > HISTORY_SIZE
          ? next.slice(next.length - HISTORY_SIZE)
          : next;
      });
    },
    []
  );

  const startDemo = useCallback(() => {
    setMode("demo");
    intervalRef.current = setInterval(() => {
      const mock = generateMockStats();
      setStats(mock);
      pushSample(mock);
    }, 1000);
  }, [pushSample]);

  const connectWs = useCallback(() => {
    try {
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => setMode("live");

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as HypervisorStats;
          data.connected = true;
          setStats(data);
          pushSample(data);
        } catch {
          // ignore malformed messages
        }
      };

      ws.onclose = () => {
        wsRef.current = null;
        if (mode !== "demo") startDemo();
      };

      ws.onerror = () => {
        ws.close();
      };

      setTimeout(() => {
        if (ws.readyState !== WebSocket.OPEN) {
          ws.close();
          startDemo();
        }
      }, 2000);
    } catch {
      startDemo();
    }
  }, [mode, pushSample, startDemo]);

  useEffect(() => {
    connectWs();
    return () => {
      wsRef.current?.close();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { stats, history, mode };
}
