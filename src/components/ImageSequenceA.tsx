import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASSET_MANIFEST } from '../data/assets';

gsap.registerPlugin(ScrollTrigger);

export default function ImageSequenceA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLImageElement>(null);
  const image2Ref = useRef<HTMLImageElement>(null);
  const textOneRef = useRef<HTMLDivElement>(null);
  const textTwoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=180%',
          pin: true,
          anticipatePin: 1,
          scrub: 0.6,
        },
      });

      // State 1 to State 2: Image expands from small bordered frame to full bleed
      tl.to(imageFrameRef.current, {
        width: '100vw',
        height: '100vh',
        borderRadius: '0px',
        borderWidth: '0px',
        ease: 'power2.inOut',
      })
        // Text 1 fades out while floating upward
        .to(
          textOneRef.current,
          {
            opacity: 0,
            y: -80,
            ease: 'power1.out',
          },
          0
        )
        // Image 1 scales and zooms
        .to(
          image1Ref.current,
          {
            scale: 1.25,
            ease: 'none',
          },
          0
        )
        // Image 2 crossfades through a clip-path polygon diagonal wipe
        .fromTo(
          image2Ref.current,
          {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
            opacity: 0.8,
          },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            opacity: 1,
            ease: 'power2.inOut',
          },
          0.4
        )
        // Text 2 reveals smoothly
        .fromTo(
          textTwoRef.current,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
          },
          0.6
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#050505] flex items-center justify-center overflow-hidden border-b border-white/5"
    >
      {/* Background ambient texture */}
      <div className="absolute inset-0 bg-[#050505] pointer-events-none" />

      {/* Header */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8 md:left-12 right-4 sm:right-8 md:right-12 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono text-white/50 tracking-widest pointer-events-none">
        <span>06 / ARCHITECTURAL STUDY</span>
        <span>THE UNFOLDING FORM</span>
      </div>

      {/* Floating State 1 Editorial Text */}
      <div
        ref={textOneRef}
        className="absolute z-10 text-center max-w-xl px-4 sm:px-6 pointer-events-none"
      >
        <span className="text-[10px] sm:text-xs font-mono text-[#d6ff38] tracking-widest block mb-1.5 sm:mb-2">
          STATE 01 · THE ENCLOSURE
        </span>
        <h3 className="text-2xl sm:text-4xl md:text-5xl font-['Syne'] font-bold text-white tracking-tight uppercase leading-tight">
          Bounded within structured geometry
        </h3>
        <p className="mt-2 sm:mt-3 text-[11px] sm:text-xs md:text-sm font-['Plus_Jakarta_Sans'] text-white/60">
          Scroll to trigger viewport dilation and polygonal optical transition
        </p>
      </div>

      {/* Expanding Image Frame Container */}
      <div
        ref={imageFrameRef}
        className="relative w-[92vw] sm:w-[85vw] md:w-[65vw] h-[50vh] sm:h-[58vh] md:h-[65vh] rounded-2xl overflow-hidden border border-white/15 shadow-2xl transition-[border-radius] duration-300"
      >
        {/* Layer 1: Editorial Brutalist Fashion */}
        <img
          ref={image1Ref}
          src={ASSET_MANIFEST.images.editorialFashion}
          alt="Avant-Garde Architectural Fashion"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Layer 2: Concrete Gallery Architecture with Diagonal Beam */}
        <img
          ref={image2Ref}
          src={ASSET_MANIFEST.images.architecturalStudy}
          alt="Brutalist Concrete Monolith Architecture"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' }}
        />

        {/* Ambient Dark Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none" />

        {/* State 2 Editorial Text Revealed on Full Screen */}
        <div
          ref={textTwoRef}
          className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-10 md:p-16 max-w-4xl pointer-events-none opacity-0"
        >
          <span className="text-[10px] sm:text-xs font-mono text-[#d6ff38] tracking-widest mb-1.5 sm:mb-2 block">
            STATE 02 · FULL DILATION
          </span>
          <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-['Syne'] font-bold text-white tracking-tight uppercase leading-none">
            Architectural Light Infiltration
          </h3>
          <p className="mt-2 sm:mt-4 text-xs sm:text-sm md:text-base font-['Plus_Jakarta_Sans'] text-white/80 max-w-xl">
            Sunlight as an incision. Matter, mass, and raw unpolished concrete responding to the
            observer’s descent through virtual depth.
          </p>
        </div>
      </div>
    </section>
  );
}
