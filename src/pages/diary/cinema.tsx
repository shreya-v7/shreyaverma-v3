import { CinemaCard } from '../../components/ui/CinemaCard';
import { Pagination } from '../../components/ui/Pagination';
import { useTheme } from '../../hooks/useTheme';
import { cinemaPosts } from '../../data/diary/cinema';
import { useState, useEffect, useRef } from 'react';

const POSTS_PER_PAGE = 4;

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

export default function Cinema() {
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const isDark = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Create shooting star
    const createShootingStar = (): ShootingStar => {
      const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
      let x, y, vx, vy;
      
      if (side === 0) { // Top
        x = Math.random() * 100;
        y = -10;
        vx = (Math.random() - 0.5) * 0.5;
        vy = Math.random() * 0.3 + 0.2;
      } else if (side === 1) { // Right
        x = 110;
        y = Math.random() * 100;
        vx = -(Math.random() * 0.3 + 0.2);
        vy = (Math.random() - 0.5) * 0.5;
      } else if (side === 2) { // Bottom
        x = Math.random() * 100;
        y = 110;
        vx = (Math.random() - 0.5) * 0.5;
        vy = -(Math.random() * 0.3 + 0.2);
      } else { // Left
        x = -10;
        y = Math.random() * 100;
        vx = Math.random() * 0.3 + 0.2;
        vy = (Math.random() - 0.5) * 0.5;
      }

      return {
        id: Date.now() + Math.random(),
        x,
        y,
        vx,
        vy,
        length: Math.random() * 50 + 40, // Longer trails for more prominence
        opacity: Math.random() * 0.4 + 0.6, // Higher opacity
        size: Math.random() * 2.5 + 2, // Larger stars
      };
    };

    // Initialize with multiple shooting stars
    const initialStars = Array.from({ length: 12 }, () => createShootingStar());
    setShootingStars(initialStars);

    // Add new shooting stars more frequently for multiple stars
    const addStarInterval = setInterval(() => {
      setShootingStars(prev => [...prev.slice(-20), createShootingStar()]);
    }, 400); // More frequent spawning

    // Animate shooting stars
    const animationInterval = setInterval(() => {
      setShootingStars(prev => 
        prev.map(star => ({
          ...star,
          x: star.x + star.vx,
          y: star.y + star.vy,
          opacity: star.opacity * 0.98, // Fade out
        })).filter(star => 
          star.x > -50 && star.x < 150 && star.y > -50 && star.y < 150 && star.opacity > 0.1
        )
      );
    }, 16); // ~60fps

    return () => {
      clearInterval(addStarInterval);
      clearInterval(animationInterval);
    };
  }, []);

  const totalPages = Math.ceil(cinemaPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = cinemaPosts.slice(startIndex, endIndex);

  // Golden for light mode (more prominent), Silver for dark mode
  const starColor = isDark 
    ? { 
        head: 'rgba(192, 192, 192, 1)', 
        glow: 'rgba(192, 192, 192, 0.8)', 
        outerGlow: 'rgba(192, 192, 192, 0.4)',
        trailStart: 'rgba(192, 192, 192, 1)',
        trailMid: 'rgba(192, 192, 192, 0.6)',
      } // Silver
    : { 
        head: 'rgba(255, 215, 0, 1)', 
        glow: 'rgba(255, 215, 0, 1)', 
        outerGlow: 'rgba(255, 215, 0, 0.8)',
        trailStart: 'rgba(255, 215, 0, 1)',
        trailMid: 'rgba(255, 215, 0, 0.7)',
      }; // Golden - more vibrant and prominent

  return (
    <section ref={sectionRef} className="relative min-h-[600px]">
      {/* Shooting Star Particles - Golden (light, prominent) / Silver (dark) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {shootingStars.map((star) => {
          const angle = Math.atan2(star.vy, star.vx) * (180 / Math.PI);
          const enhancedOpacity = isDark ? star.opacity : Math.min(1, star.opacity * 1.2); // Boost opacity in light mode
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
                transition: 'none',
              }}
            >
              {/* Star head - larger and brighter in light mode */}
              <div
                className="absolute rounded-full"
                style={{
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: `${star.size * (isDark ? 2 : 2.5)}px`,
                  height: `${star.size * (isDark ? 2 : 2.5)}px`,
                  background: `radial-gradient(circle, ${starColor.head} 0%, ${starColor.glow} 50%, transparent 100%)`,
                  boxShadow: isDark 
                    ? `0 0 ${star.size * 4}px ${star.size}px ${starColor.glow}`
                    : `0 0 ${star.size * 6}px ${star.size * 1.5}px ${starColor.glow}, 0 0 ${star.size * 10}px ${star.size * 2}px ${starColor.outerGlow}`,
                }}
              />
              {/* Star trail - thicker and brighter in light mode */}
              <div
                className="absolute"
                style={{
                  left: `${star.size}px`,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: `${star.length - star.size}px`,
                  height: isDark ? '1px' : '2px',
                  background: `linear-gradient(to right, ${starColor.trailStart}, ${starColor.trailMid}, transparent)`,
                  boxShadow: isDark
                    ? `0 0 ${star.size * 2}px rgba(255, 255, 255, ${enhancedOpacity * 0.5}), 0 0 ${star.size * 4}px ${starColor.outerGlow}`
                    : `0 0 ${star.size * 3}px ${starColor.trailStart}, 0 0 ${star.size * 6}px ${starColor.outerGlow}, 0 0 ${star.size * 10}px ${starColor.outerGlow}`,
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {currentPosts.map((post) => (
            <CinemaCard key={post.id} post={post} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          color="cyan"
        />
      </div>
    </section>
  );
}
