import { useEffect, useState } from 'react';

import { localBlogPosts } from '../data/diary/blogs';
import { fetchSubstackPosts, type BlogPost } from '../lib/substackPosts';

function postTime(post: BlogPost): number {
  if (!post.date) return 0;
  const t = new Date(post.date).getTime();
  return Number.isNaN(t) ? 0 : t;
}

function mergeBlogPosts(remote: BlogPost[], local: BlogPost[]): BlogPost[] {
  const seen = new Set<string>();
  const out: BlogPost[] = [];
  for (const post of [...remote, ...local]) {
    const key = (post.link || post.id).toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(post);
  }
  return out.sort((a, b) => postTime(b) - postTime(a));
}

export function useBlogPosts(limit = 24) {
  const [posts, setPosts] = useState<BlogPost[]>(() => mergeBlogPosts([], localBlogPosts));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchSubstackPosts(limit).then((result) => {
      if (cancelled) return;

      if (result.ok) {
        setPosts(mergeBlogPosts(result.data.posts ?? [], localBlogPosts));
        setError('');
      } else {
        setPosts(mergeBlogPosts([], localBlogPosts));
        setError(result.message);
      }
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [limit]);

  return { posts, loading, error };
}
