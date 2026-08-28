import { useMemo, useState, type ReactNode } from 'react';
import { certificates } from '../../data/certificates';
import { achievementsData } from '../../data/achievements';
import { CertificateCard } from '../../components/ui/CertificateCard';
import { AchievementRow } from '../../components/achievement/AchievementRow';
import type { AchievementCategory } from '../../types';

const ACHIEVEMENT_SECTIONS: { id: AchievementCategory; label: string }[] = [
  { id: 'Award', label: 'Awards' },
  { id: 'Publication', label: 'Publications' },
  { id: 'Scholarship', label: 'Scholarships' },
  { id: 'Hackathon', label: 'Hackathons' },
  { id: 'Leadership', label: 'Speaking & leadership' },
];

function ExpandSection({
  title,
  count,
  defaultOpen = false,
  children,
}: {
  title: string;
  count: number;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-2xl border border-neutral-200 bg-white/70 dark:border-neutral-700 dark:bg-neutral-900/70"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3">
        <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{title}</span>
        <span className="flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">{count}</span>
          <span className="text-xs text-neutral-400 transition-transform group-open:rotate-90">→</span>
        </span>
      </summary>
      <div className="border-t border-neutral-200 px-4 py-4 dark:border-neutral-700">{children}</div>
    </details>
  );
}

export default function Honors() {
  const [visibleCerts, setVisibleCerts] = useState(4);
  const extraCerts = useMemo(
    () =>
      achievementsData.filter(
        (a) =>
          a.category === 'Certification' &&
          !certificates.some((c) => c.title.toLowerCase().includes(a.title.toLowerCase().slice(0, 18))),
      ),
    [],
  );

  return (
    <section id="honors" className="space-y-3">
      {ACHIEVEMENT_SECTIONS.map(({ id, label }) => {
        const items = achievementsData.filter((a) => a.category === id);
        if (items.length === 0) return null;
        return (
          <ExpandSection key={id} title={label} count={items.length} defaultOpen={id === 'Award'}>
            <div className="space-y-3">
              {items.map((item, index) => (
                <AchievementRow
                  key={`${item.title}-${item.date ?? item.year ?? ''}-${index}`}
                  item={item}
                  index={index}
                  open={false}
                />
              ))}
            </div>
          </ExpandSection>
        );
      })}

      <ExpandSection title="Certifications" count={certificates.length + extraCerts.length}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {certificates.slice(0, visibleCerts).map((cert) => (
            <CertificateCard key={cert.title} certificate={cert} />
          ))}
        </div>
        {visibleCerts < certificates.length && (
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCerts((n) => n + 4)}
              className="rounded-md bg-neutral-200 px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
            >
              Load more
            </button>
          </div>
        )}
        {extraCerts.length > 0 && (
          <div className="mt-4 space-y-3">
            {extraCerts.map((item, index) => (
              <AchievementRow
                key={`${item.title}-${item.date ?? item.year ?? ''}`}
                item={item}
                index={index}
                open={false}
              />
            ))}
          </div>
        )}
      </ExpandSection>
    </section>
  );
}
