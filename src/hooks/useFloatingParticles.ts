import { useMemo } from 'react';

export type FloatingParticle = {
  id: number;
  icon: string;
  left: string;
  delay: string;
  duration: string;
  size: string;
  opacity: number;
};

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Random floating icons for diary sections. Empty when the user prefers reduced motion. */
export function useFloatingParticles(count: number, icons: readonly string[]): FloatingParticle[] {
  return useMemo(() => {
    if (!count || icons.length === 0 || prefersReducedMotion()) return [];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      icon: icons[i % icons.length],
      left: `${(i * 37 + 11) % 100}%`,
      delay: `${((i * 0.73) % 8).toFixed(2)}s`,
      duration: `${(14 + (i % 9)).toFixed(1)}s`,
      size: `${(0.8 + (i % 5) * 0.22).toFixed(2)}rem`,
      opacity: 0.28 + ((i * 13) % 40) / 100,
    }));
  }, [count, icons]);
}
