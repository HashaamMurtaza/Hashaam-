import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, Check, Mail, Calendar, ArrowRight, Copy } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS } from '../data/portfolioData';

interface TerminalConsoleProps {
  initialMode?: 'form' | 'cli';
}

export const TerminalConsole: React.FC<TerminalConsoleProps> = ({ initialMode = 'form' }) => {
  const [activeTab, setActiveTab] = useState<'form' | 'cli'>(initialMode);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    scope: 'Staff / Principal Architecture Role',
    timeline: 'Immediate / Q3-Q4',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // CLI State
  const [cliHistory, setCliHistory] = useState<Array<{ text: string; type: 'input' | 'output' | 'error' | 'success' }>>([
    { text: 'Luminescent Velocity v4.2.0 [x86_64-linux-ebpf]', type: 'output' },
    { text: 'Type "help" for a list of available architectural inspection commands.', type: 'output' },
  ]);
  const [cliInput, setCliInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const terminalBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (activeTab === 'cli') {
      terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [cliHistory, activeTab]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
  };

  const handleCliSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = cliInput.trim();
    if (!cmd) return;

    // Add to history
    setCmdHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);

    const newHistory = [...cliHistory, { text: `guest@luminescent:~$ ${cmd}`, type: 'input' as const }];

    const lower = cmd.toLowerCase();

    if (lower === 'clear') {
      setCliHistory([]);
      setCliInput('');
      return;
    } else if (lower === 'help') {
      newHistory.push({
        text: `Available commands:
  help        - Show available system commands
  bio         - Print architect profile and invariants
  projects    - List high-concurrency systems & metrics
  skills      - Query core systems capabilities
  benchmarks  - Output active node telemetry snapshot
  ping        - Ping distributed edge nodes
  contact     - Display direct contact channels
  clear       - Clear console screen`,
        type: 'output',
      });
    } else if (lower === 'bio') {
      newHistory.push({
        text: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.role}
Location: ${PERSONAL_INFO.location}
Summary: ${PERSONAL_INFO.bio}
Availability: ${PERSONAL_INFO.availability}`,
        type: 'output',
      });
    } else if (lower === 'projects') {
      const projText = PROJECTS.map(
        (p) => `• ${p.title} [${p.categoryLabel}] -> ${p.metrics[0].value} ${p.metrics[0].label} (${p.tagline})`
      ).join('\n');
      newHistory.push({ text: projText, type: 'output' });
    } else if (lower === 'skills') {
      newHistory.push({
        text: `Core Systems: Rust, C++20, WebGPU/WGSL, WebAssembly, Go, eBPF, Linux io_uring
Distributed: Raft, CRDTs, Quorum Replication, Lock-Free Ring Buffers, Kafka
Storage: PostgreSQL internals, RocksDB LSM-Trees, ClickHouse OLAP, Redis`,
        type: 'output',
      });
    } else if (lower === 'benchmarks') {
      newHistory.push({
        text: `INGRESS CLUSTER TELEMETRY:
- Cumulative Throughput: 42.8M req/sec
- p99 Tail Latency: 1.42ms
- Production Uptime Record: 99.999%
- Active Zones: 74 global edge PoPs`,
        type: 'success',
      });
    } else if (lower.startsWith('ping')) {
      newHistory.push({
        text: `PING us-east-cluster-01.mesh (10.0.4.12): 56 data bytes
64 bytes from 10.0.4.12: icmp_seq=0 ttl=64 time=0.842 ms
64 bytes from 10.0.4.12: icmp_seq=1 ttl=64 time=0.819 ms
64 bytes from 10.0.4.12: icmp_seq=2 ttl=64 time=0.835 ms
--- us-east-cluster-01.mesh ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, rtt min/avg/max = 0.819/0.832/0.842 ms`,
        type: 'output',
      });
    } else if (lower === 'contact') {
      newHistory.push({
        text: `Direct Email: ${PERSONAL_INFO.email}
GitHub: ${PERSONAL_INFO.github}
Availability: Q3/Q4 Architecture Advisory & Staff Roles`,
        type: 'output',
      });
    } else {
      newHistory.push({
        text: `command not found: "${cmd}". Type "help" for allowed commands.`,
        type: 'error',
      });
    }

    setCliHistory(newHistory);
    setCliInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIndex = Math.min(historyIndex + 1, cmdHistory.length - 1);
      setHistoryIndex(nextIndex);
      setCliInput(cmdHistory[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setCliInput('');
      } else {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setCliInput(cmdHistory[nextIndex]);
      }
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="text-[11px] font-mono uppercase tracking-[0.08em] text-[#06B6D4] font-semibold mb-2">
            INITIALIZE COLLABORATION
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Connect & Architectural Inquiries
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mt-2 font-body">
            Available for principal systems engineering, technical advisory, and high-concurrency architecture reviews.
          </p>
        </div>

        <div className="glass-panel-elevated rounded-2xl border border-white/[0.1] overflow-hidden shadow-2xl">
          {/* Header Switcher */}
          <div className="p-4 sm:px-6 sm:py-4 bg-[#0a0e17] border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('form')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  activeTab === 'form'
                    ? 'bg-[#6366F1] text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Executive Form
              </button>
              <button
                onClick={() => setActiveTab('cli')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'cli'
                    ? 'bg-[#06B6D4] text-[#003640] font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                UNIX Terminal (CLI)
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{PERSONAL_INFO.email}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* TAB A: EXECUTIVE FORM */}
          {activeTab === 'form' && (
            <div className="p-6 sm:p-8 bg-[#090D16]">
              {formSubmitted ? (
                <div className="p-8 text-center space-y-4 max-w-lg mx-auto bg-white/[0.02] rounded-2xl border border-white/[0.08]">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white">
                    Transmission Dispatched
                  </h3>
                  <p className="text-sm text-[#94A3B8]">
                    Thank you, {formData.name}. Your inquiry regarding{' '}
                    <strong className="text-white">{formData.scope}</strong> has been logged.
                    Direct response latency is typically under 12 hours.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="btn-glass px-4 py-2 rounded text-xs font-mono mt-4 cursor-pointer"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        NAME / IDENTITY *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Elena Rostova"
                        className="w-full bg-[#0a0e17] border border-white/[0.1] rounded-lg px-3.5 py-2.5 text-sm font-mono text-white placeholder-slate-600 focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        DIRECT EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="elena@enterprise.com"
                        className="w-full bg-[#0a0e17] border border-white/[0.1] rounded-lg px-3.5 py-2.5 text-sm font-mono text-white placeholder-slate-600 focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        ORGANIZATION / FUND
                      </label>
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="Apex Technologies"
                        className="w-full bg-[#0a0e17] border border-white/[0.1] rounded-lg px-3.5 py-2.5 text-sm font-mono text-white placeholder-slate-600 focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        ENGAGEMENT SCOPE
                      </label>
                      <select
                        value={formData.scope}
                        onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                        className="w-full bg-[#0a0e17] border border-white/[0.1] rounded-lg px-3.5 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-[#6366F1]"
                      >
                        <option value="Staff / Principal Architecture Role">Staff / Principal Architecture Role</option>
                        <option value="Technical Advisory / Fractional Architecture">Technical Advisory / Fractional Architecture</option>
                        <option value="Low-Latency Systems Audit">Low-Latency Systems Audit</option>
                        <option value="WebGPU / Browser Engine Consultation">WebGPU / Browser Engine Consultation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        EXPECTED TIMELINE
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full bg-[#0a0e17] border border-white/[0.1] rounded-lg px-3.5 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-[#6366F1]"
                      >
                        <option value="Immediate / Q3">Immediate / Q3</option>
                        <option value="Q4 Roadmapping">Q4 Roadmapping</option>
                        <option value="Exploring Options">Exploring Options</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      ARCHITECTURAL CONTEXT OR PROBLEM STATEMENT
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline target ingress throughput, latency constraints, or team architecture requirements..."
                      className="w-full bg-[#0a0e17] border border-white/[0.1] rounded-lg p-3.5 text-sm font-mono text-white placeholder-slate-600 focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <span className="text-xs font-mono text-slate-400">
                      PGP fingerprint: 4A8B 91F2 E731 09CA · End-to-end encrypted
                    </span>
                    <button
                      type="submit"
                      className="btn-primary w-full sm:w-auto px-6 py-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>DISPATCH INQUIRY</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB B: UNIX CLI TERMINAL */}
          {activeTab === 'cli' && (
            <div className="p-6 bg-[#070A11] font-mono text-xs text-[#dfe2ef] min-h-[360px] flex flex-col justify-between">
              <div className="space-y-2 overflow-y-auto max-h-[380px] pr-2">
                {cliHistory.map((line, idx) => (
                  <div
                    key={idx}
                    className={`whitespace-pre-wrap leading-relaxed ${
                      line.type === 'input'
                        ? 'text-cyan-400 font-semibold'
                        : line.type === 'error'
                        ? 'text-[#ffb4ab]'
                        : line.type === 'success'
                        ? 'text-emerald-400'
                        : 'text-slate-300'
                    }`}
                  >
                    {line.text}
                  </div>
                ))}
                <div ref={terminalBottomRef} />
              </div>

              <form onSubmit={handleCliSubmit} className="mt-4 pt-3 border-t border-white/[0.08] flex items-center gap-2">
                <span className="text-emerald-400 font-bold shrink-0">guest@luminescent:~$</span>
                <input
                  type="text"
                  value={cliInput}
                  onChange={(e) => setCliInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="type 'help', 'projects', 'benchmarks', or 'contact'..."
                  className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder-slate-600"
                  autoFocus
                />
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
