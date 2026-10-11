import React, { useState, useRef, useEffect } from 'react';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { CAPABILITIES_DATA } from '../data/assets';
import { soundEngine } from '../utils/sound';
import { initClipPathHeadline } from '../utils/animations';

export default function Capabilities() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [activeItem, setActiveItem] = useState<number | null>(0);

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

  const toggleItem = (index: number) => {
    soundEngine.playClick(activeItem === index ? 400 : 700);
    setActiveItem(activeItem === index ? null : index);
  };

  return (
    <section
      id="capabilities"
      ref={containerRef}
      className="relative min-h-[90vh] py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-12 bg-[#050505] border-b border-white/5 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-[#d6ff38]/[0.015] blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-white/50 tracking-widest pb-6 sm:pb-8 border-b border-white/10">
          <span>10 / STUDIO DISCIPLINES</span>
          <span>CAPABILITIES & ARCHITECTURE</span>
        </div>

        {/* Lead Editorial Typography */}
        <div className="my-12 sm:my-16 md:my-20 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
          <div className="lg:col-span-7">
            <h2
              ref={headlineRef}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-['Syne'] font-extrabold text-white tracking-tight uppercase leading-[0.98]"
            >
              <span className="block overflow-hidden pb-1">
                <span className="clip-headline-line block">Methodology</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="clip-headline-line block text-[#d6ff38]">As An</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="clip-headline-line block">Art Form</span>
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 text-sm sm:text-base md:text-lg font-['Plus_Jakarta_Sans'] text-white/70 leading-relaxed space-y-4 lg:pt-2">
            <p>
              We operate without assembly lines or off-the-shelf templates. Every project begins with
              pure mathematical inquiry: What physics govern this brand? What emotions should the
              observer experience when interacting with each pixel?
            </p>
          </div>
        </div>

        {/* Editorial Accordion List */}
        <div className="border-t border-white/15 divide-y divide-white/10">
          {CAPABILITIES_DATA.map((cap, index) => {
            const isOpen = activeItem === index;

            return (
              <div
                key={cap.number}
                className="group py-6 sm:py-8 md:py-10 transition-colors duration-300"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between text-left cursor-pointer focus:outline-none gap-4"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-baseline gap-4 sm:gap-8 md:gap-12 min-w-0">
                    <span className="text-xs sm:text-sm font-mono text-[#d6ff38] font-bold shrink-0">
                      {cap.number}
                    </span>
                    <h3 className="text-xl sm:text-3xl md:text-4xl font-['Syne'] font-bold text-white group-hover:text-[#d6ff38] transition-colors tracking-tight leading-tight truncate sm:whitespace-normal">
                      {cap.title}
                    </h3>
                  </div>

                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 group-hover:border-[#d6ff38] group-hover:text-[#d6ff38] transition-colors shrink-0 bg-white/[0.02]">
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    )}
                  </div>
                </button>

                {/* Expandable Content Area */}
                {isOpen && (
                  <div className="pt-4 sm:pt-6 pl-8 sm:pl-14 md:pl-20 pr-2 sm:pr-4 grid grid-cols-1 md:grid-cols-12 gap-6 animate-fade-in">
                    <div className="md:col-span-8">
                      <p className="text-sm sm:text-base font-['Plus_Jakarta_Sans'] text-white/80 leading-relaxed">
                        {cap.description}
                      </p>
                    </div>

                    <div className="md:col-span-4 flex flex-wrap gap-2 text-xs font-mono text-white/60 items-start">
                      {cap.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 hover:border-[#d6ff38]/40 hover:text-white transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Studio Tenets / Principles Strip */}
        <div className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
            <span className="text-[10px] font-mono text-[#d6ff38] uppercase tracking-widest block">
              PRINCIPLE 01
            </span>
            <h4 className="font-['Syne'] font-bold text-white uppercase text-lg sm:text-xl">
              Performance Rigor
            </h4>
            <p className="text-xs sm:text-sm font-['Plus_Jakarta_Sans'] text-white/60 leading-relaxed">
              Every animation runs on compositor-isolated GPU threads. Zero layout thrashing,
              60fps continuous render loops with adaptive device throttling.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
            <span className="text-[10px] font-mono text-[#d6ff38] uppercase tracking-widest block">
              PRINCIPLE 02
            </span>
            <h4 className="font-['Syne'] font-bold text-white uppercase text-lg sm:text-xl">
              Sound Integration
            </h4>
            <p className="text-xs sm:text-sm font-['Plus_Jakarta_Sans'] text-white/60 leading-relaxed">
              Real-time Web Audio API frequency synthesis that turns sterile digital interactions
              into tactile, acoustic physical feedback.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-3 sm:col-span-2 lg:col-span-1">
            <span className="text-[10px] font-mono text-[#d6ff38] uppercase tracking-widest block">
              PRINCIPLE 03
            </span>
            <h4 className="font-['Syne'] font-bold text-white uppercase text-lg sm:text-xl">
              Bespoke Art Direction
            </h4>
            <p className="text-xs sm:text-sm font-['Plus_Jakarta_Sans'] text-white/60 leading-relaxed">
              From Leica 35mm optical grading to customized GLSL shader matrices, we produce
              original creative property built to outlast trends.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
