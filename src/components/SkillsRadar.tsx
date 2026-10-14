import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Network, Terminal, Database, Cloud, ChevronRight, Check } from 'lucide-react';

export const SkillsRadar: React.FC = () => {
  const [selectedCatId, setSelectedCatId] = useState<string>(SKILL_CATEGORIES[0].id);
  const [selectedSkillName, setSelectedSkillName] = useState<string | null>(null);

  const activeCategory = SKILL_CATEGORIES.find((c) => c.id === selectedCatId) || SKILL_CATEGORIES[0];

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'distributed':
        return <Network className="w-4 h-4 text-[#6366F1]" />;
      case 'runtime':
        return <Terminal className="w-4 h-4 text-[#06B6D4]" />;
      case 'infrastructure':
        return <Cloud className="w-4 h-4 text-[#10B981]" />;
      case 'databases':
        return <Database className="w-4 h-4 text-[#c0c1ff]" />;
      default:
        return <Network className="w-4 h-4" />;
    }
  };

  return (
    <section id="matrix" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="text-[11px] font-mono uppercase tracking-[0.08em] text-[#06B6D4] font-semibold mb-2">
            CORE CAPABILITY SPECTRUM
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Systems Competency & Technical Depth
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mt-2 font-body">
            Battle-tested across 12+ years of high-concurrency production deployments. Not just framework familiarity, but deep mechanical sympathy with CPU, memory, and network layers.
          </p>
        </div>

        {/* Matrix Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Category Tabs Sidebar */}
          <div className="lg:col-span-4 space-y-2">
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCatId(cat.id);
                  setSelectedSkillName(null);
                }}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedCatId === cat.id
                    ? 'bg-[#181b25] border-[#6366F1]/50 text-white shadow-lg shadow-black/40'
                    : 'bg-[#0f131c]/60 border-white/[0.06] text-[#94A3B8] hover:bg-[#181b25]/50 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/[0.04]">
                    {getCategoryIcon(cat.id)}
                  </div>
                  <div>
                    <div className="text-sm font-display font-bold">{cat.name}</div>
                    <div className="text-xs text-[#908fa0] mt-0.5 line-clamp-1">{cat.description}</div>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${selectedCatId === cat.id ? 'rotate-90 text-[#6366F1]' : 'text-slate-600'}`} />
              </button>
            ))}

            {/* Invariant badge */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] mt-4 space-y-2">
              <span className="text-[10px] font-mono text-[#06B6D4] uppercase tracking-wider block">
                PRODUCTION PRINCIPLES
              </span>
              <ul className="text-xs text-[#94A3B8] space-y-1.5 font-body">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  Zero-allocation memory profiles on hot paths
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  Explicit backpressure & unbounded buffer prevention
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  Mathematical convergence over heuristics
                </li>
              </ul>
            </div>
          </div>

          {/* Detailed Skill Cards Grid */}
          <div className="lg:col-span-8">
            <div className="glass-panel rounded-2xl p-6 border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div>
                  <h3 className="text-lg font-display font-bold text-white">
                    {activeCategory.name}
                  </h3>
                  <p className="text-xs text-[#94A3B8] font-body mt-0.5">
                    {activeCategory.description}
                  </p>
                </div>
                <span className="text-xs font-mono text-[#c0c1ff] bg-[#c0c1ff]/10 px-2.5 py-1 rounded border border-[#c0c1ff]/20">
                  {activeCategory.skills.length} Capabilities
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeCategory.skills.map((skill) => {
                  const isSelected = selectedSkillName === skill.name;

                  return (
                    <div
                      key={skill.name}
                      onClick={() => setSelectedSkillName(isSelected ? null : skill.name)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#181b25] border-[#06B6D4] shadow-md shadow-[#06B6D4]/10'
                          : 'bg-[#090D16]/70 border-white/[0.06] hover:border-white/[0.15]'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-sm font-mono font-bold text-white">
                            {skill.name}
                          </div>
                          <div className="flex items-center gap-2 text-[11px] font-mono text-[#06B6D4] mt-0.5">
                            <span>{skill.level}</span>
                            <span>·</span>
                            <span>{skill.experience} production</span>
                          </div>
                        </div>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1" />
                      </div>

                      <p className="text-xs text-[#94A3B8] font-body mt-2.5 leading-relaxed">
                        {skill.highlight}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-white/[0.05]">
                        {skill.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono text-slate-300 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
