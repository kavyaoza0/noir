import React, { useRef, useEffect } from 'react';
import { ASSET_MANIFEST } from '../data/assets';
import { initClipPathHeadline } from '../utils/animations';

export default function ImageSequenceB() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

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

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#050505] flex flex-col justify-between py-14 sm:py-20 md:py-28 px-4 sm:px-8 md:px-12 border-b border-white/5 overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-[#d6ff38]/[0.015] blur-[150px] pointer-events-none rounded-full" />

      {/* Top Header */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-white/50 tracking-widest pb-4 sm:pb-6 border-b border-white/10 z-10">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="text-white font-semibold">09 / OPTICAL STUDY</span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">REFRACTIVE DISPERSION</span>
        </div>
        <div className="text-right">
          <span className="text-[#d6ff38] font-bold">MONOGRAPH 02</span>
        </div>
      </div>

      {/* Main Editorial Presentation (Clean, unpinned, luxury layout) */}
      <div className="max-w-7xl mx-auto w-full my-auto py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10">
        {/* Left: Staggered Clip-Path Headline & Editorial Context */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-6">
          <span className="text-xs font-mono text-[#d6ff38] tracking-widest uppercase block">
            Material Inquiry
          </span>

          <h2
            ref={headlineRef}
            className="text-3xl sm:text-5xl lg:text-6xl font-['Syne'] font-extrabold text-white tracking-tight uppercase leading-[0.98]"
          >
            <span className="block overflow-hidden">
              <span className="clip-headline-line block">Refraction of</span>
            </span>
            <span className="block overflow-hidden">
              <span className="clip-headline-line block text-[#d6ff38]">Physical</span>
            </span>
            <span className="block overflow-hidden">
              <span className="clip-headline-line block">Light</span>
            </span>
          </h2>

          <p className="text-sm sm:text-base font-['Plus_Jakarta_Sans'] text-white/75 leading-relaxed pt-1 sm:pt-2">
            Computational ray dispersion through dense optical quartz. We study the behavior
            of natural illumination as it shears through crystalline facets, translating
            real-world optics into digital spatial depth.
          </p>

          <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-6 text-xs font-mono text-white/50">
            <div>
              <span className="text-white block font-bold text-sm">λ 420–780nm</span>
              <span>Spectral Wavelength</span>
            </div>
            <div>
              <span className="text-white block font-bold text-sm">1.52 IOR</span>
              <span>Optical Refractive Index</span>
            </div>
          </div>
        </div>

        {/* Right: Layered Photographic Composition */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Photograph 1: Glass Prism Macro */}
          <div className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-[#0c0c10] shadow-2xl">
            <img
              src={ASSET_MANIFEST.images.glassPrism}
              alt="Optical Refraction Prism"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 right-5 text-xs font-mono text-white/80">
              <span className="text-[#d6ff38] block text-[10px] uppercase">FIG. 01 · MACRO QUARTZ</span>
              <span className="font-semibold">Prismatic Dispersion</span>
            </div>
          </div>

          {/* Photograph 2: Spatial Light Grid */}
          <div className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-[#0c0c10] shadow-2xl sm:translate-y-8">
            <img
              src={ASSET_MANIFEST.images.spatialGrid}
              alt="Spatial Light Grid Installation"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 right-5 text-xs font-mono text-white/80">
              <span className="text-[#d6ff38] block text-[10px] uppercase">FIG. 02 · ARCHITECTURAL SCALE</span>
              <span className="font-semibold">Volumetric Atmosphere</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Strip */}
      <div className="max-w-7xl mx-auto w-full pt-6 border-t border-white/10 flex items-center justify-between text-xs font-['Plus_Jakarta_Sans'] text-white/40 z-10">
        <span>OPTICAL ESSAY · NOIR / FORM</span>
        <span>STUDIO ARCHIVE</span>
      </div>
    </section>
  );
}
