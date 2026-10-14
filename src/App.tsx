/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsBento } from './components/ProjectsBento';
import { ArchitectureModal } from './components/ArchitectureModal';
import { TelemetryLab } from './components/TelemetryLab';
import { CodeFrame } from './components/CodeFrame';
import { SkillsRadar } from './components/SkillsRadar';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { TerminalConsole } from './components/TerminalConsole';
import { CommandPalette } from './components/CommandPalette';
import { Footer } from './components/Footer';
import { Project } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [terminalMode, setTerminalMode] = useState<'form' | 'cli'>('form');

  const handleOpenTerminal = () => {
    setTerminalMode('cli');
    const contactElem = document.querySelector('#contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreArchitecture = () => {
    const archElem = document.querySelector('#architecture');
    if (archElem) {
      archElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBenchmarks = () => {
    const benchElem = document.querySelector('#benchmarks');
    if (benchElem) {
      benchElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-[#dfe2ef] selection:bg-[#6366F1]/30 selection:text-white font-body relative">
      {/* Global Background Grid Ambient Lines */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025] z-0"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Navigation */}
      <Navbar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenTerminal={handleOpenTerminal}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero
          onExploreArchitecture={handleExploreArchitecture}
          onOpenBenchmarks={handleOpenBenchmarks}
          onOpenTerminal={handleOpenTerminal}
        />

        <ProjectsBento onSelectProject={(project) => setSelectedProject(project)} />

        <TelemetryLab />

        <CodeFrame />

        <SkillsRadar />

        <ExperienceTimeline />

        <TerminalConsole initialMode={terminalMode} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Overlays */}
      <ArchitectureModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectProject={(project) => setSelectedProject(project)}
        onOpenTerminal={handleOpenTerminal}
      />
    </div>
  );
}
