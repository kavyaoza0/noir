import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASSET_MANIFEST } from '../data/assets';
import { initClipPathHeadline } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollVideoOne() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);

  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);

  const videoAsset = ASSET_MANIFEST.videos.sequenceOne;

  const chapters = [
    {
      roman: 'I',
      title: 'THE DARK VOID',
      subtitle: 'Atmospheric silence',
      desc: 'Silence before illumination. Darkness establishes the spatial envelope before photons activate the void.',
    },
    {
      roman: 'II',
      title: 'KINETIC FREQUENCY',
      subtitle: 'Waveforms in perspective',
      desc: 'The matrix pulses into life. Luminescent ribbons undulate through space as your scroll drives the camera forward.',
    },
    {
      roman: 'III',
      title: 'HARMONIC EQUILIBRIUM',
      subtitle: 'Pure spatial presence',
      desc: 'Light, geometry, and human pacing settle into a serene, meditative ambient field.',
    },
  ];

  // Initialize headline animation
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

  // Video preload and preparation
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.pause();
    video.load();

    const handleSeeked = () => {
      isSeekingRef.current = false;
    };
    video.addEventListener('seeked', handleSeeked);

    return () => {
      video.removeEventListener('seeked', handleSeeked);
    };
  }, []);

  // High-performance smooth seek loop (intra-frame MP4 responds instantaneously)
  useEffect(() => {
    const video = videoRef.current;
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const updateLoop = () => {
      if (isVisible) {
        // Lerp progress for organic smoothness
        currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.35;
        const progress = currentProgressRef.current;
        setScrollProgress(progress);

        // Update chapter index
        if (progress < 0.35) {
          setActiveChapter(0);
        } else if (progress < 0.7) {
          setActiveChapter(1);
        } else {
          setActiveChapter(2);
        }

        // Frame seek
        if (video && video.duration && !isNaN(video.duration)) {
          const dur = video.duration || 10.0;
          const targetTime = Math.min(Math.max(progress * dur, 0), dur - 0.04);
          const diff = Math.abs(video.currentTime - targetTime);

          if (diff > 0.02 && !isSeekingRef.current) {
            isSeekingRef.current = true;
            video.currentTime = targetTime;
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(updateLoop);
    };

    rafIdRef.current = requestAnimationFrame(updateLoop);
    return () => {
      observer.disconnect();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // GSAP ScrollTrigger Pinned Controller
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=180%', // 1.8 viewports of smooth pinned scroll
        pin: true,
        anticipatePin: 1,
        scrub: 0.4,
        onUpdate: (self) => {
          targetProgressRef.current = self.progress;

          // Subtle frame expansion (Shopify Editions signature styling)
          if (videoWrapperRef.current) {
            const p = self.progress;
            const scale = 0.90 + Math.min(p * 1.5, 0.10);
            const radius = Math.max(28 - p * 40, 12);
            videoWrapperRef.current.style.transform = `scale(${scale})`;
            videoWrapperRef.current.style.borderRadius = `${radius}px`;
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cinematic-one"
      ref={containerRef}
      className="relative w-full h-screen bg-[#050505] overflow-hidden select-none border-b border-white/5 flex flex-col justify-between py-6 sm:py-10 px-4 sm:px-8 md:px-12"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-[#d6ff38]/[0.02] blur-[180px] pointer-events-none rounded-full" />

      {/* Top Editorial Header */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono text-white/50 tracking-widest pb-3 sm:pb-4 border-b border-white/10 z-20">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="text-white font-semibold">05 / THE CINEMATIC FILM REEL</span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">SCROLL-CONTROLLED PROJECTION</span>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <span className="hidden md:inline text-white/40">{chapters[activeChapter].title}</span>
          <span className="text-[#d6ff38] font-bold tabular-nums">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      </div>

      {/* Main Stage: Inset Scaling Frame with Direct Video Scrubbing */}
      <div className="relative w-full h-[54vh] sm:h-[66vh] md:h-[74vh] max-w-6xl mx-auto my-auto flex items-center justify-center z-10">
        <div
          ref={videoWrapperRef}
          className="relative w-full h-full overflow-hidden border border-white/15 bg-black shadow-2xl transition-transform duration-75 ease-out"
          style={{ transform: 'scale(0.90)', borderRadius: '24px' }}
        >
          {/* Instant 1:1 Keyframe Video */}
          <video
            ref={videoRef}
            src={videoAsset.src}
            poster={videoAsset.poster}
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover opacity-90"
          />

          {/* Luxury Cinematic Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/35 pointer-events-none" />

          {/* Dynamic Editorial Typography Overlaid on the Video */}
          <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 pointer-events-none">
            <div className="max-w-xl space-y-1.5 sm:space-y-2">
              <span className="text-[10px] sm:text-xs font-mono text-[#d6ff38] tracking-widest uppercase block">
                Chapter {chapters[activeChapter].roman} · {chapters[activeChapter].subtitle}
              </span>
              <h3
                ref={headlineRef}
                className="text-2xl sm:text-4xl md:text-5xl font-['Syne'] font-extrabold text-white tracking-tight uppercase leading-[0.98]"
              >
                <span className="block overflow-hidden">
                  <span className="clip-headline-line block">
                    {chapters[activeChapter].title}
                  </span>
                </span>
              </h3>
              <p className="text-[11px] sm:text-xs md:text-sm font-['Plus_Jakarta_Sans'] text-white/75 max-w-md pt-0.5 sm:pt-1 leading-relaxed line-clamp-2 sm:line-clamp-none">
                {chapters[activeChapter].desc}
              </p>
            </div>

            {/* Chapter Steppers */}
            <div className="hidden sm:flex items-center gap-4 md:gap-6 text-xs font-mono shrink-0">
              {chapters.map((ch, idx) => (
                <div
                  key={ch.roman}
                  className={`flex items-center gap-2 transition-colors ${
                    activeChapter === idx ? 'text-white font-bold' : 'text-white/30'
                  }`}
                >
                  <span className="text-[#d6ff38]">{ch.roman}</span>
                  <span className="hidden md:inline">{ch.title.split(' ')[1] || ch.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Minimal Timeline Scrub Indicator */}
      <div className="max-w-7xl mx-auto w-full pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40 z-20">
        <span>SCROLL TO ADVANCE FILM · REVERSE TO REWIND</span>
        <div className="flex items-center gap-4">
          <span>PROGRESS</span>
          <div className="w-36 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#d6ff38] transition-all duration-75"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
          <span className="text-white font-bold tabular-nums min-w-[3ch]">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      </div>
    </section>
  );
}
