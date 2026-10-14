import React, { useState, useEffect } from 'react';
import { Search, Terminal, Cpu, Layers, Activity, FileText, Mail, ArrowRight, X } from 'lucide-react';
import { PROJECTS, PERSONAL_INFO } from '../data/portfolioData';
import { Project } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onOpenTerminal: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onOpenTerminal,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or toggled
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navigateTo = (id: string) => {
    onClose();
    const elem = document.querySelector(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredProjects = PROJECTS.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.tagline.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="w-full max-w-2xl glass-panel-elevated rounded-2xl border border-white/[0.15] overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08] bg-[#0F172A]/90">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, inspect a system, or jump to section..."
            className="flex-1 bg-transparent text-sm font-mono text-white placeholder-slate-500 focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Results */}
        <div className="p-3 max-h-[60vh] overflow-y-auto space-y-4 font-mono text-xs">
          {/* Quick Sections */}
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider px-2 block mb-1">
              NAVIGATION TARGETS
            </span>
            <div className="space-y-0.5">
              {[
                { name: 'Architecture & Engineering Works', href: '#architecture', icon: <Layers className="w-3.5 h-3.5 text-[#6366F1]" /> },
                { name: 'Live Telemetry & Chaos Sandbox', href: '#benchmarks', icon: <Activity className="w-3.5 h-3.5 text-[#06B6D4]" /> },
                { name: 'Systems Competency Matrix', href: '#matrix', icon: <Cpu className="w-3.5 h-3.5 text-[#10B981]" /> },
                { name: 'Production Track Record', href: '#experience', icon: <FileText className="w-3.5 h-3.5 text-[#c0c1ff]" /> },
                { name: 'Initialize Collaboration', href: '#contact', icon: <Mail className="w-3.5 h-3.5 text-slate-300" /> },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigateTo(item.href)}
                  className="w-full flex items-center justify-between p-2 rounded-lg text-left text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider px-2 block mb-1">
              SYSTEM ARCHITECTURES
            </span>
            <div className="space-y-0.5">
              {filteredProjects.map((proj) => (
                <button
                  key={proj.id}
                  onClick={() => {
                    onClose();
                    onSelectProject(proj);
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-lg text-left text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                >
                  <div>
                    <span className="font-bold text-white">{proj.title}</span>
                    <span className="text-slate-500 ml-2">[{proj.categoryLabel}]</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">{proj.tagline}</p>
                  </div>
                  <span className="text-[11px] text-[#06B6D4]">{proj.metrics[0].value}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pt-2 border-t border-white/[0.06]">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider px-2 block mb-1">
              SYSTEM ACTIONS
            </span>
            <div className="space-y-0.5">
              <button
                onClick={() => {
                  onClose();
                  onOpenTerminal();
                }}
                className="w-full flex items-center gap-2.5 p-2 rounded-lg text-left text-[#06B6D4] hover:bg-[#06B6D4]/10 transition-colors cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Launch Interactive UNIX Terminal Console</span>
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(PERSONAL_INFO.email);
                  onClose();
                }}
                className="w-full flex items-center gap-2.5 p-2 rounded-lg text-left text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-[#6366F1]" />
                <span>Copy Direct Contact Email ({PERSONAL_INFO.email})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-[#090D16] border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Navigation: ↑ ↓ to browse · ↵ to select</span>
          <span>ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};
