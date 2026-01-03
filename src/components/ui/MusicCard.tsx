import { PersonalPost } from '../../types';

interface MusicCardProps {
  post: PersonalPost;
}

export const MusicCard = ({ post }: MusicCardProps) => {
  return (
    <article className="relative bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group aspect-square flex flex-col h-full w-full max-w-[280px] mx-auto">
      <div className="relative p-3 flex-1 flex flex-col">
        {/* Track Info */}
        {post.metadata && (
          <div className="mb-2 space-y-1 flex-shrink-0">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 break-words">
              {post.metadata.album || 'Unknown Album'}
            </h3>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium break-words">
              {post.metadata.artist || 'Unknown Artist'}
            </p>
          </div>
        )}

        {/* Caption */}
        <p className="text-neutral-700 dark:text-neutral-300 mb-2 leading-relaxed text-xs flex-1 overflow-hidden break-words">
          {post.caption}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 flex-shrink-0">
            {post.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="px-1.5 py-0.5 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};
