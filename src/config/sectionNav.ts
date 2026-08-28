import type { DiarySectionType, SectionType } from '../types';

export const DIARY_CINEMA_PATH = '/diary/cinema';

/** Old movies-only URL. Redirects to cinema. */
export const DIARY_MOVIES_PATH = '/diary/movies';

/** Long-form writing (blog-style posts). Canonical URL. */
export const DIARY_BLOGS_PATH = '/diary/blogs';

export const ABOUT_NAV: { id: SectionType; label: string; path: string }[] = [
  { id: 'experience', label: 'Industry', path: '/about/experience' },
  { id: 'education', label: 'Education', path: '/about/education' },
  { id: 'research', label: 'Research', path: '/about/research' },
  { id: 'leadership', label: 'Leadership', path: '/about/leadership' },
  { id: 'honors', label: 'Honors', path: '/about/honors' },
];

/** Order matches diary landing preview: blogs, books, music, cinema. */
export const DIARY_NAV: { id: DiarySectionType; label: string; path: string }[] = [
  { id: 'blogs', label: 'Blogs', path: DIARY_BLOGS_PATH },
  { id: 'books', label: 'Books', path: '/diary/books' },
  { id: 'music', label: 'Music', path: '/diary/music' },
  { id: 'cinema', label: 'Cinema', path: DIARY_CINEMA_PATH },
];

/** First-party routes for sitemap and canonical URLs. Substack posts are omitted: they are fetched at runtime and canonical on Substack/Medium. */
export const STATIC_PATHS = [
  '/',
  '/about',
  ...ABOUT_NAV.map((s) => s.path),
  '/diary',
  ...DIARY_NAV.map((s) => s.path),
  '/projects',
  '/contact',
] as const;
