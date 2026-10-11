import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Reusable GSAP animation function that performs a staggered,
 * clip-path polygon reveal on individual headline lines as they enter the viewport.
 * 
 * Target elements should ideally have `.clip-line` or children with `.clip-reveal-item`.
 */
export function initClipPathHeadline(
  target: HTMLElement | string,
  options: {
    trigger?: HTMLElement | string;
    stagger?: number;
    duration?: number;
    start?: string;
    delay?: number;
  } = {}
) {
  const {
    trigger = target,
    stagger = 0.12,
    duration = 1.1,
    start = 'top 85%',
    delay = 0,
  } = options;

  const elements = typeof target === 'string' 
    ? gsap.utils.toArray<HTMLElement>(target) 
    : [target];

  if (!elements.length) return null;

  return gsap.fromTo(
    elements,
    {
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
      yPercent: 100,
      opacity: 0.2,
    },
    {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      yPercent: 0,
      opacity: 1,
      duration,
      stagger,
      delay,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: trigger as gsap.DOMTarget,
        start,
        toggleActions: 'play none none reverse',
      },
    }
  );
}

/**
 * Convenience batch helper for scanning and animating all elements
 * marked with [data-clip-reveal] inside a parent container.
 */
export function registerClipPathHeadlines(container?: HTMLElement | null) {
  const scope = container || document;
  const headlineWrappers = scope.querySelectorAll<HTMLElement>('[data-clip-parent]');

  const animations: gsap.core.Tween[] = [];

  headlineWrappers.forEach((wrapper) => {
    const lines = wrapper.querySelectorAll<HTMLElement>('[data-clip-line]');
    if (lines.length > 0) {
      const anim = gsap.fromTo(
        lines,
        {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          yPercent: 105,
          opacity: 0.1,
        },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      animations.push(anim);
    }
  });

  return animations;
}
