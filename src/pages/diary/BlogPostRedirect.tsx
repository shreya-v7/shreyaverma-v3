import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DIARY_BLOGS_PATH } from '../../config/sectionNav';
import { useBlogPosts } from '../../hooks/useBlogPosts';

/** Legacy /diary/blogs/:id URLs: send visitors to the live post when possible. */
export default function BlogPostRedirect() {
  const { id } = useParams<{ id: string }>();
  const { posts, loading } = useBlogPosts(48);
  const post = posts.find((p) => p.id === id);

  useEffect(() => {
    if (post?.link) window.location.replace(post.link);
  }, [post?.link]);

  if (loading && !post) {
    return <p className="py-16 text-center text-sm text-neutral-500 dark:text-neutral-400">Loading…</p>;
  }

  if (post?.link) {
    return (
      <p className="py-16 text-center text-sm text-neutral-500 dark:text-neutral-400">
        Redirecting…{' '}
        <a href={post.link} className="text-indigo-600 underline dark:text-indigo-400">
          Open post
        </a>
      </p>
    );
  }

  return (
    <div className="py-16 text-center">
      <p className="mb-4 text-neutral-600 dark:text-neutral-400">Post not found.</p>
      <Link to={DIARY_BLOGS_PATH} className="text-indigo-600 underline dark:text-indigo-400">
        Back to Blogs
      </Link>
    </div>
  );
}
