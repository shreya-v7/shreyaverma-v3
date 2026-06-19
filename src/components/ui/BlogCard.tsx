import { PersonalPost } from '../../types';
import { formatDate } from '../../utils';
import { getBlogReadLabel } from '../../lib/substackPosts';
import { FiExternalLink, FiCalendar } from 'react-icons/fi';

interface BlogCardProps {
  post: PersonalPost;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  const readHref = post.link;
  if (!readHref) return null;

  return (
    <article className="group overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-md transition-all duration-300 hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
      {post.image ? (
        <div className="aspect-[2/1] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
          <img
            src={post.image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : null}
      <div className="p-4">
        {post.title ? (
          <h3 className="mb-2 line-clamp-2 text-base font-bold text-neutral-900 transition-colors group-hover:text-indigo-600 dark:text-neutral-100 dark:group-hover:text-indigo-400">
            {post.title}
          </h3>
        ) : null}

        {post.date ? (
          <div className="mb-3 flex items-center gap-1 text-xs text-neutral-600 dark:text-neutral-400">
            <FiCalendar className="h-3 w-3" />
            <span>{formatDate(post.date)}</span>
          </div>
        ) : null}

        <p className="mb-3 line-clamp-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{post.caption}</p>

        {post.tags && post.tags.length > 0 ? (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        ) : null}

        <a
          href={readHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-medium text-indigo-600 transition-all hover:text-indigo-700 group-hover:underline dark:text-indigo-400"
        >
          {getBlogReadLabel(post)}
          <FiExternalLink className="h-3 w-3" />
        </a>
      </div>
    </article>
  );
};
