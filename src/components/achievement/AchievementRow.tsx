import type { Achievement, AchievementCategory } from '../../types';
import { formatAchievementDateLabel } from '../../lib/achievements';

const chipStyles: Record<AchievementCategory, string> = {
  Publication:
    'bg-sky-100 text-sky-900 dark:bg-sky-900/50 dark:text-sky-100',
  Scholarship:
    'bg-violet-100 text-violet-900 dark:bg-violet-900/50 dark:text-violet-100',
  Certification:
    'bg-amber-100 text-amber-900 dark:bg-amber-900/50 dark:text-amber-100',
  Hackathon:
    'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/50 dark:text-emerald-100',
  Leadership:
    'bg-fuchsia-100 text-fuchsia-900 dark:bg-fuchsia-900/50 dark:text-fuchsia-100',
  Award:
    'bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-100',
};

type Props = {
  item: Achievement;
  index: number;
  open: boolean;
};

export function AchievementRow({ item, index, open }: Props) {
  const dateLabel = formatAchievementDateLabel(item);
  const isRecent =
    item.date?.startsWith(String(new Date().getFullYear())) ||
    item.year === new Date().getFullYear();

  return (
    <details
      className="group rounded-2xl border border-neutral-200 bg-white/70 px-4 py-3 text-sm shadow-sm transition hover:bg-white dark:border-neutral-700 dark:bg-neutral-900/70 dark:hover:bg-neutral-900"
      open={open}
    >
      <summary className="flex cursor-pointer list-none items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 text-[11px] font-semibold text-white dark:bg-neutral-100 dark:text-neutral-900">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              className={[
                'rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em]',
                chipStyles[item.category],
              ].join(' ')}
            >
              {item.category}
            </span>
            {dateLabel ? (
              <span className="text-xs font-mono uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
                {dateLabel}
              </span>
            ) : null}
            {isRecent ? (
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200">
                Recent
              </span>
            ) : null}
          </div>

          <h3 className="mt-2 text-sm font-semibold text-neutral-900 dark:text-neutral-50">{item.title}</h3>
          <p className="mt-1 text-[13px] text-neutral-600 dark:text-neutral-300">{item.context}</p>
          <p className="mt-2 text-[13px] text-neutral-700 dark:text-neutral-300">{item.highlight}</p>
        </div>

        <span className="mt-1 shrink-0 text-xs text-neutral-400 dark:text-neutral-500 transition-transform group-open:rotate-90">
          →
        </span>
      </summary>

      {(item.details?.length || item.link) && (
        <div className="mt-3 space-y-3">
          {item.details && item.details.length > 0 && (
            <ul className="space-y-1.5 text-[13px] text-neutral-600 dark:text-neutral-300">
              {item.details.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-1 h-[3px] w-[3px] shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                  <span className="flex-1">{line}</span>
                </li>
              ))}
            </ul>
          )}

          {item.link ? (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-neutral-800 underline underline-offset-4 hover:text-neutral-950 dark:text-neutral-200 dark:hover:text-white"
            >
              Open link <span>→</span>
            </a>
          ) : null}
        </div>
      )}
    </details>
  );
}
