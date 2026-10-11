import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 12) + 6;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);

        // Animate preloader exit
        const tl = gsap.timeline({
          onComplete: () => {
            onComplete();
          },
        });

        tl.to('.preloader-content', {
          y: -40,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.inOut',
        })
          .to('.preloader-panel', {
            yPercent: -100,
            duration: 0.8,
            stagger: 0.08,
            ease: 'expo.inOut',
          });
      } else {
        setProgress(current);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-between">
      {/* Shutter curtains */}
      <div className="absolute inset-0 flex flex-col">
        <div className="preloader-panel flex-1 bg-[#050505] border-b border-white/5" />
        <div className="preloader-panel flex-1 bg-[#050505]" />
      </div>

      <div className="preloader-content relative z-10 w-full h-full flex flex-col justify-between p-8 md:p-14 text-white">
        <div className="flex justify-between items-center text-xs font-mono tracking-widest text-white/50">
          <span>NOIR / FORM</span>
          <span>STUDIO SYSTEM</span>
        </div>

        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 mb-6 border border-white/20 rounded-full flex items-center justify-center relative">
            <div className="w-2 h-2 bg-[#d6ff38] rounded-full animate-ping" />
            <div className="w-2 h-2 bg-[#d6ff38] rounded-full absolute" />
          </div>
          <h1 className="text-4xl md:text-6xl font-['Syne'] font-bold tracking-tighter text-white">
            NOIR <span className="text-[#d6ff38]">/</span> FORM
          </h1>
          <p className="mt-3 text-xs md:text-sm font-['Plus_Jakarta_Sans'] text-white/60 tracking-wider">
            Interactive Art Direction & Cinematic Technology
          </p>
        </div>

        <div className="flex justify-between items-end">
          <div className="text-[11px] font-mono text-white/40">
            <span>COORDINATES 45.4642° N, 9.1900° E</span>
          </div>
          <div className="text-right">
            <span className="text-4xl md:text-6xl font-['Syne'] font-extrabold text-[#d6ff38] tabular-nums">
              {progress.toString().padStart(2, '0')}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
