import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowUpRight, Layers, Compass, Cpu } from 'lucide-react';
import { soundEngine } from '../utils/sound';
import { initClipPathHeadline } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

export default function EditionsWinterShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = cardsRef.current?.querySelectorAll('.edition-feature-card');
    if (cards) {
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    if (headlineRef.current) {
      const lines = headlineRef.current.querySelectorAll('.clip-headline-line');
      initClipPathHeadline(lines as unknown as HTMLElement, {
        trigger: containerRef.current || undefined,
        stagger: 0.1,
        duration: 1.1,
      });
    }
  }, []);

  return (
    <section
      id="editions-winter"
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#050505] py-24 px-6 md:px-12 flex flex-col justify-between border-b border-white/5 select-none overflow-hidden"
    >
      {/* Top Editorial Bar */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono text-white/50 tracking-widest pb-6 border-b border-white/10 z-20">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">05 / WINTER EDITIONS INSPIRATION</span>
          <span aria-hidden="true">·</span>
          <span>HUMAN CRAFT & FRICTION</span>
        </div>
        <div>
          <span className="text-[#d6ff38] font-bold">EDITION 2026 ARCHITECTURE</span>
        </div>
      </div>

      {/* Main Content Stage */}
      <div className="max-w-7xl mx-auto w-full my-auto py-12 space-y-16 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#d6ff38]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Shopify Editions Winter 2026 Aesthetic</span>
            </div>
            <h2
              ref={headlineRef}
              className="text-4xl sm:text-6xl font-['Syne'] font-extrabold text-white tracking-tight uppercase leading-[0.95]"
            >
              <span className="block overflow-hidden">
                <span className="clip-headline-line block">Crafted</span>
              </span>
              <span className="block overflow-hidden">
                <span className="clip-headline-line block text-[#d6ff38]">By Human</span>
              </span>
              <span className="block overflow-hidden">
                <span className="clip-headline-line block">Hands</span>
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base sm:text-lg font-['Plus_Jakarta_Sans'] text-white/80 leading-relaxed">
              When the most assorted physics assembled on machines, we craft spaces that feel made by humans.
              Every stroke carries intentional friction, where digital curves breathe with organic weight and tactile warmth.
            </p>
          </div>
        </div>

        {/* Immersive Feature Cards Grid (Inspired by Shopify Editions) */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div
            onMouseEnter={() => soundEngine.playClick(1000)}
            className="edition-feature-card group relative p-8 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-[#d6ff38]/50 transition-all duration-500 overflow-hidden flex flex-col justify-between h-[360px]"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#d6ff38]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#d6ff38]">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-[#d6ff38] tracking-widest uppercase block">
                01 / Topology
              </span>
              <h3 className="text-2xl font-['Syne'] font-bold text-white group-hover:text-[#d6ff38] transition-colors">
                Harmonic Mass
              </h3>
              <p className="text-sm font-['Plus_Jakarta_Sans'] text-white/70 leading-relaxed">
                Surfaces that respond dynamically to scroll momentum and touch physics with absolute fidelity.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50 relative z-10">
              <span>FLUID SIMULATION</span>
              <ArrowUpRight className="w-4 h-4 text-[#d6ff38] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Card 2 */}
          <div
            onMouseEnter={() => soundEngine.playClick(1000)}
            className="edition-feature-card group relative p-8 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-[#d6ff38]/50 transition-all duration-500 overflow-hidden flex flex-col justify-between h-[360px]"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#d6ff38]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#d6ff38]">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-[#d6ff38] tracking-widest uppercase block">
                02 / Spatial Pacing
              </span>
              <h3 className="text-2xl font-['Syne'] font-bold text-white group-hover:text-[#d6ff38] transition-colors">
                Intentional Friction
              </h3>
              <p className="text-sm font-['Plus_Jakarta_Sans'] text-white/70 leading-relaxed">
                Deliberate resistance built into every interaction so users feel grounded in physical reality.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50 relative z-10">
              <span>TACTILE PRESENCE</span>
              <ArrowUpRight className="w-4 h-4 text-[#d6ff38] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Card 3 */}
          <div
            onMouseEnter={() => soundEngine.playClick(1000)}
            className="edition-feature-card group relative p-8 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-[#d6ff38]/50 transition-all duration-500 overflow-hidden flex flex-col justify-between h-[360px]"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#d6ff38]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#d6ff38]">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-[#d6ff38] tracking-widest uppercase block">
                03 / Architecture
              </span>
              <h3 className="text-2xl font-['Syne'] font-bold text-white group-hover:text-[#d6ff38] transition-colors">
                Human Precision
              </h3>
              <p className="text-sm font-['Plus_Jakarta_Sans'] text-white/70 leading-relaxed">
                Clean code and buttery smooth execution marrying avant-garde typography with WebGL power.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50 relative z-10">
              <span>60 FPS KINETIC</span>
              <ArrowUpRight className="w-4 h-4 text-[#d6ff38] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Bar */}
      <div className="max-w-7xl mx-auto w-full pt-6 border-t border-white/10 flex items-center justify-between text-xs font-['Plus_Jakarta_Sans'] text-white/40 z-20">
        <span>WINTER EDITIONS INSPIRATION · NOIR / FORM</span>
        <span>HUMAN CENTERED DIGITAL CRAFT</span>
      </div>
    </section>
  );
}
