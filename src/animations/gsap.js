import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Shared easing (no bounce, no elastic — smooth premium feel) ──
export const EASE = {
  out: 'power4.out',
  inOut: 'power3.inOut',
  expo: 'expo.out',
  slow: 'power3.out',
};

// ── ScrollTrigger defaults ──
const ST_DEFAULTS = {
  start: 'top 88%',
  toggleActions: 'play none none none',
};

/**
 * Create a ScrollTrigger animation for a single element.
 */
export function animateIn(el, vars = {}, scrollVars = {}) {
  if (!el) return;
  return gsap.fromTo(el,
    { y: 60, opacity: 0, ...vars },
    {
      y: 0, opacity: 1, duration: 0.9, ease: EASE.out,
      scrollTrigger: { trigger: el, ...ST_DEFAULTS, ...scrollVars },
      ...vars,
    }
  );
}

/**
 * Stagger a list of elements with same from→to.
 */
export function staggerIn(els, vars = {}, scrollVars = {}) {
  if (!els || !els.length) return;
  return gsap.fromTo(els,
    { y: 50, opacity: 0, scale: 0.94, ...vars },
    {
      y: 0, opacity: 1, scale: 1,
      duration: 0.8, ease: EASE.out,
      stagger: 0.1,
      scrollTrigger: { trigger: els[0], ...ST_DEFAULTS, ...scrollVars },
    }
  );
}

/**
 * Clip-reveal vertically: content slides up from a bottom-clipped mask.
 * Wrap target in a container with overflow:hidden + the clip-set class.
 */
export function clipRevealY(container, vars = {}, scrollVars = {}) {
  if (!container) return;
  const inner = container.firstElementChild || container;
  gsap.set(container, { overflow: 'hidden' });
  gsap.set(inner, { y: '105%' });
  return gsap.to(inner, {
    y: '0%',
    duration: 1.1,
    ease: EASE.inOut,
    scrollTrigger: { trigger: container, ...ST_DEFAULTS, ...scrollVars },
    ...vars,
  });
}

/**
 * Clip-reveal horizontally: content slides in from right-clipped mask.
 */
export function clipRevealX(container, vars = {}, scrollVars = {}) {
  if (!container) return;
  const inner = container.firstElementChild || container;
  gsap.set(container, { overflow: 'hidden' });
  gsap.set(inner, { x: '-102%' });
  return gsap.to(inner, {
    x: '0%',
    duration: 1.1,
    ease: EASE.inOut,
    scrollTrigger: { trigger: container, ...ST_DEFAULTS, ...scrollVars },
    ...vars,
  });
}

/**
 * Hero opening timeline — no scroll, auto-play on mount.
 * Returns a GSAP timeline so callers can add to it.
 */
export function heroTimeline() {
  return gsap.timeline({ defaults: { ease: EASE.out } });
}

/**
 * Register a cleanup function so all ScrollTriggers are killed on unmount.
 */
export function useCleanup() {
  const sts = [];
  return {
    add(st) {
      if (st) {
        if (st.scrollTrigger) sts.push(st.scrollTrigger);
        else if (st.vars?.scrollTrigger) sts.push(st.vars.scrollTrigger);
        else sts.push(st);
      }
    },
    kill() {
      sts.forEach(st => {
        try { st.kill?.(); } catch (_) { /* already dead */ }
      });
      sts.length = 0;
    },
  };
}

// Re-export for convenience
export { gsap, ScrollTrigger };
