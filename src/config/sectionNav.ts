import type { DiarySectionType, SectionType } from '../types';

export const DIARY_TV_PATH = '/diary/cinema';

/** Film watch diary (subset of cinema data with `metadata.movie`). */
export const DIARY_MOVIES_PATH = '/diary/movies';

/** Long-form writing (blog-style posts). Canonical URL. */
export const DIARY_BLOGS_PATH = '/diary/blogs';

/** Friendly alias; redirects to {@link DIARY_BLOGS_PATH} in the router. */
export const DIARY_NOTES_PATH = '/diary/notes';

export const ABOUT_NAV: { id: SectionType; label: string; path: string }[] = [
  { id: 'experience', label: 'Experience', path: '/about/experience' },
  { id: 'education', label: 'Education', path: '/about/education' },
  { id: 'certifications', label: 'Certifications', path: '/about/certifications' },
  { id: 'achievements', label: 'Achievements', path: '/about/achievements' },
];

/** Order matches diary landing preview: blogs → books → music → movies → TV. */
export const DIARY_NAV: { id: DiarySectionType; label: string; path: string }[] = [
  { id: 'blogs', label: 'Blogs', path: DIARY_BLOGS_PATH },
  { id: 'books', label: 'Books', path: '/diary/books' },
  { id: 'music', label: 'Music', path: '/diary/music' },
  { id: 'movies', label: 'Movies', path: DIARY_MOVIES_PATH },
  { id: 'cinema', label: 'TV shows', path: DIARY_TV_PATH },
];
