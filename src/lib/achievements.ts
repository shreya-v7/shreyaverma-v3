import type { Achievement } from '../types';

export function achievementSortKey(a: Achievement): number {
  if (a.date) {
    const normalized = a.date.length === 7 ? `${a.date}-01` : a.date;
    const t = new Date(normalized).getTime();
    if (!Number.isNaN(t)) return t;
  }
  if (typeof a.year === 'number') return new Date(`${a.year}-01-01`).getTime();
  return 0;
}

export function sortAchievements(items: Achievement[]): Achievement[] {
  return [...items].sort((a, b) => achievementSortKey(b) - achievementSortKey(a));
}

export function formatAchievementDateLabel(a: Achievement): string {
  if (a.date) {
    const normalized = a.date.length === 7 ? `${a.date}-01` : a.date;
    const d = new Date(normalized);
    if (!Number.isNaN(d.getTime())) {
      return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short' });
    }
  }
  if (typeof a.year === 'number') return String(a.year);
  return '';
}
