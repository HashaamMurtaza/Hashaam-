import React, { useState, useEffect } from 'react';
import { Command, Menu, X, ArrowUpRight, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette, onOpenTerminal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#overview' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Systems Matrix', href: '#matrix' },
    { name: 'Live Benchmarks', href: '#benchmarks' },
    { name: 'Experience', href: '#experience' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#090D16]/85 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/40'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Brand title, single element */}
        <a
          href="#overview"
          className="flex items-center gap-2.5 text-lg font-display font-bold tracking-tight text-white hover:text-[#c0c1ff] transition-colors shrink-0"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#6366F1] shadow-[0_0_10px_#6366F1]" />
          <span>{PERSONAL_INFO.name}</span>
          <span className="hidden sm:inline text-xs font-mono font-normal text-[#908fa0] ml-1">
            / Staff Systems
          </span>
        </a>

        {/* Zone 2: 4-6 text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#94A3B8]">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              className="hover:text-white transition-colors hover:underline hover:underline-offset-8 decoration-[#6366F1]/70 cursor-pointer whitespace-nowrap"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Command Palette button */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono text-[#94A3B8] bg-white/[0.03] border border-white/[0.08] hover:border-[#6366F1]/50 hover:text-white transition-all cursor-pointer whitespace-nowrap shadow-sm"
            title="Open Command Palette (Cmd+K)"
          >
            <Command className="w-3.5 h-3.5 text-[#6366F1]" />
            <span className="hidden lg:inline">Palette</span>
            <kbd className="px-1.5 py-0.5 text-[10px] bg-white/[0.06] rounded border border-white/[0.1] text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Quick Terminal Launcher */}
          <button
            onClick={onOpenTerminal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono text-[#4cd7f6] bg-[#06B6D4]/10 border border-[#06B6D4]/30 hover:bg-[#06B6D4]/20 transition-all cursor-pointer whitespace-nowrap"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal</span>
          </button>

          {/* Primary CTA */}
          <a
            href="#contact"
            className="btn-primary flex items-center gap-1.5 px-4 py-2 rounded text-xs font-semibold whitespace-nowrap cursor-pointer"
          >
            <span>Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#94A3B8] hover:text-white rounded focus:outline-none cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090D16]/98 border-b border-white/[0.08] px-4 pt-3 pb-5 space-y-2 backdrop-blur-xl">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              className="block w-full text-left px-3 py-2 text-sm text-[#dfe2ef] hover:bg-white/[0.05] rounded font-medium"
            >
              {link.name}
            </button>
          ))}
          <div className="pt-2 border-t border-white/[0.08] flex items-center gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="flex-1 py-2 text-xs font-mono text-center text-[#4cd7f6] bg-[#06B6D4]/10 rounded border border-[#06B6D4]/30"
            >
              Launch Terminal
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommandPalette();
              }}
              className="flex-1 py-2 text-xs font-mono text-center text-slate-300 bg-white/[0.05] rounded border border-white/[0.1]"
            >
              Command Palette ⌘K
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
