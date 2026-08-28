const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;
const MONTH_INDEX: Record<string, number> = Object.fromEntries(MONTH_NAMES.map((m, i) => [m, i]));

export const formatDate = (dateString: string): string =>
  new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

/** Longest path wins so nested paths (e.g. `/diary/cinema/slug`) map to the right section id. */
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

function parseMonthYear(value: string, asEnd = false): Date {
  const raw = (value || '').trim();
  if (!raw) return new Date(0);
  if (raw.toLowerCase() === 'present') return new Date(9999, 11, 31);
  if (/^\d{4}$/.test(raw)) {
    const y = Number.parseInt(raw, 10);
    return new Date(y, asEnd ? 11 : 0);
  }
  const [month, year] = raw.split(/\s+/);
  const m = MONTH_INDEX[month ?? ''];
  const y = Number.parseInt(year ?? '', 10);
  return Number.isNaN(y) || m === undefined ? new Date(0) : new Date(y, m);
}

/** Latest end date in a "Mon YYYY - Mon YYYY|Present" range. Present sorts as most recent. */
export function durationEndDate(duration: string): Date {
  const parts = duration.split(' - ').map((s) => s.trim());
  const end = parts[1] || parts[0] || '';
  return parseMonthYear(end || 'Present', true);
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
    const endDate = parseMonthYear(endStr ?? '', true);
    if (!earliestStart || startDate < earliestStart) earliestStart = startDate;
    if (!latestEnd || endDate > latestEnd) latestEnd = endDate;
  }

  return earliestStart && latestEnd
    ? `${formatMonthYear(earliestStart)} - ${formatMonthYear(latestEnd)}`
    : roles[0].duration;
};

/** Deterministic hex color from a string (stable across reloads/SSR). Dark enough for white text. */
export function stableTagColor(input: string): string {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (Math.imul(31, h) + input.charCodeAt(i)) | 0;
  let r = (h >> 16) & 0xff;
  let g = (h >> 8) & 0xff;
  let b = h & 0xff;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  if (luminance > 0.52) {
    const scale = 0.42 / Math.max(luminance, 0.01);
    r = Math.min(255, Math.round(r * scale));
    g = Math.min(255, Math.round(g * scale));
    b = Math.min(255, Math.round(b * scale));
  }
  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('')}`;
}
