const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;
const MONTH_INDEX: Record<string, number> = Object.fromEntries(MONTH_NAMES.map((m, i) => [m, i]));

export const formatDate = (dateString: string): string =>
  new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

/** Compact label for cards and lists (e.g. "Jan 15, 2024"). Returns "" if missing/invalid. */
export const formatShortDate = (value?: string): string => {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' });
};

/** Longest path wins so nested paths (e.g. `/diary/movies/slug`) map to the right section id. */
export function activeSectionFromPath<T extends string>(
  pathname: string,
  sections: readonly { id: T; path: string }[],
  fallback: T,
): T {
  const sorted = [...sections].sort((a, b) => b.path.length - a.path.length);
  for (const s of sorted) {
    if (pathname === s.path || pathname.startsWith(`${s.path}/`)) return s.id;
  }
  return fallback;
}

function parseMonthYear(value: string): Date {
  if (value.toLowerCase() === 'present') return new Date(9999, 11, 31);
  const [month, year] = value.trim().split(' ');
  const m = MONTH_INDEX[month ?? ''];
  const y = Number.parseInt(year ?? '', 10);
  return Number.isNaN(y) || m === undefined ? new Date(0) : new Date(y, m);
}

function formatMonthYear(date: Date): string {
  if (date.getFullYear() === 9999) return 'Present';
  return `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

export const getCompanyDuration = (roles: Array<{ duration: string }>): string => {
  if (!roles.length) return '';
  if (roles.length === 1) return roles[0]?.duration || '';

  let earliestStart: Date | null = null;
  let latestEnd: Date | null = null;

  for (const role of roles) {
    const [startStr, endStr] = role.duration.split(' - ').map((s) => s.trim());
    const startDate = parseMonthYear(startStr ?? '');
    const endDate = parseMonthYear(endStr ?? '');
    if (!earliestStart || startDate < earliestStart) earliestStart = startDate;
    if (!latestEnd || endDate > latestEnd) latestEnd = endDate;
  }

  return earliestStart && latestEnd
    ? `${formatMonthYear(earliestStart)} - ${formatMonthYear(latestEnd)}`
    : roles[0].duration;
};

/** Deterministic hex color from a string (stable across reloads/SSR). */
export function stableTagColor(input: string): string {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (Math.imul(31, h) + input.charCodeAt(i)) | 0;
  const hex = (h & 0xffffff).toString(16).padStart(6, '0');
  return `#${hex}`;
}

export const generateTechStackColors = (
  items: Array<{ roles?: Array<{ techStack: string[] }>; techStack?: string[] }>,
): Record<string, string> => {
  const colors: Record<string, string> = {};
  for (const item of items) {
    const stack = item.roles ? item.roles.flatMap((r) => r.techStack) : item.techStack ?? [];
    for (const tech of stack) {
      if (!colors[tech]) colors[tech] = stableTagColor(tech);
    }
  }
  return colors;
};
