import React, { useState, useEffect, useRef } from 'react';
import { Activity, Play, RefreshCw, AlertTriangle, ShieldCheck, Cpu, Sliders } from 'lucide-react';

export const TelemetryLab: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<'consistent-hash' | 'least-conn' | 'maglev' | 'round-robin'>('consistent-hash');
  const [workerCount, setWorkerCount] = useState<number>(8);
  const [chaosMode, setChaosMode] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [liveRps, setLiveRps] = useState<number>(142000);
  const [p99Latency, setP99Latency] = useState<number>(1.42);
  const [cacheHitRatio, setCacheHitRatio] = useState<number>(98.6);
  const [recentLogs, setRecentLogs] = useState<string[]>([]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dataPointsRef = useRef<number[]>([]);

  // Initialize history
  useEffect(() => {
    dataPointsRef.current = Array.from({ length: 40 }, () => 135000 + Math.random() * 20000);
    setRecentLogs([
      '[CLUSTER] Ingress router converged across 8 worker groups (p99: 1.41ms)',
      '[HASH] Key ring partitioned into 1024 virtual buckets via Murmur3',
      '[QUIC] Datagram session TLS 1.3 handshake completed in 0.8ms',
      '[HEALTH] All distributed storage mirrors in quorum sync'
    ]);
  }, []);

  // Update telemetry and canvas loop
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      // Calculate variance based on algorithm and chaos
      let baseRps = 140000 + workerCount * 3000;
      let latencyBase = 1.35;

      if (algorithm === 'least-conn') {
        latencyBase = 1.28;
      } else if (algorithm === 'maglev') {
        baseRps += 12000;
        latencyBase = 1.15;
      } else if (algorithm === 'round-robin') {
        latencyBase = 1.62;
      }

      if (chaosMode) {
        latencyBase += Math.random() * 1.8;
        baseRps -= Math.floor(Math.random() * 35000);
      }

      const jitter = (Math.random() - 0.5) * 8000;
      const currentRps = Math.floor(baseRps + jitter);
      const currentLat = Number((latencyBase + Math.random() * 0.12).toFixed(2));

      setLiveRps(currentRps);
      setP99Latency(currentLat);
      setCacheHitRatio(chaosMode ? 92.4 : 98.7);

      // Append to graph buffer
      dataPointsRef.current.push(currentRps);
      if (dataPointsRef.current.length > 50) {
        dataPointsRef.current.shift();
      }

      // Draw canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const width = canvas.width;
          const height = canvas.height;
          ctx.clearRect(0, 0, width, height);

          // Grid lines
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
          ctx.lineWidth = 1;
          for (let y = 20; y < height; y += 30) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
          }

          // Draw throughput line
          const points = dataPointsRef.current;
          const minVal = 90000;
          const maxVal = 220000;
          const stepX = width / (points.length - 1);

          ctx.beginPath();
          points.forEach((val, i) => {
            const normY = height - ((val - minVal) / (maxVal - minVal)) * (height - 30) - 15;
            const x = i * stepX;
            if (i === 0) ctx.moveTo(x, normY);
            else ctx.lineTo(x, normY);
          });

          // Gradient fill
          const grad = ctx.createLinearGradient(0, 0, 0, height);
          grad.addColorStop(0, 'rgba(99, 102, 241, 0.35)');
          grad.addColorStop(1, 'rgba(99, 102, 241, 0.0)');

          ctx.lineTo(width, height);
          ctx.lineTo(0, height);
          ctx.closePath();
          ctx.fillStyle = grad;
          ctx.fill();

          // Stroke line
          ctx.beginPath();
          points.forEach((val, i) => {
            const normY = height - ((val - minVal) / (maxVal - minVal)) * (height - 30) - 15;
            const x = i * stepX;
            if (i === 0) ctx.moveTo(x, normY);
            else ctx.lineTo(x, normY);
          });
          ctx.strokeStyle = chaosMode ? '#ffb4ab' : '#06B6D4';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
    }, 280);

    return () => clearInterval(interval);
  }, [algorithm, workerCount, chaosMode, isPaused]);

  const triggerIngressWave = () => {
    // Inject massive burst
    setRecentLogs((prev) => [
      `[INGRESS SPIKE] Synthesized 50,000 parallel client handshakes via ${algorithm.toUpperCase()}`,
      ...prev.slice(0, 4)
    ]);
    setLiveRps((prev) => prev + 48000);
    setP99Latency((prev) => Number((prev + 0.35).toFixed(2)));
  };

  return (
    <section id="benchmarks" className="py-24 relative bg-[#090D16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-[11px] font-mono uppercase tracking-[0.08em] text-[#10B981] font-semibold mb-2">
            REAL-TIME CLUSTER INSTRUMENTATION
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white">
            Live Telemetry & Benchmark Sandbox
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mt-2 font-body">
            Interact with the client-side simulated distributed routing engine. Mutate load balancing policies, inject chaos faults, and inspect p99 latency convergence.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="glass-panel-elevated rounded-2xl border border-white/[0.1] overflow-hidden shadow-2xl">
          {/* Top Control Bar */}
          <div className="p-4 sm:p-6 border-b border-white/[0.08] bg-[#0F172A]/70 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono text-[#908fa0] flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#6366F1]" />
                BALANCER ALGORITHM:
              </span>
              <div className="flex items-center gap-1 bg-[#090D16] p-1 rounded-lg border border-white/[0.06]">
                {(['consistent-hash', 'maglev', 'least-conn', 'round-robin'] as const).map((algo) => (
                  <button
                    key={algo}
                    onClick={() => setAlgorithm(algo)}
                    className={`px-2.5 py-1 text-[11px] font-mono rounded cursor-pointer transition-all ${
                      algorithm === algo
                        ? 'bg-[#6366F1] text-white font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {algo === 'consistent-hash' ? 'Consistent Hash' : algo === 'maglev' ? 'Maglev Fast' : algo === 'least-conn' ? 'Least Conn' : 'Round Robin'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Workers Select */}
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <span className="text-[#908fa0]">WORKERS:</span>
                <select
                  value={workerCount}
                  onChange={(e) => setWorkerCount(Number(e.target.value))}
                  className="bg-[#090D16] border border-white/[0.1] rounded px-2.5 py-1 text-xs font-mono text-white focus:outline-none focus:border-[#6366F1]"
                >
                  <option value={4}>4 Nodes</option>
                  <option value={8}>8 Nodes</option>
                  <option value={16}>16 Nodes</option>
                  <option value={32}>32 Nodes (Clustered)</option>
                </select>
              </div>

              {/* Chaos Toggle */}
              <button
                onClick={() => setChaosMode(!chaosMode)}
                className={`px-3 py-1.5 rounded text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-all ${
                  chaosMode
                    ? 'bg-[#ffb4ab]/20 text-[#ffb4ab] border border-[#ffb4ab]/40 animate-pulse'
                    : 'bg-white/[0.04] text-slate-300 hover:text-white border border-white/[0.08]'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5 text-[#ffb4ab]" />
                <span>Chaos Injection: {chaosMode ? 'ON (10% Loss)' : 'OFF'}</span>
              </button>

              {/* Stress Trigger */}
              <button
                onClick={triggerIngressWave}
                className="btn-primary px-3 py-1.5 rounded text-xs font-mono font-medium flex items-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3 h-3" />
                <span>Inject Burst</span>
              </button>
            </div>
          </div>

          {/* Metric KPI HUD */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06]">
            <div className="bg-[#090D16] p-5 space-y-1">
              <span className="text-[11px] font-mono text-[#908fa0]">INGRESS THROUGHPUT</span>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-white tabular-nums flex items-baseline gap-1">
                {liveRps.toLocaleString()}
                <span className="text-xs text-[#06B6D4] font-normal">req/s</span>
              </div>
              <div className="text-[11px] font-mono text-emerald-400">
                ↑ +12.4% vs baseline
              </div>
            </div>

            <div className="bg-[#090D16] p-5 space-y-1">
              <span className="text-[11px] font-mono text-[#908fa0]">p99 TAIL LATENCY</span>
              <div className={`text-2xl sm:text-3xl font-mono font-bold tabular-nums flex items-baseline gap-1 ${
                chaosMode ? 'text-[#ffb4ab]' : 'text-emerald-400'
              }`}>
                {p99Latency}
                <span className="text-xs text-slate-400 font-normal">ms</span>
              </div>
              <div className="text-[11px] font-mono text-[#908fa0]">
                Target SLA: &lt; 2.50ms
              </div>
            </div>

            <div className="bg-[#090D16] p-5 space-y-1">
              <span className="text-[11px] font-mono text-[#908fa0]">CACHE CONVERGENCE</span>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-white tabular-nums flex items-baseline gap-1">
                {cacheHitRatio}%
                <span className="text-xs text-[#c0c1ff] font-normal">hit</span>
              </div>
              <div className="text-[11px] font-mono text-emerald-400">
                0 false evictions
              </div>
            </div>

            <div className="bg-[#090D16] p-5 space-y-1">
              <span className="text-[11px] font-mono text-[#908fa0]">FAULT TOLERANCE</span>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#c0c1ff] tabular-nums">
                {chaosMode ? 'Self-Healing' : 'Optimal Quorum'}
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                eBPF XDP Line Rate Active
              </div>
            </div>
          </div>

          {/* Real-time Canvas Graph */}
          <div className="p-6 bg-[#070A11] space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#06B6D4] animate-ping" />
                <span className="text-white font-semibold">LIVE TAIL WAVEFORM</span>
                <span>(Sampling at 280ms interval)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-0.5 bg-[#06B6D4]" />
                  Throughput (RPS)
                </span>
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="px-2 py-0.5 rounded bg-white/[0.05] hover:bg-white/[0.1] text-[10px] cursor-pointer"
                >
                  {isPaused ? 'Resume Stream' : 'Freeze Stream'}
                </button>
              </div>
            </div>

            <div className="relative h-48 w-full bg-[#05070D] rounded-xl overflow-hidden border border-white/[0.06]">
              <canvas
                ref={canvasRef}
                width={1000}
                height={192}
                className="w-full h-full block"
              />
            </div>
          </div>

          {/* Audit Logs Stream */}
          <div className="p-4 bg-[#090D16] border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-400 overflow-x-auto">
            <div className="flex items-center gap-2 truncate">
              <span className="text-[#10B981] font-bold shrink-0">LATEST AUDIT:</span>
              <span className="text-slate-300 truncate">{recentLogs[0]}</span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono ml-4 shrink-0">
              SYNC STATUS: 100% HEALTHY
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
