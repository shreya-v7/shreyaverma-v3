import { Link } from 'react-router-dom';
import { ArtistCard } from '../../components/ui/ArtistCard';
import { BookCard } from '../../components/ui/BookCard';
import { CinemaCard } from '../../components/ui/CinemaCard';
import { BlogCard } from '../../components/ui/BlogCard';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { NavigationButtons } from '../../components/ui/NavigationButtons';
import { useTheme } from '../../hooks/useTheme';
import { artists } from '../../data/diary/music';
import { booksPosts } from '../../data/diary/books';
import { cinemaPosts } from '../../data/diary/cinema';
import { blogsPosts } from '../../data/diary/blogs';
import { useState, useEffect } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
}

export default function DiaryPreview() {
  const [stars, setStars] = useState<Star[]>([]);
  const isDark = useTheme();

  useEffect(() => {
    // Create initial stars
    const initialStars = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.01,
    }));
    setStars(initialStars);

    // Animate twinkling stars
    const animationInterval = setInterval(() => {
      setStars(prev => prev.map(star => {
        const newOpacity = star.opacity + star.twinkleSpeed;
        return {
          ...star,
          opacity: newOpacity > 1 || newOpacity < 0.2 
            ? (newOpacity > 1 ? 0.2 : 1) 
            : newOpacity,
          twinkleSpeed: newOpacity > 1 || newOpacity < 0.2 ? -star.twinkleSpeed : star.twinkleSpeed,
        };
      }));
    }, 50);

    return () => {
      clearInterval(animationInterval);
    };
  }, []);

  // Golden for light mode, Silver for dark mode
  const starColor = isDark 
    ? 'rgba(192, 192, 192, 1)' // Silver
    : 'rgba(255, 215, 0, 1)'; // Golden

  const starGlow = isDark
    ? 'rgba(192, 192, 192, 0.6)' // Silver glow
    : 'rgba(255, 215, 0, 0.6)'; // Golden glow

  return (
    <div className="relative min-h-screen">
      {/* Starry Sparkle Background - Golden (light) / Silver (dark) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              background: starColor,
              boxShadow: `0 0 ${star.size * 3}px ${star.size}px ${starGlow}`,
              transition: 'opacity 0.3s ease-in-out',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 space-y-12">
        <NavigationButtons
          buttons={[
            { id: 'music', label: 'Music', path: '/diary/music' },
            { id: 'books', label: 'Books', path: '/diary/books' },
            { id: 'cinema', label: 'Cinema', path: '/diary/cinema' },
            { id: 'blogs', label: 'Blogs', path: '/diary/blogs' },
          ]}
          activeId=""
        />

        {/* Music Section - Artists */}
        <section>
          <SectionHeader title="Music" viewAllPath="/diary/music" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {artists.slice(0, 3).map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </section>

        {/* Books Section */}
        <section>
          <SectionHeader title="Books" viewAllPath="/diary/books" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {booksPosts.slice(0, 2).map((post) => (
              <BookCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        {/* Cinema Section */}
        <section>
          <SectionHeader title="Cinema" viewAllPath="/diary/cinema" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cinemaPosts.slice(0, 2).map((post) => (
              <CinemaCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        {/* Blogs Section */}
        <section>
          <SectionHeader title="Blogs" viewAllPath="/diary/blogs" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blogsPosts.slice(0, 2).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
