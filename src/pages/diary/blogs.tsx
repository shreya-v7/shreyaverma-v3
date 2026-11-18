import { BlogCard } from '../../components/ui/BlogCard';
import { Pagination } from '../../components/ui/Pagination';
import { ApiLoadError } from '../../components/ui/ApiLoadError';
import { ParticleField } from '../../components/ui/ParticleField';
import { Seo } from '../../components/seo/Seo';
import { DIARY_BLOGS_PATH } from '../../config/sectionNav';
import { metaData } from '../../config/config';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import { usePagination } from '../../hooks/usePagination';

const POSTS_PER_PAGE = 6;

export default function Blogs() {
  const { posts, loading, error } = useBlogPosts(48);
  const { currentPage, setCurrentPage, totalPages, pageItems } = usePagination(posts, POSTS_PER_PAGE);
  const emptyError = Boolean(error) && !loading && posts.length === 0;

  return (
    <section className="relative z-10">
      {emptyError ? (
        <Seo
          title={`Diary - Blogs | ${metaData.name}`}
          description="Writing could not be loaded from Substack."
          path={DIARY_BLOGS_PATH}
          noindex
        />
      ) : null}
      <ParticleField type="blogs" count={18} />
      {error && !loading ? (
        <div className="mb-6">
          <ApiLoadError
            title="Could not load Substack posts"
            message={error}
            hint={
              <>Your other writing is still available below. Please try again shortly.</>
            }
          />
        </div>
      ) : null}

      {loading && posts.length === 0 ? (
        <p className="py-12 text-center text-sm text-neutral-500 dark:text-neutral-400">Loading posts from Substack…</p>
      ) : null}

      {!loading || posts.length > 0 ? (
        <>
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {pageItems.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {posts.length === 0 && !loading && !error ? (
            <p className="py-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
              No posts yet. Publish on Substack and they will show up here automatically.
            </p>
          ) : null}

          {posts.length > 0 ? (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          ) : null}
        </>
      ) : null}
    </section>
  );
}
