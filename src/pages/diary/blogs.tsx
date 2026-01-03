import { BlogCard } from '../../components/ui/BlogCard';
import { Pagination } from '../../components/ui/Pagination';
import { blogsPosts } from '../../data/diary/blogs';
import { useState, useEffect } from 'react';

const POSTS_PER_PAGE = 6;

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  rotation: number;
}

const colors = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Blue
  '#FFA07A', // Light Salmon
  '#98D8C8', // Mint
  '#F7DC6F', // Yellow
  '#BB8FCE', // Purple
  '#85C1E2', // Sky Blue
  '#F8B739', // Orange
  '#52BE80', // Green
];

export default function Blogs() {
  const [currentPage, setCurrentPage] = useState(1);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Create initial particles
    const createParticle = (): Particle => ({
      id: Date.now() + Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.6 + 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
    });

    const initialParticles = Array.from({ length: 30 }, () => createParticle());
    setParticles(initialParticles);

    // Add new particles periodically
    const addParticleInterval = setInterval(() => {
      setParticles(prev => [...prev.slice(-40), createParticle()]);
    }, 500);

    // Animate particles
    const animationInterval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.vx + 100) % 100,
        y: (particle.y + particle.vy + 100) % 100,
        rotation: particle.rotation + 1,
        opacity: Math.max(0.3, Math.min(1, particle.opacity + (Math.random() - 0.5) * 0.05)),
      })));
    }, 50);

    return () => {
      clearInterval(addParticleInterval);
      clearInterval(animationInterval);
    };
  }, []);

  const totalPages = Math.ceil(blogsPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = blogsPosts.slice(startIndex, endIndex);

  return (
    <section className="relative min-h-[600px]">
      {/* Multicolored Particles - Page Wide */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              background: `radial-gradient(circle, ${particle.color} 0%, ${particle.color}80 50%, transparent 100%)`,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.size}px ${particle.color}80, 0 0 ${particle.size * 4}px ${particle.size * 2}px ${particle.color}40`,
              transform: `rotate(${particle.rotation}deg)`,
              transition: 'none',
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {currentPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          color="indigo"
        />
      </div>
    </section>
  );
}
