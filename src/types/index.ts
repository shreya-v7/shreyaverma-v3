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
}

export interface Certificate {
  title: string;
  date: string;
  image: string;
}

export interface Blog {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  url: string;
}

export interface Project {
  title: string;
  description: string;
  date: string;
  category: string;
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

export type SortOrder = 'latest' | 'oldest';
export type SectionType = 'experience' | 'education' | 'certifications' | 'achievements';
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
  content?: string; // Added for blog write-ups
  type: 'music' | 'books' | 'cinema' | 'blogs';
  metadata?: {
    artist?: string;
    album?: string;
    author?: string;
    book?: string;
    movie?: string;
    show?: string;
    location?: string;
    rating?: number;
    detailedReview?: string[];
  };
}

// Sherrii types
export type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
