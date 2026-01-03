import { PersonalPost } from '../../types';
import { formatDate } from '../../utils';
import { FiExternalLink, FiCalendar } from 'react-icons/fi';

interface BlogCardProps {
  post: PersonalPost;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  const isMediumArticle = post.link && post.link.includes('medium.com');
  const hasContent = post.content && !isMediumArticle;

  return (
    <article className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group">
      <div className="p-4">
        {/* Title - Smaller font */}
        {post.title && (
          <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
            {post.title}
          </h3>
        )}

        {/* Date */}
        {post.date && (
          <div className="flex items-center gap-1 text-xs text-neutral-600 dark:text-neutral-400 mb-3">
            <FiCalendar className="w-3 h-3" />
            <span>{formatDate(post.date)}</span>
          </div>
        )}

        {/* Caption/Description */}
        <p className="text-neutral-700 dark:text-neutral-300 mb-3 leading-relaxed text-sm line-clamp-3">
          {post.caption}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Read More Link */}
        {isMediumArticle && post.link && (
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-medium text-xs group-hover:underline transition-all"
          >
            Read on Medium
            <FiExternalLink className="w-3 h-3" />
          </a>
        )}
        {hasContent && (
          <a
            href={`/diary/blogs/${post.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-medium text-xs group-hover:underline transition-all"
          >
            Read More
            <FiExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </article>
  );
};
