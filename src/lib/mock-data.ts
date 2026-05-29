import type { HypervisorStats, VmexitTimeSample } from "./types";

const BASE_STATS: HypervisorStats = {
  connected: false,
  cpu_model: "AMD Ryzen 5 3450U (Zen+)",
  logical_cores: 8,
  svm_active: true,
  npt_enabled: true,
  uptime_seconds: 0,
  vmexit_counts: {
    cpuid: 0,
    rdtsc: 0,
    rdtscp: 0,
    rdmsr: 0,
    wrmsr: 0,
    npf: 0,
    vmmcall: 0,
    shutdown: 0,
    unknown: 0,
  },
  vmcb: {
    intercept_misc1: 0x10040000,
    intercept_misc2: 0x00000003,
    intercept_exception: 0x00000000,
    np_enable: 1,
    ncr3: "0x0000000100000000",
    guest_asid: 1,
    tlb_control: 1,
  },
  stealth: {
    cpuid_spoof: true,
    rdtsc_offset: true,
    wda_bypass: true,
    efer_protect: true,
  },
  hooks: [
    {
      id: 0,
      guest_rip: "0xFFFFF80076A01200",
      shadow_pa: "0x0000000200001000",
      active: true,
      hit_count: 0,
    },
    {
      id: 1,
      guest_rip: "0xFFFFF80076A03480",
      shadow_pa: "0x0000000200002000",
      active: true,
      hit_count: 0,
    },
    {
      id: 2,
      guest_rip: "0xFFFFF80072B10040",
      shadow_pa: "0x0000000200003000",
      active: false,
      hit_count: 0,
    },
  ],
};

function poisson(lambda: number): number {
  let L = Math.exp(-lambda);
  let k = 0;
  let p = 1;
  do {
    k++;
    p *= Math.random();
  } while (p > L);
  return k - 1;
}

let mockUptime = 7200;
let cumulativeCpuid = 48210;
let cumulativeRdtsc = 12840;
let cumulativeRdtscp = 3201;
let cumulativeRdmsr = 6421;
let cumulativeWrmsr = 1892;
let cumulativeNpf = 320;
let cumulativeVmmcall = 89;
let cumulativeUnknown = 2;

export function generateMockStats(): HypervisorStats {
  mockUptime += 1;
  cumulativeCpuid += poisson(12);
  cumulativeRdtsc += poisson(5);
  cumulativeRdtscp += poisson(1.5);
  cumulativeRdmsr += poisson(3);
  cumulativeWrmsr += poisson(1);
  cumulativeNpf += poisson(0.2);
  cumulativeVmmcall += poisson(0.05);

  const hooks = BASE_STATS.hooks.map((h) => ({
    ...h,
    hit_count: h.active
      ? h.hit_count + Math.floor(mockUptime * (0.5 + Math.random() * 2))
      : 0,
  }));

  return {
    ...BASE_STATS,
    uptime_seconds: mockUptime,
    vmexit_counts: {
      cpuid: cumulativeCpuid,
      rdtsc: cumulativeRdtsc,
      rdtscp: cumulativeRdtscp,
      rdmsr: cumulativeRdmsr,
      wrmsr: cumulativeWrmsr,
      npf: cumulativeNpf,
      vmmcall: cumulativeVmmcall,
      shutdown: 0,
      unknown: cumulativeUnknown,
    },
    hooks,
  };
}

let prevCounts = {
  cpuid: cumulativeCpuid,
  rdtsc: cumulativeRdtsc,
  rdtscp: cumulativeRdtscp,
  rdmsr: cumulativeRdmsr,
  wrmsr: cumulativeWrmsr,
  npf: cumulativeNpf,
  vmmcall: cumulativeVmmcall,
  shutdown: 0,
  unknown: cumulativeUnknown,
};

export function statsToTimeSample(
  stats: HypervisorStats
): VmexitTimeSample {
  const c = stats.vmexit_counts;
  const sample: VmexitTimeSample = {
    timestamp: Date.now(),
    cpuid: c.cpuid - prevCounts.cpuid,
    rdtsc: c.rdtsc - prevCounts.rdtsc + (c.rdtscp - prevCounts.rdtscp),
    msr: c.rdmsr - prevCounts.rdmsr + (c.wrmsr - prevCounts.wrmsr),
    npf: c.npf - prevCounts.npf,
    other:
      c.vmmcall -
      prevCounts.vmmcall +
      (c.unknown - prevCounts.unknown) +
      (c.shutdown - prevCounts.shutdown),
  };
  prevCounts = { ...c };
  return sample;
}
