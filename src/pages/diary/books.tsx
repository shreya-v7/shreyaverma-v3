import { useState } from 'react';

import { BookCard } from '../../components/ui/BookCard';
import { Pagination } from '../../components/ui/Pagination';
import { ParticleField } from '../../components/ui/ParticleField';
import { useFloatingParticles } from '../../hooks/useFloatingParticles';
import { booksPosts } from '../../data/diary/books';

const BOOK_EMOJIS = ['📚', '📖', '📕', '📗', '📘', '📙', '📓', '📔', '📒', '🔖'] as const;
const POSTS_PER_PAGE = 6;

export default function Books() {
  const [currentPage, setCurrentPage] = useState(1);

  const books = useFloatingParticles<{ emoji: string }>({
    spawnIntervalMs: 400,
    rotationStep: 1.5,
    spawn: () => ({
      x: Math.random() * 100,
      y: 100,
      vx: (Math.random() - 0.5) * 0.2,
      vy: -Math.random() * 0.4 - 0.2,
      rotation: Math.random() * 360,
      data: { emoji: BOOK_EMOJIS[Math.floor(Math.random() * BOOK_EMOJIS.length)]! },
    }),
  });

  const totalPages = Math.ceil(booksPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = booksPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <section className="relative min-h-[600px]">
      <ParticleField
        particles={books}
        render={(p) => ({
          className: 'text-4xl',
          children: (p.data as { emoji: string }).emoji,
        })}
      />

      <div className="relative z-10">
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {currentPosts.map((post) => (
            <BookCard key={post.id} post={post} />
          ))}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} color="amber" />
      </div>
    </section>
  );
}
