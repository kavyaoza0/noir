import React, { useState, useRef, useEffect } from 'react';
import { ASSET_MANIFEST } from '../data/assets';
import { initClipPathHeadline } from '../utils/animations';
import { soundEngine } from '../utils/sound';

export default function ScrollVideoTwo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sliderFrameRef = useRef<HTMLDivElement>(null);

  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);

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

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!sliderFrameRef.current) return;
    const rect = sliderFrameRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
  };

  const handlePointerDown = () => {
    setIsDragging(true);
    soundEngine.playClick(900);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <section
      id="cinematic-two"
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#050505] flex flex-col justify-between py-14 sm:py-20 md:py-28 px-4 sm:px-8 md:px-12 border-b border-white/5 overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[500px] bg-[#d6ff38]/[0.018] blur-[170px] pointer-events-none rounded-full" />

      {/* Top Header */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-white/50 tracking-widest pb-4 sm:pb-6 border-b border-white/10 z-10">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="text-white font-semibold">08 / THE VISUAL ESSAY</span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">INTERACTIVE DUALITY LENS</span>
        </div>
        <div className="text-right">
          <span className="text-[#d6ff38] font-bold">DRAG CURTAIN</span>
        </div>
      </div>

      {/* Main Grid: Staggered Clip-Path Headline + Interactive Curtain Split Reveal */}
      <div className="max-w-7xl mx-auto w-full my-auto py-6 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10">
        {/* Left: Reusable Staggered Clip-Path Headline */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-6">
          <span className="text-xs font-mono text-[#d6ff38] tracking-widest uppercase block">
            Visual Synthesis
          </span>

          <h2
            ref={headlineRef}
            className="text-3xl sm:text-5xl lg:text-6xl font-['Syne'] font-extrabold text-white tracking-tight uppercase leading-[0.98]"
          >
            <span className="block overflow-hidden">
              <span className="clip-headline-line block">The Visual</span>
            </span>
            <span className="block overflow-hidden">
              <span className="clip-headline-line block text-[#d6ff38]">Essay in</span>
            </span>
            <span className="block overflow-hidden">
              <span className="clip-headline-line block">Contrast</span>
            </span>
          </h2>

          <p className="text-sm sm:text-base font-['Plus_Jakarta_Sans'] text-white/75 leading-relaxed pt-1 sm:pt-2">
            An interactive comparative study between monolithic architectural void and sculpted
            human silhouette. Move your cursor across the lens to inspect the dialogue between space
            and form.
          </p>

          <div className="pt-3 sm:pt-4 border-t border-white/10 flex items-center gap-6 text-xs font-mono text-white/50">
            <div>
              <span className="text-white block font-bold text-sm">SIDE A</span>
              <span>Brutalist Monolith</span>
            </div>
            <div>
              <span className="text-[#d6ff38] block font-bold text-sm">SIDE B</span>
              <span>Human Silhouette</span>
            </div>
          </div>
        </div>

        {/* Right: Interactive Split-Lens Curtain Reveal Canvas */}
        <div className="lg:col-span-7 relative">
          <div
            ref={sliderFrameRef}
            onPointerMove={handlePointerMove}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            className="relative aspect-[4/3] sm:aspect-video lg:aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl cursor-ew-resize touch-none group"
          >
            {/* Base Layer: Side A (Architectural Monolith) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={ASSET_MANIFEST.images.architecturalStudy}
                alt="Brutalist Architecture Study"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 text-xs font-mono text-white/80 pointer-events-none">
                <span className="text-white/40 block text-[10px] uppercase">STATE A</span>
                <span className="font-semibold">Monolithic Concrete Void</span>
              </div>
            </div>

            {/* Revealing Layer: Side B (Editorial Fashion Silhouette) */}
            <div
              className="absolute inset-0 w-full h-full will-change-[clip-path]"
              style={{
                clipPath: `polygon(0% 0%, ${sliderPos}% 0%, ${sliderPos}% 100%, 0% 100%)`,
              }}
            >
              <img
                src={ASSET_MANIFEST.images.editorialFashion}
                alt="Avant-Garde Architectural Fashion"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 text-xs font-mono text-[#d6ff38] pointer-events-none">
                <span className="text-[#d6ff38]/60 block text-[10px] uppercase">STATE B</span>
                <span className="font-semibold">Sculpted Human Form</span>
              </div>
            </div>

            {/* Sliding Divider Bar & Handle */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-[#d6ff38] pointer-events-none shadow-[0_0_15px_#d6ff38]"
              style={{ left: `${sliderPos}%` }}
            >
              {/* Center Draggable Circular Knob */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-black/90 border border-[#d6ff38] flex items-center justify-center text-[#d6ff38] shadow-lg backdrop-blur-md">
                <div className="flex gap-0.5 items-center">
                  <span className="text-[10px] font-mono select-none">‹›</span>
                </div>
              </div>
            </div>

            {/* Prompt Badge */}
            <div className="absolute top-4 right-4 text-[10px] font-mono text-white/70 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 pointer-events-none">
              <span>DRAG OR HOVER TO REVEAL · {Math.round(sliderPos)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Strip */}
      <div className="max-w-7xl mx-auto w-full pt-6 border-t border-white/10 flex items-center justify-between text-xs font-['Plus_Jakarta_Sans'] text-white/40 z-10">
        <span>CURTAIN REVEAL ENGINE · NOIR / FORM</span>
        <span>EXPLORE DUALITY</span>
      </div>
    </section>
  );
}
