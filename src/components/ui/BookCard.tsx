import { PersonalPost } from '../../types';
import { useState } from 'react';
import { Modal } from './Modal';

interface BookCardProps {
  post: PersonalPost;
}

export const BookCard = ({ post }: BookCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const detailedReview = post.metadata?.detailedReview as string[] | undefined;

  return (
    <>
      <article 
        className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="p-6">
          {/* Book Info */}
          {post.metadata && (
            <div className="mb-4 space-y-1">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 break-words">
                {post.metadata.book || post.title || 'Untitled'}
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-300 font-medium break-words">
                by {post.metadata.author || 'Unknown Author'}
              </p>
            </div>
          )}

          {/* Tiny Gen Z Review */}
          <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed break-words">
            {post.caption}
          </p>

          {/* Click hint */}
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-4 italic">
            click to view full review
          </p>
        </div>
      </article>

      {/* Modal for Detailed Review */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div>
          {/* Book Info in Modal */}
          {post.metadata && (
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                {post.metadata.book || post.title || 'Untitled'}
              </h2>
              <p className="text-xl text-amber-700 dark:text-amber-300 font-medium">
                by {post.metadata.author || 'Unknown Author'}
              </p>
            </div>
          )}

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
