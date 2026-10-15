import React, { useState, useEffect } from 'react';
import { ArrowRight, Activity, Terminal, ShieldCheck, Zap, Cpu } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onExploreArchitecture: () => void;
  onOpenBenchmarks: () => void;
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreArchitecture,
  onOpenBenchmarks,
  onOpenTerminal,
}) => {
  const [reqCount, setReqCount] = useState(42819230);
  const [latency, setLatency] = useState(1.42);
  const [isStressActive, setIsStressActive] = useState(false);
  const [activeNodes, setActiveNodes] = useState([
    { name: 'iad-01', p99: 1.2, load: 42 },
    { name: 'fra-04', p99: 1.8, load: 58 },
    { name: 'nrt-02', p99: 2.1, load: 39 },
    { name: 'syd-03', p99: 2.9, load: 47 },
  ]);

  // Live cluster simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setReqCount((prev) => prev + (isStressActive ? Math.floor(Math.random() * 2400) + 1200 : Math.floor(Math.random() * 120) + 40));
      
      if (isStressActive) {
        setLatency(Number((1.4 + Math.random() * 0.9).toFixed(2)));
      } else {
        setLatency(Number((1.38 + Math.random() * 0.08).toFixed(2)));
      }
    }, 400);

    return () => clearInterval(interval);
  }, [isStressActive]);

  const toggleStressTest = () => {
    setIsStressActive((prev) => !prev);
  };

  return (
    <section id="overview" className="relative pt-28 pb-20 md:pt-36 md:pb-32 overflow-hidden">
      {/* Background radial illumination */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#6366F1]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-[#06B6D4]/08 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial & Technical Hook */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/25 text-[#4edea3] text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
              </span>
              <span>Available for Q3/Q4 Architecture & Staff Roles</span>
            </div>

            {/* Display-XL Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-display font-extrabold tracking-[-0.03em] leading-[1.08] text-white">
              Architecting high-concurrency systems & luminous digital interfaces.
            </h1>

            {/* Narrative Body */}
            <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl font-body leading-relaxed">
              Principal Full-Stack & Distributed Systems Architect specializing in zero-allocation
              memory runtimes, WebGPU browser compute pipelines, and fault-tolerant global edge
              consensus. Engineering resilient software at the microsecond boundary.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                onClick={onExploreArchitecture}
                className="btn-primary px-5 py-3 rounded text-sm font-semibold flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span>[ View Architecture → ]</span>
              </button>

              <button
                onClick={onOpenBenchmarks}
                className="btn-glass px-5 py-3 rounded text-sm font-medium flex items-center gap-2 cursor-pointer"
              >
                <Activity className="w-4 h-4 text-[#06B6D4]" />
                <span>Live Telemetry Lab</span>
              </button>

              <button
                onClick={onOpenTerminal}
                className="btn-glass px-4 py-3 rounded text-xs font-mono text-slate-300 flex items-center gap-2 cursor-pointer hover:text-white"
              >
                <Terminal className="w-3.5 h-3.5 text-[#6366F1]" />
                <span>$ ssh cluster</span>
              </button>
            </div>

            {/* Proof Metric Strip */}
            <div className="pt-8 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-4">
              {PERSONAL_INFO.stats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-display font-bold text-white tabular-nums">
                      {stat.value}
                    </span>
                    <span className="text-xs font-mono text-[#06B6D4] font-medium">
                      {stat.unit}
                    </span>
                  </div>
                  <div className="text-xs text-[#908fa0] leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Portrait + Interactive Node Telemetry HUD */}
          <div className="lg:col-span-5 space-y-4">
            {/* Engineer Profile Card with Portrait */}
            <div className="glass-panel rounded-2xl p-4 sm:p-5 relative group overflow-hidden border border-white/[0.1] shadow-2xl">
              {/* Subtle top gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#6366F1] to-[#06B6D4]" />

              <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                  <img
                    src={PERSONAL_INFO.avatar}
                    alt={PERSONAL_INFO.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-white/[0.15] shadow-md"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/male_engineer_portrait_1791358823711.jpg';
                    }}
                  />
                  <span className="absolute -bottom-1 -right-1 p-1 bg-[#090D16] rounded-full">
                    <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#908fa0]">
                      LEAD ARCHITECT
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#10B981]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                      ACTIVE RUNTIME
                    </span>
                  </div>
                  <h3 className="text-lg font-display font-bold text-white truncate mt-0.5">
                    {PERSONAL_INFO.name}
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-1 line-clamp-2">
                    Staff Distributed Systems & Performance Architect. Ex-Quantum Edge, Hyperscale Cloud.
                  </p>
                  <div className="flex items-center gap-2 mt-2.5 text-[11px] font-mono text-[#c0c1ff]">
                    <span>SF Bay Area</span>
                    <span className="text-slate-600">/</span>
                    <span>12+ Yrs Production</span>
                  </div>
                </div>
              </div>

              {/* Integrated Telemetry HUD */}
              <div className="mt-4 pt-4 border-t border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#908fa0] flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-[#6366F1]" />
                    CLUSTER INGRESS
                  </span>
                  <button
                    onClick={toggleStressTest}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all cursor-pointer ${
                      isStressActive
                        ? 'bg-[#ffb4ab]/20 text-[#ffb4ab] border border-[#ffb4ab]/40 animate-pulse'
                        : 'bg-white/[0.05] text-[#06B6D4] hover:bg-[#06B6D4]/10 border border-white/[0.08]'
                    }`}
                  >
                    {isStressActive ? '🔥 CHAOS LOAD ACTIVE' : '⚡ INJECT TRAFFIC SPIKE'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-[#090D16]/70 p-3 rounded-lg border border-white/[0.05]">
                  <div>
                    <span className="text-[10px] font-mono text-[#64748B] block">TOTAL REQ SERVED</span>
                    <span className="text-sm font-mono font-bold text-white tabular-nums">
                      {reqCount.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#64748B] block">INGRESS TAIL (p99)</span>
                    <span
                      className={`text-sm font-mono font-bold tabular-nums ${
                        isStressActive ? 'text-[#ffb4ab]' : 'text-[#4edea3]'
                      }`}
                    >
                      {latency} ms
                    </span>
                  </div>
                </div>

                {/* Micro Node Ping Matrix */}
                <div className="grid grid-cols-4 gap-1.5 pt-1">
                  {activeNodes.map((node) => (
                    <div
                      key={node.name}
                      className="bg-white/[0.02] border border-white/[0.06] rounded p-1.5 text-center"
                    >
                      <div className="text-[9px] font-mono text-[#94A3B8]">{node.name}</div>
                      <div className="text-[10px] font-mono font-semibold text-emerald-400">
                        {isStressActive ? (node.p99 * 1.6).toFixed(1) : node.p99}ms
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Architecture Callout Badge */}
            <div className="px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs text-[#94A3B8]">
              <span className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-[#c0c1ff]" />
                Zero GC pauses on core streaming pipelines
              </span>
              <span className="font-mono text-[11px] text-[#06B6D4]">x86_64 / aarch64</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
