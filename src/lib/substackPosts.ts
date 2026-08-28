import type { PersonalPost } from '../types';
import { fetchJson } from './api';

export type BlogPost = PersonalPost & { source?: 'substack' | 'medium' };

export type SubstackPostsPayload = {
  posts: BlogPost[];
  publicationUrl?: string;
};

export function fetchSubstackPosts(limit = 24, offset = 0) {
  const q = new URLSearchParams({ limit: String(limit), offset: String(offset) });
  return fetchJson<SubstackPostsPayload>(`/api/substack-posts?${q}`);
}

export function getBlogReadLabel(post: PersonalPost & { source?: string }): string {
  if (post.source === 'medium' || post.link?.includes('medium.com')) return 'Read on Medium';
  if (post.source === 'substack' || post.link?.includes('substack.com')) return 'Read on Substack';
  return 'Read post';
}
