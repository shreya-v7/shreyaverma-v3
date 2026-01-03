import { PersonalPost } from '../../types';
import { FiFilm, FiTv } from 'react-icons/fi';
import { useState } from 'react';
import { Modal } from './Modal';

interface CinemaCardProps {
  post: PersonalPost;
}

export const CinemaCard = ({ post }: CinemaCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMovie = post.metadata?.movie;
  const Icon = isMovie ? FiFilm : FiTv;

  const detailedReview = post.metadata?.detailedReview as string[] | undefined;

  return (
    <>
      <article 
        className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border border-cyan-200 dark:border-cyan-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-md">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-neutral-900 dark:text-neutral-100">{isMovie ? 'Movie' : 'TV Show'}</p>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="w-full h-48 bg-gradient-to-br from-cyan-200 to-blue-200 dark:from-cyan-800 dark:to-blue-800 rounded-lg mb-4 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300 flex-shrink-0 overflow-hidden">
            {post.image ? (
              <img src={`/${post.image}`} alt={post.metadata?.show} className="w-full h-full object-cover" />
            ) : (
              <div className="text-center">
                <Icon className="w-16 h-16 text-cyan-600 dark:text-cyan-400 mx-auto mb-2" />
                <p className="text-xs font-semibold text-cyan-800 dark:text-cyan-200">Poster</p>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            {post.metadata?.movie || post.metadata?.show || post.title || 'Untitled'}
          </h3>

          {/* Tiny Gen Z Review */}
          <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed break-words">
            {post.caption}
          </p>

          {/* Click hint */}
          <p className="text-xs text-cyan-600 dark:text-cyan-400 mt-4 italic">
            click to view full review
          </p>
        </div>
      </article>

      {/* Modal for Detailed Review */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div>
          {/* Title in Modal */}
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            {post.metadata?.movie || post.metadata?.show || post.title || 'Untitled'}
          </h2>

          {/* Detailed Review with Bullet Points */}
          {detailedReview && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Review</h3>
              <ul className="space-y-3 list-disc list-inside text-neutral-700 dark:text-neutral-300">
                {detailedReview.map((point, index) => (
                  <li key={index} className="text-base leading-relaxed">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
