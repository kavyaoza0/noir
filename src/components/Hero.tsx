import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, Sparkles } from 'lucide-react';
import { ASSET_MANIFEST } from '../data/assets';

interface HeroProps {
  isLoaded: boolean;
}

export default function Hero({ isLoaded }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Split text reveal timeline
      const tl = gsap.timeline();

      tl.from('.hero-kicker', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
        .from(
          '.hero-line-inner',
          {
            yPercent: 120,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power4.out',
          },
          '-=0.5'
        )
        .from(
          '.hero-sub',
          {
            y: 30,
            opacity: 0,
            duration: 1.0,
            ease: 'power3.out',
          },
          '-=0.8'
        )
        .from(
          '.hero-visual-card',
          {
            scale: 1.15,
            opacity: 0,
            duration: 1.4,
            ease: 'expo.out',
          },
          '-=1.0'
        )
        .from(
          '.hero-meta-item',
          {
            opacity: 0,
            y: 15,
            stagger: 0.1,
            duration: 0.6,
          },
          '-=0.8'
        );

      // Subtle mouse movement parallax on desktop
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xOffset = (clientX / window.innerWidth - 0.5) * 20;
        const yOffset = (clientY / window.innerHeight - 0.5) * 20;

        if (imageRef.current) {
          gsap.to(imageRef.current, {
            x: xOffset,
            y: yOffset,
            duration: 1.2,
            ease: 'power1.out',
          });
        }
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-12 px-4 sm:px-8 md:px-12 overflow-hidden border-b border-white/5"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#d6ff38]/[0.025] blur-[140px] pointer-events-none rounded-full" />

      {/* Top Editorial Row */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-['Plus_Jakarta_Sans'] text-white/50 tracking-wider">
        <div className="hero-kicker flex items-center gap-2 flex-wrap text-[11px] sm:text-xs">
          <span>THE 2026 EDITION</span>
          <span aria-hidden="true">·</span>
          <span>HUMAN CRAFT & CODE</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#d6ff38]">NOIR / FORM</span>
        </div>
        <div className="hero-meta-item hidden md:block text-right text-[11px] sm:text-xs">
          <span>CURATED IN MILAN & TOKYO</span>
        </div>
      </div>

      {/* Main Grid: Asymmetric Typography + Floating Visual Frame */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-6 sm:py-8">
        {/* Left Column: Monumental Headline */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] leading-[0.94] font-['Syne'] font-extrabold tracking-tighter text-white uppercase"
          >
            <span className="block overflow-hidden pb-1">
              <span className="hero-line-inner block">Crafted</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="hero-line-inner block text-[#d6ff38]">By Humans,</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="hero-line-inner block">Felt in Code</span>
            </span>
          </h1>

          <p className="hero-sub mt-6 sm:mt-8 text-sm sm:text-base md:text-lg text-white/70 max-w-xl font-['Plus_Jakarta_Sans'] leading-relaxed">
            We believe digital experiences should feel handmade. Every transition, reflection,
            and keyframe is tuned with obsessive devotion—creating interactive spaces that breathe
            like living architecture.
          </p>

          <div className="hero-sub mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="#three-chamber"
              className="inline-flex items-center justify-center gap-3 px-5 sm:px-6 py-3 sm:py-3.5 bg-white text-black font-['Plus_Jakarta_Sans'] font-semibold text-xs tracking-wider uppercase hover:bg-[#d6ff38] transition-colors rounded-sm shadow-lg"
            >
              <span>Explore 3D Atelier</span>
              <Sparkles className="w-3.5 h-3.5" />
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 text-xs font-medium text-white/80 hover:text-[#d6ff38] transition-colors tracking-wider uppercase py-2 px-1"
            >
              <span>Selected Works</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* Right Column: Layered Visual Anchor */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="hero-visual-card relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[3/4] max-w-sm sm:max-w-md mx-auto rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0c] shadow-2xl group">
            <img
              ref={imageRef}
              src={ASSET_MANIFEST.images.heroSculpture}
              alt="NOIR / FORM iridescent kinetic chrome sculpture"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out"
            />
            {/* Subtle Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-white/80">
              <span>EDITION 01 — HANDMADE TOPOLOGY</span>
              <span className="text-[#d6ff38]">TACTILE SPECULAR</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Strip */}
      <div className="max-w-7xl mx-auto w-full flex items-end justify-between pt-4 sm:pt-6 border-t border-white/10 text-xs font-['Plus_Jakarta_Sans'] text-white/50">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#d6ff38] animate-pulse" />
          <span className="tracking-widest font-mono text-[10px] sm:text-[11px]">SCROLL TO ENTER ATELIER</span>
        </div>

        <a
          href="#manifesto"
          className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group py-1"
          aria-label="Scroll to manifesto"
        >
          <span className="tracking-wider uppercase text-[10px] sm:text-[11px] font-medium hidden sm:inline">Descend</span>
          <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d6ff38] group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}
