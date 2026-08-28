import { BookCard } from '../../components/ui/BookCard';
import { CinemaCard } from '../../components/ui/CinemaCard';
import { BlogCard } from '../../components/ui/BlogCard';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { NavigationButtons } from '../../components/ui/NavigationButtons';
import { SpotifyArtistCard } from '../../components/ui/SpotifyArtistCard';
import { TwinkleStars } from '../../components/ui/ParticleField';
import { DIARY_BLOGS_PATH, DIARY_CINEMA_PATH, DIARY_NAV } from '../../config/sectionNav';
import { booksPosts } from '../../data/diary/books';
import { cinemaPosts } from '../../data/diary/cinema';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import { useSpotifyEmbed } from '../../hooks/useSpotifyEmbed';

export default function DiaryPreview() {
  const { posts: blogPosts, loading: blogsLoading } = useBlogPosts(6);
  const { embed, loading: spotifyLoading } = useSpotifyEmbed();
  const spotifyArtists = embed?.topArtists.slice(0, 3) ?? [];

  return (
    <div className="relative z-10 space-y-12">
      <TwinkleStars count={28} />
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
        <SectionHeader title="Cinema" viewAllPath={DIARY_CINEMA_PATH} />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {cinemaPosts.slice(0, 2).map((post) => (
            <CinemaCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}

function SpotifyPreviewSkeleton() {
  return (
    <div className="h-56 animate-pulse rounded-2xl border border-zinc-900/5 bg-zinc-900/[0.04] dark:border-white/5 dark:bg-white/[0.04]" />
  );
}
