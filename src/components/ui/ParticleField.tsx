import { useMemo } from 'react';

import { useFloatingParticles } from '../../hooks/useFloatingParticles';
import { useTwinkleStars } from '../../hooks/useTwinkleStars';

export type ParticleKind = 'music' | 'books' | 'blogs';

const ICONS: Record<ParticleKind, readonly string[]> = {
  music: ['🎵', '🎶', '🎤', '🎧', '🎸', '🎹', '♪', '♫'],
  books: ['📚', '📖', '📕', '📗', '📘', '📙'],
  blogs: ['•', '◦', '●', '✦'],
};

type ParticleFieldProps = {
  type: ParticleKind;
  count?: number;
};

/** Fixed, non-interactive floating icons behind diary section content. */
export function ParticleField({ type, count = 16 }: ParticleFieldProps) {
  const icons = ICONS[type];
  const particles = useFloatingParticles(count, icons);

  if (particles.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="diary-float-particle absolute"
          style={{
            left: p.left,
            bottom: '-2.5rem',
            animationDelay: p.delay,
            animationDuration: p.duration,
            fontSize: p.size,
            opacity: p.opacity,
          }}
        >
          {p.icon}
        </span>
      ))}
    </div>
  );
}

/** Twinkle stars for the diary landing page. */
export function TwinkleStars({ count = 28 }: { count?: number }) {
  const stars = useTwinkleStars(count);
  if (stars.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      {stars.map((s) => (
        <span
          key={s.id}
          className="diary-twinkle-star absolute rounded-full bg-neutral-800 dark:bg-white"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: s.duration,
            boxShadow: '0 0 6px currentColor',
          }}
        />
      ))}
    </div>
  );
}

/** Cinema shooting stars. */
export function ShootingStars({ count = 6 }: { count?: number }) {
  const stars = useMemo(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return [];
    }
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: `${8 + ((i * 14) % 50)}%`,
      right: `${-8 - (i % 4) * 6}%`,
      delay: `${(i * 1.7).toFixed(2)}s`,
      duration: `${(5.5 + (i % 3)).toFixed(1)}s`,
    }));
  }, [count]);

  if (stars.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      {stars.map((s) => (
        <span
          key={s.id}
          className="diary-shooting-star absolute block h-px w-24 bg-gradient-to-l from-neutral-800 to-transparent dark:from-white"
          style={{
            top: s.top,
            right: s.right,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}
    </div>
  );
}
