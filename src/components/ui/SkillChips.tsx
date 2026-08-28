import { stableTagColor } from '../../utils';

export function SkillChips({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full px-2.5 py-1 text-[11px] font-semibold text-white"
          style={{ backgroundColor: stableTagColor(item) }}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
