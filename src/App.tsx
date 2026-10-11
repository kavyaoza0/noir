import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import ThreeChamber from './components/ThreeChamber';
import SpatialEditionsShowcase from './components/SpatialEditionsShowcase';
import ScrollVideoOne from './components/ScrollVideoOne';
import ImageSequenceA from './components/ImageSequenceA';
import WorkArchive from './components/WorkArchive';
import ScrollVideoTwo from './components/ScrollVideoTwo';
import ImageSequenceB from './components/ImageSequenceB';
import Capabilities from './components/Capabilities';
import FinalImageSequence from './components/FinalImageSequence';
import Closing from './components/Closing';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 1024;

    // Enable GSAP lag smoothing to eliminate micro-stutters and frame skips
    gsap.ticker.lagSmoothing(500, 33);

    if (!isTouch && !prefersReducedMotion) {
      // Desktop-only smooth momentum scrolling
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      lenis.on('scroll', ScrollTrigger.update);

      const tickerCb = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickerCb);

      return () => {
        gsap.ticker.remove(tickerCb);
        lenis.destroy();
      };
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#f5f5f7] overflow-x-hidden selection:bg-[#d6ff38] selection:text-black">
      {/* Subtle Film Grain Noise Texture */}
      <div className="film-grain fixed inset-0 pointer-events-none z-30" />

      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Intro Preloader */}
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      {/* Fixed Navigation Bar */}
      <Navbar />

      {/* Continuous Page Sections */}
      <main className="relative z-10">
        {/* Section 01: Hero */}
        <Hero isLoaded={isLoaded} />

        {/* Section 02: Manifesto */}
        <Manifesto />

        {/* Section 03: The 3D Spatial Atelier (Promoted above as requested) */}
        <ThreeChamber />

        {/* Section 04: The 3D Spatial Editions Showcase (Inspired by Shopify Editions) */}
        <SpatialEditionsShowcase />

        {/* Section 05: Scroll-Driven Video Experience A */}
        <ScrollVideoOne />

        {/* Section 06: Scroll-Driven Image Transformation A */}
        <ImageSequenceA />

        {/* Section 07: Experimental Work Archive */}
        <WorkArchive />

        {/* Section 08: Scroll-Driven Video Sequence B */}
        <ScrollVideoTwo />

        {/* Section 09: Editorial Image Storytelling B */}
        <ImageSequenceB />

        {/* Section 10: Studio Disciplines & Capabilities */}
        <Capabilities />

        {/* Section 11: Final Monolithic Image Panorama */}
        <FinalImageSequence />

        {/* Section 12: Closing Experience & Colophon */}
        <Closing />
      </main>
    </div>
  );
}
