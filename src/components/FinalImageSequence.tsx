import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASSET_MANIFEST } from '../data/assets';

gsap.registerPlugin(ScrollTrigger);

export default function FinalImageSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          anticipatePin: 1,
          scrub: 0.6,
        },
      });

      tl.fromTo(
        visualRef.current,
        {
          scale: 0.82,
          borderRadius: '24px',
        },
        {
          scale: 1,
          borderRadius: '0px',
          ease: 'power2.out',
        }
      ).fromTo(
        captionRef.current,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
        },
        0.3
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#050505] flex items-center justify-center overflow-hidden border-b border-white/5"
    >
      {/* Header */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8 md:left-12 right-4 sm:right-8 md:right-12 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono text-white/50 tracking-widest pointer-events-none">
        <span>10 / MONOLITHIC PANORAMA</span>
        <span>OPTICAL DILATION</span>
      </div>

      {/* Center Image Frame that scales to full screen */}
      <div
        ref={visualRef}
        className="relative w-[92vw] sm:w-[90vw] h-[60vh] sm:h-[70vh] overflow-hidden border border-white/10 shadow-2xl transition-[border-radius] duration-200"
      >
        <img
          src={ASSET_MANIFEST.images.heroSculpture}
          alt="Monolithic Chromium Sculpture"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover scale-105"
        />

        {/* Ambient Dark Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30 pointer-events-none" />

        {/* Pinned Editorial Caption */}
        <div
          ref={captionRef}
          className="absolute bottom-6 sm:bottom-10 left-4 sm:left-8 md:left-16 right-4 sm:right-8 md:right-16 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6"
        >
          <div className="max-w-xl">
            <span className="text-[10px] sm:text-xs font-mono text-[#d6ff38] tracking-widest uppercase block mb-1.5 sm:mb-2">
              CLIMAX · ZERO GRAVITY
            </span>
            <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-['Syne'] font-extrabold text-white uppercase tracking-tight leading-none">
              The Architecture of Pure Memory
            </h3>
          </div>

          <div className="text-[11px] sm:text-xs font-['Plus_Jakarta_Sans'] text-white/70 max-w-sm">
            <p>
              When digital work achieves tactile resonance, it stays etched into consciousness.
              We build artifacts meant to outlive temporary trend cycles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
