import { useState, type ReactNode } from 'react';
import type { FoodPlan, MealItem } from '../../types/foodPlan';

function Label({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
      {children}
    </h2>
  );
}

const MEALS_INITIAL = 4;

function MealColumn({ title, subtitle, items }: { title: string; subtitle: string; items: MealItem[] }) {
  const [expanded, setExpanded] = useState(false);
  const hiddenCount = Math.max(0, items.length - MEALS_INITIAL);
  const visibleItems = expanded ? items : items.slice(0, MEALS_INITIAL);

  return (
    <div className="food-plan__glass p-4">
      <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{title}</p>
      <p className="text-xs text-neutral-500 dark:text-neutral-400">{subtitle}</p>
      <ol className="mt-3 space-y-3 border-t border-neutral-200/50 pt-3 dark:border-neutral-700/50">
        {visibleItems.map((meal, i) => (
          <li key={`${meal.title}-${i}`}>
            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
              <span className="mr-1 inline-flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500/10 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                {i + 1}
              </span>
              {meal.title}
            </p>
            <p className="mt-1 pl-6 text-xs font-mono text-emerald-700 dark:text-emerald-400">{meal.macros}</p>
            <p className="mt-1 pl-6 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">{meal.description}</p>
          </li>
        ))}
      </ol>
      {hiddenCount > 0 ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="food-plan__chip mt-3 w-full rounded-xl py-2 text-xs font-semibold text-emerald-700 transition hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300"
        >
          {expanded ? 'Show less' : `+${hiddenCount} more`}
        </button>
      ) : null}
    </div>
  );
}

type ExtraSectionId = 'snacks' | 'prep' | 'rules' | 'grocery' | 'recipes';

function ExtrasPanel({ plan }: { plan: FoodPlan }) {
  const [open, setOpen] = useState<ExtraSectionId | null>(null);

  const sections: { id: ExtraSectionId; label: string; count?: number }[] = [
    { id: 'snacks', label: 'Snacks', count: plan.snacks.length },
    { id: 'prep', label: 'Sunday prep', count: plan.sundayPrep.length },
    { id: 'rules', label: 'Rules', count: plan.rules.length },
    { id: 'grocery', label: 'Grocery' },
    { id: 'recipes', label: 'Recipes', count: plan.recipes.length },
  ];

  return (
    <section className="food-plan__glass p-4 sm:p-5">
      <Label>Quick reference</Label>
      <div className="mt-3 flex flex-wrap gap-2">
        {sections.map(({ id, label, count }) => {
          const active = open === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setOpen((c) => (c === id ? null : id))}
              className={[
                'food-plan__chip rounded-full px-3.5 py-1.5 text-xs font-semibold transition',
                active ? 'food-plan__chip--active' : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100',
              ].join(' ')}
            >
              {label}
              {count !== undefined ? <span className="opacity-60"> · {count}</span> : null}
            </button>
          );
        })}
      </div>

      {open ? (
        <div className="food-plan__expand mt-4 rounded-xl border border-neutral-200/40 bg-white/30 p-4 text-sm leading-relaxed text-neutral-700 dark:border-neutral-700/40 dark:bg-white/[0.03] dark:text-neutral-300">
          {open === 'snacks' ? (
            <ul className="flex flex-wrap gap-2">
              {plan.snacks.map((item) => (
                <li key={item} className="food-plan__chip rounded-full px-3 py-1.5 text-xs">
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
          {open === 'prep' ? (
            <ul className="space-y-2">
              {plan.sundayPrep.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {open === 'rules' ? (
            <ul className="space-y-2">
              {plan.rules.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {open === 'grocery' ? (
            <div className="space-y-2">
              <p className="text-xs font-mono text-neutral-500">{plan.grocery.budget}</p>
              <p><span className="font-medium text-neutral-900 dark:text-neutral-100">Produce:</span> {plan.grocery.produce}</p>
              <p><span className="font-medium text-neutral-900 dark:text-neutral-100">Protein:</span> {plan.grocery.protein}</p>
              <p><span className="font-medium text-neutral-900 dark:text-neutral-100">Pantry:</span> {plan.grocery.pantry}</p>
            </div>
          ) : null}
          {open === 'recipes' ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {plan.recipes.map((recipe) => (
                <div key={recipe.title} className="food-plan__chip rounded-xl p-3">
                  <p className="font-medium text-neutral-900 dark:text-neutral-100">{recipe.title}</p>
                  <ul className="mt-2 space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
                    {recipe.lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

export function FoodPlanDashboard({ plan }: { plan: FoodPlan }) {
  const [mealTab, setMealTab] = useState<'breakfast' | 'lunch' | 'dinner'>('breakfast');
  const mealGroups = {
    breakfast: { title: 'Breakfast', subtitle: '≤10 min', items: plan.breakfasts },
    lunch: { title: 'Lunch', subtitle: '≤15 min', items: plan.lunches },
    dinner: { title: 'Dinner', subtitle: '≤12 min', items: plan.dinners },
  } as const;

  return (
    <div className="food-plan space-y-5">
      <section className="food-plan__glass p-4 sm:p-5">
        <Label>Daily rhythm</Label>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {plan.dailyDefaults.map((item) => (
            <li key={item} className="food-plan__chip rounded-xl px-3 py-2.5 text-sm text-neutral-800 dark:text-neutral-200">
              {item}
            </li>
          ))}
        </ul>
        <div className="food-plan__glass food-plan__glass--accent mt-4 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-800 dark:text-emerald-300">Daily target</p>
          <p className="mt-1 text-base font-semibold text-emerald-950 dark:text-emerald-100">{plan.dailyTarget.summary}</p>
          <p className="mt-2 text-xs leading-relaxed text-emerald-900/80 dark:text-emerald-400/90">{plan.dailyTarget.floor}</p>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between gap-3 px-1">
          <Label>Meals</Label>
          <div className="food-plan__tab-nav flex gap-1 rounded-full p-0.5 lg:hidden">
            {(['breakfast', 'lunch', 'dinner'] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setMealTab(key)}
                className={[
                  'rounded-full px-3 py-1 text-xs font-semibold capitalize transition',
                  mealTab === key
                    ? 'bg-white/80 text-emerald-800 shadow-sm dark:bg-neutral-800/90 dark:text-emerald-300'
                    : 'text-neutral-500 dark:text-neutral-400',
                ].join(' ')}
              >
                {key}
              </button>
            ))}
          </div>
        </div>
        <div className="hidden gap-4 lg:grid lg:grid-cols-3">
          <MealColumn title="Breakfast" subtitle="≤10 min" items={plan.breakfasts} />
          <MealColumn title="Lunch" subtitle="≤15 min" items={plan.lunches} />
          <MealColumn title="Dinner" subtitle="≤12 min" items={plan.dinners} />
        </div>
        <div className="lg:hidden">
          <MealColumn {...mealGroups[mealTab]} />
        </div>
      </section>

      <ExtrasPanel plan={plan} />
    </div>
  );
}
