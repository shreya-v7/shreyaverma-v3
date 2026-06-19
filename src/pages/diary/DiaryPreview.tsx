import { useEffect, useState } from 'react';
import { BookCard } from '../../components/ui/BookCard';
import { CinemaCard } from '../../components/ui/CinemaCard';
import { BlogCard } from '../../components/ui/BlogCard';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { NavigationButtons } from '../../components/ui/NavigationButtons';
import { SpotifyArtistCard } from '../../components/ui/SpotifyArtistCard';
import { useTheme } from '../../hooks/useTheme';
import { useTwinkleStars } from '../../hooks/useTwinkleStars';
import { DIARY_BLOGS_PATH, DIARY_MOVIES_PATH, DIARY_NAV, DIARY_TV_PATH } from '../../config/sectionNav';
import { booksPosts } from '../../data/diary/books';
import { cinemaMoviePosts, cinemaTvPosts } from '../../data/diary/cinema';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import { fetchSpotifyEmbed } from '../../lib/spotifyPlaylist';
import type { SpotifyEmbedItem } from '../../lib/spotifyPlaylist';

export default function DiaryPreview() {
  const stars = useTwinkleStars();
  const isDark = useTheme();
  const { posts: blogPosts, loading: blogsLoading } = useBlogPosts(6);
  const [spotifyArtists, setSpotifyArtists] = useState<SpotifyEmbedItem[]>([]);
  const [spotifyLoading, setSpotifyLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetchSpotifyEmbed().then((result) => {
      if (cancelled) return;
      setSpotifyArtists(result.ok ? result.data.topArtists.slice(0, 3) : []);
      setSpotifyLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const starColor = isDark ? 'rgba(192, 192, 192, 1)' : 'rgba(255, 215, 0, 1)';
  const starGlow = isDark ? 'rgba(192, 192, 192, 0.6)' : 'rgba(255, 215, 0, 0.6)';

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
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
        <NavigationButtons buttons={DIARY_NAV} activeId="" />

        <section>
          <SectionHeader title="Blogs" viewAllPath={DIARY_BLOGS_PATH} />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {blogsLoading && blogPosts.length === 0
              ? Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-48 animate-pulse rounded-xl border border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800/50"
                  />
                ))
              : blogPosts.slice(0, 2).map((post) => <BlogCard key={post.id} post={post} />)}
          </div>
        </section>

        <section>
          <SectionHeader title="Books" viewAllPath="/diary/books" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {booksPosts.slice(0, 2).map((post) => (
              <BookCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader title="Music" viewAllPath="/diary/music" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {spotifyLoading
              ? Array.from({ length: 3 }).map((_, index) => <SpotifyPreviewSkeleton key={index} />)
              : spotifyArtists.map((artist) => <SpotifyArtistCard key={artist.id} artist={artist} compact />)}
          </div>
        </section>

        <section>
          <SectionHeader title="Movies" viewAllPath={DIARY_MOVIES_PATH} />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {cinemaMoviePosts()
              .slice(0, 2)
              .map((post) => (
                <CinemaCard key={post.id} post={post} />
              ))}
          </div>
        </section>

        <section>
          <SectionHeader title="TV shows" viewAllPath={DIARY_TV_PATH} />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {cinemaTvPosts()
              .slice(0, 2)
              .map((post) => (
                <CinemaCard key={post.id} post={post} />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function SpotifyPreviewSkeleton() {
  return (
    <div className="h-56 animate-pulse rounded-2xl border border-zinc-900/5 bg-zinc-900/[0.04] dark:border-white/5 dark:bg-white/[0.04]" />
  );
}
