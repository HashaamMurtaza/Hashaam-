import React, { useState } from 'react';
import { ArrowUpRight, Cpu, Layers, GitBranch, Zap, ExternalLink } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';

interface ProjectsBentoProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsBento: React.FC<ProjectsBentoProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'distributed' | 'gpu' | 'infrastructure'>('all');

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'distributed') return p.category.includes('DISTRIBUTED') || p.category.includes('CONSENSUS');
    if (activeFilter === 'gpu') return p.category.includes('GPU') || p.category.includes('WEBGL');
    if (activeFilter === 'infrastructure') return p.category.includes('CLOUD') || p.category.includes('FINANCIAL');
    return true;
  });

  return (
    <section id="architecture" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.08em] text-[#06B6D4] font-semibold mb-2">
              ENGINEERING PORTFOLIO & RUNTIMES
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white">
              Selected Systems Architecture
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mt-2 font-body">
              Production distributed engines, WebGPU compute pipelines, and low-latency financial protocols deployed at hyperscale.
            </p>
          </div>

          {/* Interactive Filter Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-[#181b25] border border-white/[0.08] rounded-lg self-start md:self-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-xs font-mono rounded-md transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#6366F1] text-white shadow-sm font-semibold'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              All Systems ({PROJECTS.length})
            </button>
            <button
              onClick={() => setActiveFilter('distributed')}
              className={`px-3 py-1.5 text-xs font-mono rounded-md transition-all cursor-pointer ${
                activeFilter === 'distributed'
                  ? 'bg-[#6366F1] text-white shadow-sm font-semibold'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              Distributed
            </button>
            <button
              onClick={() => setActiveFilter('gpu')}
              className={`px-3 py-1.5 text-xs font-mono rounded-md transition-all cursor-pointer ${
                activeFilter === 'gpu'
                  ? 'bg-[#6366F1] text-white shadow-sm font-semibold'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              GPU & Runtimes
            </button>
            <button
              onClick={() => setActiveFilter('infrastructure')}
              className={`px-3 py-1.5 text-xs font-mono rounded-md transition-all cursor-pointer ${
                activeFilter === 'infrastructure'
                  ? 'bg-[#6366F1] text-white shadow-sm font-semibold'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              Infrastructure
            </button>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => {
            const isFeatured = index === 0;

            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className={`glass-card-interactive glass-panel rounded-2xl overflow-hidden border border-white/[0.08] flex flex-col group cursor-pointer ${
                  isFeatured ? 'md:col-span-2 lg:flex-row' : ''
                }`}
              >
                {/* Visual Image Container */}
                <div
                  className={`relative overflow-hidden bg-[#0a0e17] ${
                    isFeatured ? 'lg:w-1/2 h-64 sm:h-80 lg:h-auto min-h-[280px]' : 'h-56 sm:h-64'
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      if (!target.src.includes('/images/')) {
                        const fallbackName =
                          project.id === 'apex-velocity'
                            ? 'apex_velocity_racing_1791360412364.jpg'
                            : project.id === 'valkyrie-arms'
                            ? 'valkyrie_tactical_arms_1791360426153.jpg'
                            : 'distributed_mesh_network_1791358072383.jpg';
                        target.src = `/images/${fallbackName}`;
                      }
                    }}
                  />
                  {/* Scrim Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-transparent opacity-80" />

                  {/* Corner Category Tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[11px] font-mono tracking-wider font-semibold text-[#c0c1ff] bg-[#090D16]/80 px-2.5 py-1 rounded backdrop-blur-md border border-white/[0.1]">
                      {project.categoryLabel}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs font-mono text-white/90">
                    <span className="flex items-center gap-1.5 bg-[#090D16]/70 px-2.5 py-1 rounded backdrop-blur-sm">
                      <Zap className="w-3.5 h-3.5 text-[#06B6D4]" />
                      {project.metrics[0]?.value} {project.metrics[0]?.sublabel}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className={`p-6 sm:p-7 flex-1 flex flex-col justify-between ${isFeatured ? 'lg:w-1/2' : ''}`}>
                  <div className="space-y-4">
                    {/* Header */}
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-[0.08em] text-[#908fa0] mb-1">
                        {project.category}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-[#c0c1ff] transition-colors flex items-center justify-between">
                        <span>{project.title}</span>
                        <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-[#6366F1] transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </h3>
                      <p className="text-xs sm:text-sm text-[#06B6D4] font-mono mt-1">
                        {project.tagline}
                      </p>
                    </div>

                    <p className="text-sm text-[#94A3B8] font-body leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Architecture Metrics Grid */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/[0.06] bg-[#090D16]/40 px-3 rounded-lg">
                      {project.metrics.map((metric, idx) => (
                        <div key={idx} className="space-y-0.5">
                          <span className="text-[10px] font-mono text-[#908fa0] block truncate">
                            {metric.label}
                          </span>
                          <span className="text-sm sm:text-base font-mono font-bold text-white block truncate">
                            {metric.value}
                          </span>
                          {metric.sublabel && (
                            <span className="text-[9px] font-mono text-slate-500 block truncate">
                              {metric.sublabel}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer with Tags and Inspect / Live / Repo Triggers */}
                  <div className="pt-5 mt-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-white/[0.04] border border-white/[0.08] text-[#94A3B8] group-hover:border-[#06B6D4]/30 group-hover:text-slate-200 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="text-[10px] font-mono text-slate-500 self-center">
                          +{project.tags.length - 4} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs font-mono text-[#94A3B8] hover:text-white flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          <span>GitHub</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs font-mono text-[#4cd7f6] hover:text-white flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          <span>Live App</span>
                          <ExternalLink className="w-3 h-3 text-[#4cd7f6]" />
                        </a>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject(project);
                        }}
                        className="text-xs font-mono text-[#c0c1ff] hover:text-white flex items-center gap-1 group-hover:underline cursor-pointer shrink-0"
                      >
                        [ Inspect → ]
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
