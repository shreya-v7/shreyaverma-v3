import { useMemo, useState } from 'react';
import { achievementsData, achievementGroupSortIndex } from '../../data/achievements';
import { achievementSortKey, sortAchievements } from '../../lib/achievements';
import { AchievementRow } from '../../components/achievement/AchievementRow';
import type { AchievementCategory } from '../../types';

const CATEGORY_ORDER: AchievementCategory[] = [
  'Publication',
  'Scholarship',
  'Certification',
  'Hackathon',
  'Leadership',
  'Award',
];

export default function Achievements() {
  const [activeCategory, setActiveCategory] = useState<'All' | AchievementCategory>('All');

  const categories = useMemo(() => ['All' as const, ...CATEGORY_ORDER], []);

  const displayItems = useMemo(() => {
    const filtered =
      activeCategory === 'All'
        ? achievementsData
        : achievementsData.filter((a) => a.category === activeCategory);

    if (activeCategory === 'All') {
      return sortAchievements(filtered);
    }

    return [...filtered].sort((a, b) => {
      const ga = achievementGroupSortIndex(a.group);
      const gb = achievementGroupSortIndex(b.group);
      if (ga !== gb) return ga - gb;
      return achievementSortKey(b) - achievementSortKey(a);
    });
  }, [activeCategory]);

  return (
    <section id="achievements" className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((c) => {
          const isActive = c === activeCategory;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setActiveCategory(c)}
              className={[
                'px-2.5 py-1 text-xs font-medium rounded-xl transition-colors',
                isActive
                  ? 'bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900'
                  : 'bg-neutral-200 text-neutral-900 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700',
              ].join(' ')}
            >
              {c}
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {displayItems.map((item, index) => {
          const prev = index > 0 ? displayItems[index - 1] : null;
          const showGroupHeading =
            activeCategory !== 'All' &&
            Boolean(item.group) &&
            (!prev || prev.group !== item.group);

          const rowKey = `${item.title}-${item.date ?? item.year ?? ''}-${item.context}-${index}`;

          return (
            <div key={rowKey} className="space-y-3">
              {showGroupHeading ? (
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                  {item.group}
                </h3>
              ) : null}
              <AchievementRow item={item} index={index} open={index === 0} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
