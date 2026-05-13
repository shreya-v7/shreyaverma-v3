import { useEffect, useState } from 'react';

export interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  /** Renderer-specific payload (glyph, color, size, etc.). */
  data: unknown;
}

export interface UseFloatingParticlesOptions<TData> {
  /** Build a fresh particle (position/velocity/data) for a given moment. */
  spawn: () => Omit<FloatingParticle, 'id'> & { data: TData };
  /** Spawn cadence in ms. */
  spawnIntervalMs: number;
  /** Animation tick in ms (default 50ms ~ 20fps). */
  tickMs?: number;
  /** Max retained particles (older ones are dropped). */
  maxParticles?: number;
  /** Rotation delta applied each tick. */
  rotationStep?: number;
  /** Initial population. */
  initialCount?: number;
  /** Custom filter after each tick (defaults to removing particles drifting offscreen vertically). */
  isAlive?: (p: FloatingParticle) => boolean;
  /** Optional extra mutation per tick (e.g. opacity drift). */
  onTick?: (p: FloatingParticle) => FloatingParticle;
}

const defaultAlive = (p: FloatingParticle) => p.y > -12 && p.y < 130 && p.x > -30 && p.x < 130;

export function useFloatingParticles<TData = unknown>({
  spawn,
  spawnIntervalMs,
  tickMs = 50,
  maxParticles = 40,
  rotationStep = 1.2,
  initialCount = 0,
  isAlive = defaultAlive,
  onTick,
}: UseFloatingParticlesOptions<TData>): FloatingParticle[] {
  const [particles, setParticles] = useState<FloatingParticle[]>([]);

  useEffect(() => {
    const mint = (): FloatingParticle => ({ id: Date.now() + Math.random(), ...spawn() });

    if (initialCount > 0) {
      setParticles(Array.from({ length: initialCount }, mint));
    }

    const spawner = window.setInterval(() => {
      setParticles((prev) => [...prev.slice(-(maxParticles - 1)), mint()]);
    }, spawnIntervalMs);

    const ticker = window.setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => {
            const next: FloatingParticle = {
              ...p,
              x: p.x + p.vx,
              y: p.y + p.vy,
              rotation: p.rotation + rotationStep,
            };
            return onTick ? onTick(next) : next;
          })
          .filter(isAlive),
      );
    }, tickMs);

    return () => {
      window.clearInterval(spawner);
      window.clearInterval(ticker);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return particles;
}
