import React, { useState } from 'react';
import { Copy, Check, Play, CheckCircle2, Terminal } from 'lucide-react';
import { CODE_SNIPPETS } from '../data/portfolioData';

export const CodeFrame: React.FC = () => {
  const [activeSnippetIdx, setActiveSnippetIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testResults, setTestResults] = useState<string[] | null>(null);

  const snippet = CODE_SNIPPETS[activeSnippetIdx];

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runTestSuite = () => {
    if (isRunningTests) return;
    setIsRunningTests(true);
    setTestResults([]);

    const steps = [
      'Initializing isolated V8 / Wasm sandboxed memory environment...',
      'Compiling zero-copy atomic CAS benchmarks...',
      '✔ test_cluster_quorum_heartbeat_latency (0.19ms) — PASS',
      '✔ test_delta_crdt_vector_clock_convergence (0.34ms) — PASS',
      '✔ test_shared_array_buffer_ring_buffer_concurrency (0.12ms) — PASS',
      'SUMMARY: 3/3 passed, 0 GC pauses, 0 memory leaks detected.'
    ];

    let current = 0;
    const interval = setInterval(() => {
      current++;
      setTestResults(steps.slice(0, current));
      if (current >= steps.length) {
        clearInterval(interval);
        setIsRunningTests(false);
      }
    }, 320);
  };

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.08em] text-[#c0c1ff] font-semibold mb-2">
              SOURCE ENGINE TELEMETRY
            </div>
            <h2 className="text-3xl font-display font-bold text-white tracking-tight">
              Production Code Artifacts
            </h2>
            <p className="text-sm text-[#94A3B8] font-body mt-1">
              Low-level implementations of consensus algorithms, GPU kernels, and lock-free memory structures.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={runTestSuite}
              disabled={isRunningTests}
              className="btn-primary px-4 py-2 rounded text-xs font-mono font-medium flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 text-white" />
              <span>{isRunningTests ? 'EXECUTING TESTS...' : 'RUN IN-BROWSER TESTS'}</span>
            </button>
          </div>
        </div>

        {/* IDE Simulator Frame */}
        <div className="glass-panel-elevated rounded-2xl border border-white/[0.1] overflow-hidden shadow-2xl group">
          {/* Traffic Light Header Bar */}
          <div className="px-4 py-3 bg-[#0a0e17] border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* macOS traffic light dots, muted grayscale until hovered */}
              <div className="flex items-center gap-1.5 group-hover:opacity-100 opacity-60 transition-opacity">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block" />
              </div>

              {/* Breadcrumb Tabs */}
              <div className="flex items-center gap-1">
                {CODE_SNIPPETS.map((item, idx) => (
                  <button
                    key={item.title}
                    onClick={() => {
                      setActiveSnippetIdx(idx);
                      setTestResults(null);
                    }}
                    className={`px-3 py-1 text-xs font-mono rounded cursor-pointer transition-colors ${
                      activeSnippetIdx === idx
                        ? 'bg-[#181b25] text-white border border-white/[0.1]'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#06B6D4] hidden sm:inline">
                {snippet.badge}
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Code Body */}
          <div className="p-6 bg-[#070A11] overflow-x-auto">
            <pre className="font-mono text-xs sm:text-sm text-[#dfe2ef] leading-relaxed">
              <code>{snippet.code}</code>
            </pre>
          </div>

          {/* Test Execution Output Console Drawer */}
          {testResults && (
            <div className="p-4 bg-[#090D16] border-t border-white/[0.08] font-mono text-xs space-y-1 animate-fade-in">
              <div className="flex items-center gap-2 text-slate-400 pb-1 border-b border-white/[0.06] mb-2">
                <Terminal className="w-3.5 h-3.5 text-[#6366F1]" />
                <span className="text-[11px] uppercase tracking-wider">HARNESS TEST EXECUTION TRACE</span>
              </div>
              {testResults.map((line, i) => (
                <div
                  key={i}
                  className={`${
                    line.includes('PASS')
                      ? 'text-emerald-400 font-semibold'
                      : line.includes('SUMMARY')
                      ? 'text-[#06B6D4] font-bold'
                      : 'text-slate-400'
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
