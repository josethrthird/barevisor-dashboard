"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Layers, Clock, Lock } from "lucide-react";

const cards = [
  {
    icon: Shield,
    title: "CPUID Spoofing",
    description:
      "Intercepts CPUID leaves to hide hypervisor presence. Clears ECX[31] on leaf 1, returns fake vendor on leaf 0x40000000.",
  },
  {
    icon: Layers,
    title: "NPT Dual-View Hooks",
    description:
      "Nested Page Table hooks create separate read and execute views. Guest reads see original code, execution hits shadow pages.",
  },
  {
    icon: Clock,
    title: "RDTSC Normalization",
    description:
      "Compensates TSC delta from VMEXIT overhead. Keeps timing measurements consistent so side-channel detection fails.",
  },
  {
    icon: Lock,
    title: "EFER Protection",
    description:
      "MSR intercept forces SVME bit on guest EFER writes. Prevents guest OS from disabling SVM extensions.",
  },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section id="features" className="py-20 px-6 bg-gray-50/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-950 tracking-tight">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
            Four stealth layers working together to keep the hypervisor
            invisible
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={item}
              className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-gray-300 hover:-translate-y-1 transition-all duration-200 cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
                <card.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
