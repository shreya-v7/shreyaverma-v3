import type { CSSProperties, ReactNode } from 'react';
import type { FloatingParticle } from '../../hooks/useFloatingParticles';

interface ParticleFieldProps {
  particles: FloatingParticle[];
  render: (p: FloatingParticle) => { className?: string; style?: CSSProperties; children?: ReactNode };
}

/** Fixed, page-wide layer that renders animated particles behind the content. */
export function ParticleField({ particles, render }: ParticleFieldProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {particles.map((p) => {
        const { className = '', style, children } = render(p);
        return (
          <div
            key={p.id}
            className={`absolute select-none ${className}`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
              transition: 'none',
              ...style,
            }}
          >
            {children}
          </div>
        );
      })}
    </div>
  );
}
