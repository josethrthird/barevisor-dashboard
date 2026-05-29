"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

function AnimatedNumber({
  target,
  suffix = "",
  prefix = "",
  duration = 1.4,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [display, setDisplay] = useState(target.toLocaleString());
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;
    setDisplay("0");

    const start = performance.now();
    const step = (now: number) => {
      const elapsed = Math.min((now - start) / (duration * 1000), 1);
      const progress = 1 - Math.pow(1 - elapsed, 3);
      const current = Math.round(progress * target);
      setDisplay(current.toLocaleString());
      if (elapsed < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

const stats = [
  {
    target: 50000,
    suffix: "+",
    label: "VMEXITs/sec",
    description: "Peak intercept throughput on AMD Zen+",
  },
  {
    target: 1,
    prefix: "<",
    suffix: "μs",
    label: "Intercept Latency",
    description: "Per-VMEXIT handler execution time",
  },
  {
    target: 4,
    suffix: "",
    label: "Stealth Layers",
    description: "CPUID, RDTSC, WDA, EFER protection",
  },
];

export function Stats() {
  return (
    <section id="stats" className="py-20 px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`text-center px-8 py-6 ${
              i > 0 ? "md:border-l md:border-gray-200" : ""
            }`}
          >
            <div className="text-4xl md:text-5xl font-bold font-mono text-gray-900 mb-3">
              <AnimatedNumber
                target={stat.target}
                suffix={stat.suffix}
                prefix={stat.prefix}
              />
            </div>
            <div className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-1">
              {stat.label}
            </div>
            <div className="text-sm text-gray-500">{stat.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
