import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogsPosts } from '../../data/diary/blogs';
import { formatDate } from '../../utils';
import { FiArrowLeft, FiCalendar } from 'react-icons/fi';

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const post = blogsPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">Blog Not Found</h1>
        <Link to="/diary/blogs" className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title || 'Blog'} | Shreya Verma</title>
        <meta name="description" content={post.caption} />
      </Helmet>
      <article className="max-w-3xl mx-auto">
        <Link
          to="/diary/blogs"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 mb-6 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Back to Blogs</span>
        </Link>

        <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-8 shadow-lg">
          {/* Header */}
          <div className="mb-6">
            {post.date && (
              <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                <FiCalendar className="w-4 h-4" />
                <span>{formatDate(post.date)}</span>
              </div>
            )}
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              {post.title || 'Untitled'}
            </h1>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 text-sm font-medium rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          {post.content && (
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <div className="text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
                {post.content}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}

