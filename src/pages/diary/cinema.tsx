import { useEffect, useState } from 'react';

import { CinemaCard } from '../../components/ui/CinemaCard';
import { Pagination } from '../../components/ui/Pagination';
import { useTheme } from '../../hooks/useTheme';
import { cinemaMoviePosts, cinemaTvPosts } from '../../data/diary/cinema';

const POSTS_PER_PAGE = 4;

export type CinemaMode = 'tv' | 'movies';

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  opacity: number;
  size: number;
}

function spawnStar(): ShootingStar {
  const side = Math.floor(Math.random() * 4);
  let x = 0;
  let y = 0;
  let vx = 0;
  let vy = 0;
  if (side === 0) {
    x = Math.random() * 100; y = -10;
    vx = (Math.random() - 0.5) * 0.5; vy = Math.random() * 0.3 + 0.2;
  } else if (side === 1) {
    x = 110; y = Math.random() * 100;
    vx = -(Math.random() * 0.3 + 0.2); vy = (Math.random() - 0.5) * 0.5;
  } else if (side === 2) {
    x = Math.random() * 100; y = 110;
    vx = (Math.random() - 0.5) * 0.5; vy = -(Math.random() * 0.3 + 0.2);
  } else {
    x = -10; y = Math.random() * 100;
    vx = Math.random() * 0.3 + 0.2; vy = (Math.random() - 0.5) * 0.5;
  }
  return {
    id: Date.now() + Math.random(),
    x, y, vx, vy,
    length: Math.random() * 50 + 40,
    opacity: Math.random() * 0.4 + 0.6,
    size: Math.random() * 2.5 + 2,
  };
}

const DARK_COLORS = {
  head: 'rgba(192, 192, 192, 1)',
  glow: 'rgba(192, 192, 192, 0.8)',
  outerGlow: 'rgba(192, 192, 192, 0.4)',
  trailStart: 'rgba(192, 192, 192, 1)',
  trailMid: 'rgba(192, 192, 192, 0.6)',
};
const LIGHT_COLORS = {
  head: 'rgba(255, 215, 0, 1)',
  glow: 'rgba(255, 215, 0, 1)',
  outerGlow: 'rgba(255, 215, 0, 0.8)',
  trailStart: 'rgba(255, 215, 0, 1)',
  trailMid: 'rgba(255, 215, 0, 0.7)',
};

export default function Cinema({ mode = 'tv' }: { mode?: CinemaMode }) {
  const [stars, setStars] = useState<ShootingStar[]>([]);
  const isDark = useTheme();
  const [currentPage, setCurrentPage] = useState(1);

  const posts = mode === 'movies' ? cinemaMoviePosts() : cinemaTvPosts();

  useEffect(() => {
    setCurrentPage(1);
  }, [mode]);

  useEffect(() => {
    setStars(Array.from({ length: 12 }, spawnStar));

    const spawner = window.setInterval(() => {
      setStars((prev) => [...prev.slice(-20), spawnStar()]);
    }, 400);

    const ticker = window.setInterval(() => {
      setStars((prev) =>
        prev
          .map((s) => ({ ...s, x: s.x + s.vx, y: s.y + s.vy, opacity: s.opacity * 0.98 }))
          .filter((s) => s.x > -50 && s.x < 150 && s.y > -50 && s.y < 150 && s.opacity > 0.1),
      );
    }, 16);

    return () => {
      window.clearInterval(spawner);
      window.clearInterval(ticker);
    };
  }, []);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const colors = isDark ? DARK_COLORS : LIGHT_COLORS;

  return (
    <section className="relative min-h-[600px]">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
        {stars.map((star) => {
          const angle = Math.atan2(star.vy, star.vx) * (180 / Math.PI);
          const enhancedOpacity = isDark ? star.opacity : Math.min(1, star.opacity * 1.2);
          const headSize = star.size * (isDark ? 2 : 2.5);
          return (
            <div
              key={star.id}
              className="absolute"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.length}px`,
                height: `${star.size}px`,
                opacity: enhancedOpacity,
                transform: `rotate(${angle}deg)`,
                transformOrigin: 'left center',
              }}
            >
              <div
                className="absolute rounded-full"
                style={{
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: `${headSize}px`,
                  height: `${headSize}px`,
                  background: `radial-gradient(circle, ${colors.head} 0%, ${colors.glow} 50%, transparent 100%)`,
                  boxShadow: isDark
                    ? `0 0 ${star.size * 4}px ${star.size}px ${colors.glow}`
                    : `0 0 ${star.size * 6}px ${star.size * 1.5}px ${colors.glow}, 0 0 ${star.size * 10}px ${star.size * 2}px ${colors.outerGlow}`,
                }}
              />
              <div
                className="absolute"
                style={{
                  left: `${star.size}px`,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: `${star.length - star.size}px`,
                  height: isDark ? '1px' : '2px',
                  background: `linear-gradient(to right, ${colors.trailStart}, ${colors.trailMid}, transparent)`,
                  boxShadow: isDark
                    ? `0 0 ${star.size * 2}px rgba(255, 255, 255, ${enhancedOpacity * 0.5}), 0 0 ${star.size * 4}px ${colors.outerGlow}`
                    : `0 0 ${star.size * 3}px ${colors.trailStart}, 0 0 ${star.size * 6}px ${colors.outerGlow}, 0 0 ${star.size * 10}px ${colors.outerGlow}`,
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="relative z-10">
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {currentPosts.map((post) => (
            <CinemaCard key={post.id} post={post} />
          ))}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} color="cyan" />
      </div>
    </section>
  );
}
