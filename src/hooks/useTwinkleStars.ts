import { useState, useEffect } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
}

export function useTwinkleStars(count = 100) {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
      })),
    );

    const id = setInterval(() => {
      setStars((prev) =>
        prev.map((star) => {
          const next = star.opacity + star.twinkleSpeed;
          const bounce = next > 1 || next < 0.2;
          return {
            ...star,
            opacity: bounce ? (next > 1 ? 0.2 : 1) : next,
            twinkleSpeed: bounce ? -star.twinkleSpeed : star.twinkleSpeed,
          };
        }),
      );
    }, 50);

    return () => clearInterval(id);
  }, [count]);

  return stars;
}
