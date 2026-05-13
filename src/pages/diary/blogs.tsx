import { useState } from 'react';

import { BlogCard } from '../../components/ui/BlogCard';
import { Pagination } from '../../components/ui/Pagination';
import { ParticleField } from '../../components/ui/ParticleField';
import { useFloatingParticles } from '../../hooks/useFloatingParticles';
import { blogsPosts } from '../../data/diary/blogs';

const POSTS_PER_PAGE = 6;

const COLORS = [
  '#111111', '#262626', '#404040', '#525252', '#737373',
  '#8a8a8a', '#a3a3a3', '#c7c7c7', '#d4d4d4', '#e5e5e5',
];

interface BlogDot {
  size: number;
  opacity: number;
  color: string;
}

const wrap = (v: number) => (v + 100) % 100;

export default function Blogs() {
  const [currentPage, setCurrentPage] = useState(1);

  const particles = useFloatingParticles<BlogDot>({
    spawnIntervalMs: 500,
    rotationStep: 1,
    initialCount: 30,
    isAlive: () => true,
    onTick: (p) => {
      const data = p.data as BlogDot;
      const drift = (Math.random() - 0.5) * 0.05;
      return {
        ...p,
        x: wrap(p.x),
        y: wrap(p.y),
        data: { ...data, opacity: Math.max(0.3, Math.min(1, data.opacity + drift)) },
      };
    },
    spawn: () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      rotation: Math.random() * 360,
      data: {
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.6 + 0.4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
      },
    }),
  });

  const totalPages = Math.ceil(blogsPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = blogsPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <section className="relative min-h-[600px]">
      <ParticleField
        particles={particles}
        render={(p) => {
          const d = p.data as BlogDot;
          return {
            className: 'rounded-full',
            style: {
              width: `${d.size}px`,
              height: `${d.size}px`,
              opacity: d.opacity,
              background: `radial-gradient(circle, ${d.color} 0%, ${d.color}80 50%, transparent 100%)`,
              boxShadow: `0 0 ${d.size * 2}px ${d.size}px ${d.color}80, 0 0 ${d.size * 4}px ${d.size * 2}px ${d.color}40`,
            },
          };
        }}
      />

      <div className="relative z-10">
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {currentPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} color="indigo" />
      </div>
    </section>
  );
}
