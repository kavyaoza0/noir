import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const phrase1Ref = useRef<HTMLSpanElement>(null);
  const phrase2Ref = useRef<HTMLSpanElement>(null);
  const phrase3Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Progressive hardware-accelerated scroll reveal
      const phrases = [phrase1Ref.current, phrase2Ref.current, phrase3Ref.current].filter(Boolean);

      phrases.forEach((phrase) => {
        gsap.fromTo(
          phrase,
          {
            opacity: 0.12,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: phrase,
              start: 'top 88%',
              end: 'top 48%',
              scrub: 0.6,
            },
          }
        );
      });

      // Proof statistics fade-in
      gsap.from('.manifesto-proof-card', {
        scrollTrigger: {
          trigger: '.manifesto-proof-strip',
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative min-h-[90vh] flex flex-col justify-between py-16 sm:py-24 md:py-36 px-4 sm:px-8 md:px-12 border-b border-white/5 bg-[#050505] overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#d6ff38]/[0.02] blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Editorial Subheader */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-white/50 tracking-widest pb-6 sm:pb-8 border-b border-white/10">
          <span>02 / THE MANIFESTO</span>
          <span>HUMAN TOUCH IN A DIGITAL AGE</span>
        </div>

        {/* Scroll-Revealed Typography */}
        <div className="my-14 sm:my-20 md:my-28 space-y-6 sm:space-y-8 md:space-y-10">
          <div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-['Syne'] font-bold tracking-tight text-white/90 leading-[1.12]">
              <span
                ref={phrase1Ref}
                className="inline-block transition-opacity duration-200 will-change-[opacity,transform]"
                style={{ opacity: 0.12 }}
              >
                Most software feels assembled by machines.
              </span>
            </h2>
          </div>

          <div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-['Syne'] font-bold tracking-tight text-[#d6ff38] leading-[1.12]">
              <span
                ref={phrase2Ref}
                className="inline-block transition-opacity duration-200 will-change-[opacity,transform]"
                style={{ opacity: 0.12 }}
              >
                We craft spaces that feel made by humans.
              </span>
            </h2>
          </div>

          <div>
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-['Syne'] font-medium tracking-tight text-white/70 leading-[1.15]">
              <span
                ref={phrase3Ref}
                className="inline-block transition-opacity duration-200 will-change-[opacity,transform]"
                style={{ opacity: 0.12 }}
              >
                Where every stroke has intention, friction, and poetry.
              </span>
            </h2>
          </div>
        </div>

        {/* Human Editorial Dialogue */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 pt-8 sm:pt-10 border-t border-white/10 text-white/70 text-sm sm:text-base leading-relaxed">
          <div className="md:col-span-5 font-['Plus_Jakarta_Sans'] font-medium text-white/90">
            <p>
              We believe that screens should not be flat glass barriers. When physics, light,
              and typography are calibrated with artisanal care, digital work stops feeling cold
              and starts resonating in the human nervous system.
            </p>
          </div>
          <div className="md:col-span-7 font-['Plus_Jakarta_Sans'] text-white/60 space-y-4">
            <p>
              Every interaction on this website was tuned like a mechanical watch: scroll curves
              matched to natural hand gestures, reflections that respect spatial perspective,
              and quiet pauses where imagery can breathe.
            </p>
          </div>
        </div>

        {/* Human Standards Strip */}
        <div className="manifesto-proof-strip grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-10 sm:pt-16 mt-10 sm:mt-16 border-t border-white/10">
          <div className="manifesto-proof-card space-y-1 p-3 sm:p-4 rounded-lg bg-white/[0.015]">
            <span className="block text-2xl sm:text-3xl md:text-4xl font-['Syne'] font-bold text-white tabular-nums">
              100%
            </span>
            <span className="text-[11px] sm:text-xs text-white/50 font-['Plus_Jakarta_Sans']">
              Hand-Coded Interactions
            </span>
          </div>

          <div className="manifesto-proof-card space-y-1 p-3 sm:p-4 rounded-lg bg-white/[0.015]">
            <span className="block text-2xl sm:text-3xl md:text-4xl font-['Syne'] font-bold text-white tabular-nums">
              60 FPS
            </span>
            <span className="text-[11px] sm:text-xs text-white/50 font-['Plus_Jakarta_Sans']">
              Organic Motion Easing
            </span>
          </div>

          <div className="manifesto-proof-card space-y-1 p-3 sm:p-4 rounded-lg bg-white/[0.015]">
            <span className="block text-2xl sm:text-3xl md:text-4xl font-['Syne'] font-bold text-white tabular-nums">
              6 Only
            </span>
            <span className="text-[11px] sm:text-xs text-white/50 font-['Plus_Jakarta_Sans']">
              Annual Atelier Commissions
            </span>
          </div>

          <div className="manifesto-proof-card space-y-1 p-3 sm:p-4 rounded-lg bg-white/[0.015]">
            <span className="block text-2xl sm:text-3xl md:text-4xl font-['Syne'] font-bold text-[#d6ff38] tabular-nums">
              Pure
            </span>
            <span className="text-[11px] sm:text-xs text-white/50 font-['Plus_Jakarta_Sans']">
              Editorial Conviction
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
