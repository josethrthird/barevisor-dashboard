export interface VmexitCounts {
  cpuid: number;
  rdtsc: number;
  rdtscp: number;
  rdmsr: number;
  wrmsr: number;
  npf: number;
  vmmcall: number;
  shutdown: number;
  unknown: number;
}

export interface VmcbConfig {
  intercept_misc1: number;
  intercept_misc2: number;
  intercept_exception: number;
  np_enable: number;
  ncr3: string;
  guest_asid: number;
  tlb_control: number;
}

export interface StealthStatus {
  cpuid_spoof: boolean;
  rdtsc_offset: boolean;
  wda_bypass: boolean;
  efer_protect: boolean;
}

export interface NptHook {
  id: number;
  guest_rip: string;
  shadow_pa: string;
  active: boolean;
  hit_count: number;
}

export interface HypervisorStats {
  connected: boolean;
  cpu_model: string;
  logical_cores: number;
  svm_active: boolean;
  npt_enabled: boolean;
  uptime_seconds: number;
  vmexit_counts: VmexitCounts;
  vmcb: VmcbConfig;
  stealth: StealthStatus;
  hooks: NptHook[];
}

export interface VmexitTimeSample {
  timestamp: number;
  cpuid: number;
  rdtsc: number;
  msr: number;
  npf: number;
  other: number;
}
