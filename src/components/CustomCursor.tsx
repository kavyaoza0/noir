import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [targetPos, setTargetPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if device is touch or prefers reduced motion
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouchDevice || prefersReducedMotion) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], input, select, textarea');
      const videoArea = target.closest('[data-cursor="scrub"]');
      const threeArea = target.closest('[data-cursor="drag3d"]');

      if (videoArea) {
        setCursorText('SCRUB');
        setIsHovered(true);
      } else if (threeArea) {
        setCursorText('ROTATE');
        setIsHovered(true);
      } else if (interactive) {
        setCursorText('');
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  // Smooth cursor trailing
  useEffect(() => {
    if (isTouch) return;
    let animationFrameId: number;

    const render = () => {
      setPos((prev) => ({
        x: prev.x + (targetPos.x - prev.x) * 0.22,
        y: prev.y + (targetPos.y - prev.y) * 0.22,
      }));
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [targetPos, isTouch]);

  if (isTouch || !isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 transition-opacity duration-300"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        className={`flex items-center justify-center rounded-full transition-all duration-200 ${
          isHovered
            ? 'w-14 h-14 bg-[#d6ff38] text-black shadow-lg shadow-[#d6ff38]/20 scale-100'
            : 'w-3 h-3 bg-white/90 ring-4 ring-white/10'
        }`}
      >
        {cursorText && (
          <span className="text-[10px] font-mono tracking-widest font-bold uppercase select-none">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
