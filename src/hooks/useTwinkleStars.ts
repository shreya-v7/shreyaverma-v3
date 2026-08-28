import { useMemo } from 'react';

export type TwinkleStar = {
  id: number;
  top: string;
  left: string;
  size: number;
  delay: string;
  duration: string;
};

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Soft twinkle dots for the diary landing. */
export function useTwinkleStars(count = 28): TwinkleStar[] {
  return useMemo(() => {
    if (!count || prefersReducedMotion()) return [];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: `${(i * 17 + 5) % 100}%`,
      left: `${(i * 29 + 9) % 100}%`,
      size: 1 + (i % 3),
      delay: `${((i * 0.41) % 4).toFixed(2)}s`,
      duration: `${(2.2 + (i % 4) * 0.6).toFixed(2)}s`,
    }));
  }, [count]);
}
