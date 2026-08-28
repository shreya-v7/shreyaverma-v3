// Shared types and interfaces

export interface Role {
  title: string;
  duration: string;
  content: string[];
  awards?: string;
  techStack: string[];
}

export interface Company {
  company: string;
  logo: string;
  roles: Role[];
  /** One-line collapsed preview. Grounded in the role writeup, not extra claims. */
  hook?: string;
  /** Skills to surface on the collapsed card. */
  highlights?: string[];
}

export interface Certificate {
  title: string;
  date: string;
  image: string;
}

export interface Project {
  title: string;
  description: string;
  date: string;
  image: string;
  link: string;
  tags: string[];
}

export type AchievementCategory =
  | 'Award'
  | 'Publication'
  | 'Scholarship'
  | 'Certification'
  | 'Hackathon'
  | 'Leadership';

export interface Achievement {
  title: string;
  category: AchievementCategory;
  /**
   * Optional heading to cluster related rows in the full list (e.g. "Morgan Stanley").
   */
  group?: string;
  /**
   * ISO-ish date (YYYY-MM or YYYY-MM-DD) when received/published.
   * Use when known so we can sort accurately.
   */
  date?: string;
  /** Fallback when only year is known. */
  year?: number;
  context: string;
  highlight: string;
  details?: string[];
  link?: string;
}

export type SectionType = 'experience' | 'education' | 'research' | 'leadership' | 'honors';
export type DiarySectionType = 'music' | 'books' | 'cinema' | 'blogs';

// Personal content types
export interface PersonalPost {
  id: string;
  title?: string;
  caption: string;
  image?: string;
  date?: string;
  tags?: string[];
  link?: string;
  type: 'books' | 'cinema' | 'blogs';
  metadata?: {
    author?: string;
    book?: string;
    movie?: string;
    show?: string;
    detailedReview?: string[];
  };
}

// Sherrii types
export type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
