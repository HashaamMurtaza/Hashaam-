import React from 'react';
import { CAREER_HISTORY } from '../data/portfolioData';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative bg-[#090D16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <div className="text-[11px] font-mono uppercase tracking-[0.08em] text-[#c0c1ff] font-semibold mb-2">
            TRACK RECORD & MILESTONES
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Production Leadership & Impact
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mt-2 font-body">
            Chronology of staff & principal technical responsibilities architecting core infrastructure for global tech platforms.
          </p>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:left-3 sm:before:left-5 before:w-0.5 before:bg-white/[0.08]">
          {CAREER_HISTORY.map((exp, index) => (
            <div
              key={exp.company}
              className="relative pl-9 sm:pl-14 group"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute left-1.5 sm:left-3.5 top-2 w-3.5 h-3.5 rounded-full bg-[#090D16] border-2 border-[#6366F1] group-hover:scale-125 group-hover:border-[#06B6D4] transition-all shadow-[0_0_10px_#6366F1]" />

              {/* Glassmorphic Experience Card */}
              <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/[0.08] hover:border-[#6366F1]/40 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/[0.06]">
                  <div>
                    <span className="text-xs font-mono text-[#06B6D4] font-medium">
                      {exp.period}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-0.5">
                      {exp.role}
                    </h3>
                    <div className="text-sm text-slate-300 font-medium mt-0.5">
                      {exp.company} <span className="text-slate-500">·</span> {exp.location}
                    </div>
                  </div>

                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.04] text-[#c0c1ff] border border-white/[0.08] self-start sm:self-center">
                    Full-Time Staff Track
                  </span>
                </div>

                <p className="text-sm text-[#94A3B8] mt-4 font-body leading-relaxed">
                  {exp.scope}
                </p>

                {/* Key Metrics / Outcomes */}
                <div className="mt-5 space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                    MEASURABLE BUSINESS & SYSTEM OUTCOMES
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {exp.metrics.map((metric, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-[#090D16]/70 border border-white/[0.05] flex items-start gap-2.5 text-xs text-slate-200"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Chips */}
                <div className="mt-5 pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono text-[#94A3B8] bg-white/[0.03] px-2.5 py-0.5 rounded border border-white/[0.06]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-mono text-slate-500">
                    High-Scale Ingress
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
