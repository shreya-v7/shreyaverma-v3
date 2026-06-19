import { useEffect, useState } from 'react';

import { blogsPosts as localPosts } from '../data/diary/blogs';
import { fetchSubstackPosts, type BlogPost } from '../lib/substackPosts';

function mergePosts(remote: BlogPost[], local: BlogPost[]): BlogPost[] {
  const seen = new Set<string>();
  const out: BlogPost[] = [];

  for (const post of [...remote, ...local.map((p) => ({ ...p, source: 'local' as const }))]) {
    const key = post.link || post.id;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(post);
  }

  return out.sort((a, b) => new Date(b.date ?? '').getTime() - new Date(a.date ?? '').getTime());
}

export function useBlogPosts(limit = 24) {
  const [posts, setPosts] = useState<BlogPost[]>(() =>
    localPosts.map((p) => ({ ...p, source: 'local' as const })),
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchSubstackPosts(limit).then((result) => {
      if (cancelled) return;

      const local = localPosts.map((p) => ({ ...p, source: 'local' as const }));

      if (result.ok) {
        const remote = result.data.posts ?? [];
        setPosts(mergePosts(remote, local));
        setError('');
      } else {
        setPosts(local);
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
