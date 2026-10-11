import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Send, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../utils/sound';
import { initClipPathHeadline } from '../utils/animations';

export default function Closing() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [localTime, setLocalTime] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    scope: 'Interactive Web & WebGL',
    message: '',
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Europe/Rome',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (headlineRef.current) {
      const lines = headlineRef.current.querySelectorAll('.clip-headline-line');
      initClipPathHeadline(lines as unknown as HTMLElement, {
        trigger: containerRef.current || undefined,
        stagger: 0.12,
        duration: 1.2,
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    soundEngine.playClick(950);
    setFormSubmitted(true);
  };

  const handleScrollToTop = () => {
    soundEngine.playClick(600);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      ref={containerRef}
      className="relative min-h-screen bg-[#050505] flex flex-col justify-between pt-16 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-8 md:px-12 text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-white/50 tracking-widest pb-6 sm:pb-8 border-b border-white/10">
          <span>11 / INITIATE DIALOGUE</span>
          <span>COMMISSIONS & COLLABORATIONS</span>
        </div>

        {/* Main Split: Monumental Wordmark CTA + Commission Inquiry Form */}
        <div className="my-12 sm:my-16 md:my-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Huge Closing Statement */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <h2
              ref={headlineRef}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-['Syne'] font-extrabold text-white tracking-tighter uppercase leading-[0.92]"
            >
              <span className="block overflow-hidden pb-1">
                <span className="clip-headline-line block">Let us build</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="clip-headline-line block text-[#d6ff38]">the future</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="clip-headline-line block">together.</span>
              </span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg font-['Plus_Jakarta_Sans'] text-white/70 max-w-lg leading-relaxed">
              We partner with selected brands, cultural institutions, and ambitious studios worldwide.
              Our production calendar accepts 6 major commissions annually to preserve obsessive quality.
            </p>

            <div className="pt-6 space-y-3 text-xs font-mono text-white/50">
              <div className="flex items-center gap-4">
                <span className="text-white/30">STUDIO HEADQUARTERS</span>
                <span className="text-white/80">VIA TORTONA 32, MILAN</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-white/30">CURRENT LOCAL TIME</span>
                <span className="text-[#d6ff38] font-bold tabular-nums">
                  {localTime || '14:24:00'} CET
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-white/30">DIRECT INQUIRIES</span>
                <a
                  href="mailto:contact@noirform.studio"
                  className="text-white hover:text-[#d6ff38] transition-colors underline"
                >
                  contact@noirform.studio
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Commission Form */}
          <div className="lg:col-span-6 bg-[#0a0a0d] border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl">
            {formSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#d6ff38]/10 border border-[#d6ff38] flex items-center justify-center mx-auto text-[#d6ff38]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-['Syne'] font-bold text-white uppercase">
                  Dossier Received
                </h3>
                <p className="text-sm font-['Plus_Jakarta_Sans'] text-white/70 max-w-md mx-auto">
                  Thank you, {formData.name}. Our creative director will review your brief within 24
                  hours and provide initial spatial insights.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 px-5 py-2 text-xs font-mono text-white/60 hover:text-white border border-white/20 rounded transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-xl font-['Syne'] font-bold text-white uppercase tracking-tight">
                    Commission Request
                  </h3>
                  <span className="text-xs font-mono text-[#d6ff38]">2026/27 AVAILABILITY</span>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono text-white/60 tracking-wider">
                    NAME / PRINCIPAL
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#121217] border border-white/10 rounded-md text-white text-sm focus:outline-none focus:border-[#d6ff38] transition-colors placeholder:text-white/25"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono text-white/60 tracking-wider">
                    ORGANIZATION & EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. elena@vance.design"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#121217] border border-white/10 rounded-md text-white text-sm focus:outline-none focus:border-[#d6ff38] transition-colors placeholder:text-white/25"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono text-white/60 tracking-wider">
                    ENGAGEMENT SCOPE
                  </label>
                  <select
                    value={formData.scope}
                    onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                    className="w-full px-4 py-3 bg-[#121217] border border-white/10 rounded-md text-white text-sm focus:outline-none focus:border-[#d6ff38] transition-colors"
                  >
                    <option value="Interactive Web & WebGL">Interactive Web & WebGL Experience</option>
                    <option value="Cinematic Direction & Film">Cinematic Art Direction & Film</option>
                    <option value="3D Spatial Installation">3D Spatial & Generative Installation</option>
                    <option value="Complete Brand Identity">Full Experimental Brand Architecture</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono text-white/60 tracking-wider">
                    PROJECT VISION & TIMELINE
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your goals, aesthetic expectations, and target launch window..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-[#121217] border border-white/10 rounded-md text-white text-sm focus:outline-none focus:border-[#d6ff38] transition-colors placeholder:text-white/25 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#d6ff38] hover:bg-white text-black font-['Plus_Jakarta_Sans'] font-bold text-xs uppercase tracking-widest rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#d6ff38]/10"
                >
                  <span>Submit Commission Dossier</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Monumental Wordmark Footer */}
        <div className="pt-16 pb-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-baseline justify-between gap-6 mb-8">
            <span className="text-6xl sm:text-8xl md:text-[10rem] lg:text-[13rem] font-['Syne'] font-extrabold text-white/95 leading-none tracking-tighter select-none">
              NOIR<span className="text-[#d6ff38]">/</span>FORM
            </span>

            <button
              onClick={handleScrollToTop}
              className="group flex items-center gap-2 text-xs font-mono text-white/60 hover:text-[#d6ff38] transition-colors cursor-pointer py-2"
            >
              <span>BACK TO SUMMIT</span>
              <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Colophon & Copyright */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-['Plus_Jakarta_Sans'] text-white/40 pt-6 border-t border-white/5">
            <div>
              <span>© {new Date().getFullYear()} NOIR / FORM Studio Inc. All rights reserved.</span>
            </div>

            <div className="flex items-center gap-6">
              <a href="#manifesto" className="hover:text-white transition-colors">
                Manifesto
              </a>
              <a href="#work" className="hover:text-white transition-colors">
                Archives
              </a>
              <a href="#capabilities" className="hover:text-white transition-colors">
                Disciplines
              </a>
              <a href="#contact" className="hover:text-white transition-colors">
                Dialogue
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
