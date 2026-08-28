import { BookCard } from '../../components/ui/BookCard';
import { Pagination } from '../../components/ui/Pagination';
import { ParticleField } from '../../components/ui/ParticleField';
import { booksPosts } from '../../data/diary/books';
import { usePagination } from '../../hooks/usePagination';

const POSTS_PER_PAGE = 6;

export default function Books() {
  const { currentPage, setCurrentPage, totalPages, pageItems } = usePagination(booksPosts, POSTS_PER_PAGE);

  return (
    <section className="relative z-10">
      <ParticleField type="books" count={16} />
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {pageItems.map((post) => (
          <BookCard key={post.id} post={post} />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </section>
  );
}
