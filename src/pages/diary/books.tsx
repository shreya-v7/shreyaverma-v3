import { BookCard } from '../../components/ui/BookCard';
import { Pagination } from '../../components/ui/Pagination';
import { booksPosts } from '../../data/diary/books';
import { useState, useEffect } from 'react';

const bookEmojis = ['📚', '📖', '📕', '📗', '📘', '📙', '📓', '📔', '📒', '🔖'];
const POSTS_PER_PAGE = 6;

export default function Books() {
  const [books, setBooks] = useState<Array<{ id: number; emoji: string; x: number; y: number; vx: number; vy: number; rotation: number }>>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      const newBook = {
        id: Date.now() + Math.random(),
        emoji: bookEmojis[Math.floor(Math.random() * bookEmojis.length)],
        x: Math.random() * 100,
        y: 100,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -Math.random() * 0.4 - 0.2,
        rotation: Math.random() * 360,
      };
      setBooks(prev => [...prev.slice(-40), newBook]);
    }, 400);

    const animationInterval = setInterval(() => {
      setBooks(prev => prev.map(book => ({
        ...book,
        x: book.x + book.vx,
        y: book.y + book.vy,
        rotation: book.rotation + 1.5,
      })).filter(book => book.y > -10));
    }, 50);

    return () => {
      clearInterval(interval);
      clearInterval(animationInterval);
    };
  }, []);

  const totalPages = Math.ceil(booksPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = booksPosts.slice(startIndex, endIndex);

  return (
    <section className="relative min-h-[600px]">
      {/* Book Particles - Page Wide */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {books.map((book) => (
          <div
            key={book.id}
            className="absolute text-4xl select-none"
            style={{
              left: `${book.x}%`,
              top: `${book.y}%`,
              transform: `rotate(${book.rotation}deg)`,
              transition: 'none',
            }}
          >
            {book.emoji}
          </div>
        ))}
      </div>

      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {currentPosts.map((post) => (
            <BookCard key={post.id} post={post} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          color="amber"
        />
      </div>
    </section>
  );
}
