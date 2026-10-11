import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { soundEngine } from '../utils/sound';

interface NavbarProps {
  onSoundChange?: (enabled: boolean) => void;
}

export default function Navbar({ onSoundChange }: NavbarProps) {
  const [audioActive, setAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const newState = soundEngine.toggle();
    setAudioActive(newState);
    onSoundChange?.(newState);
    if (newState) {
      soundEngine.playClick(900);
    }
  };

  const navLinks = [
    { label: 'Manifesto', href: '#manifesto' },
    { label: 'Liquid Chrome', href: '#three-chamber' },
    { label: 'Harmonic Inertia', href: '#editions-showcase' },
    { label: 'Kinetic Reel', href: '#cinematic-one' },
    { label: 'Selected Works', href: '#work' },
    { label: 'Disciplines', href: '#capabilities' },
  ];

  const handleNavClick = (href: string) => {
    soundEngine.playClick(600);
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#050505]/85 backdrop-blur-md border-b border-white/5 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-lg md:text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 font-['Syne'] hover:text-[#d6ff38] transition-colors"
          >
            NOIR / FORM
          </a>

          {/* Zone 2: Concise single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-medium text-white/70 tracking-wide font-['Plus_Jakarta_Sans']">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#d6ff38] hover:after:w-full after:transition-all after:duration-200 cursor-pointer whitespace-nowrap shrink-0"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Functional controls & primary action */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Audio State Toggle */}
            <button
              onClick={handleToggleSound}
              aria-label={audioActive ? 'Mute ambient soundscape' : 'Enable ambient soundscape'}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-white/80 hover:text-white border border-white/10 hover:border-white/30 rounded-md transition-colors bg-white/[0.02]"
              title={audioActive ? 'Audio ON' : 'Audio OFF'}
            >
              {audioActive ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#d6ff38]" />
                  <span className="hidden sm:inline font-mono text-[10px] text-[#d6ff38]">SOUND ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-white/50" />
                  <span className="hidden sm:inline font-mono text-[10px] text-white/50">SOUND OFF</span>
                </>
              )}
            </button>

            {/* Primary Action Button */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-black bg-[#d6ff38] hover:bg-white rounded-md transition-colors whitespace-nowrap shrink-0 tracking-wide"
            >
              Commission Studio
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#050505]/95 backdrop-blur-xl lg:hidden flex flex-col justify-center px-8 pt-20">
          <nav className="flex flex-col gap-6 text-xl font-['Syne'] text-white">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left py-2 border-b border-white/10 hover:text-[#d6ff38] transition-colors"
              >
                {link.label}
              </button>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="mt-4 inline-block text-center px-6 py-3 text-sm font-semibold text-black bg-[#d6ff38] rounded-md"
            >
              Commission Studio
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
