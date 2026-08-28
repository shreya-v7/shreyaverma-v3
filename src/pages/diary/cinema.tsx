import { useEffect, useMemo, useState } from 'react';

import { CinemaCard } from '../../components/ui/CinemaCard';
import { FilterPills } from '../../components/ui/FilterPills';
import { Pagination } from '../../components/ui/Pagination';
import { ShootingStars } from '../../components/ui/ParticleField';
import { cinemaMoviePosts, cinemaPosts, cinemaTvPosts } from '../../data/diary/cinema';
import { usePagination } from '../../hooks/usePagination';

const POSTS_PER_PAGE = 4;

type CinemaFilter = 'all' | 'movies' | 'tv';

export default function Cinema() {
  const [filter, setFilter] = useState<CinemaFilter>('all');

  const posts = useMemo(() => {
    if (filter === 'movies') return cinemaMoviePosts();
    if (filter === 'tv') return cinemaTvPosts();
    return cinemaPosts;
  }, [filter]);

  const { currentPage, setCurrentPage, totalPages, pageItems } = usePagination(posts, POSTS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, setCurrentPage]);

  const filters: { id: CinemaFilter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'movies', label: 'Movies' },
    { id: 'tv', label: 'TV' },
  ];

  return (
    <section className="relative z-10">
      <ShootingStars count={6} />
      <FilterPills<CinemaFilter> items={filters} activeId={filter} onChange={setFilter} />

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {pageItems.map((post) => (
          <CinemaCard key={post.id} post={post} />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </section>
  );
}
