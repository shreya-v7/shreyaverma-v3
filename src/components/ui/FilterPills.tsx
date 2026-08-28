type Item<T extends string> = {
  id: T;
  label: string;
};

type Props<T extends string> = {
  items: Item<T>[];
  activeId: T;
  onChange: (id: T) => void;
};

export function FilterPills<T extends string>({ items, activeId, onChange }: Props<T>) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
      {items.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors duration-300 ${
            activeId === id
              ? 'bg-neutral-800 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900'
              : 'bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-200'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
