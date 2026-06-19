import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FoodPlanDashboard } from '../../components/secret/FoodPlanTabs';
import { FoodPlanChat } from '../../components/secret/FoodPlanChat';
import { useFoodPlan } from '../../hooks/useFoodPlan';
import '../../styles/food-plan.css';

type PageTab = 'plan' | 'claude';

export default function FoodPlan() {
  const { plan } = useFoodPlan();
  const [tab, setTab] = useState<PageTab>('plan');

  return (
    <>
      <Helmet>
        <title>Food plan</title>
        <meta name="robots" content="noindex, nofollow, noarchive" />
      </Helmet>

      <div className="relative left-1/2 w-[min(100vw-1.5rem,56rem)] max-w-none -translate-x-1/2">
        <article className="food-plan pb-10">
          <header className="food-plan__glass mb-5 p-4 sm:p-5">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">Sherrii heals</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">{plan.title}</h1>
          </header>

          <nav className="food-plan__tab-nav mb-6 flex gap-1 rounded-2xl p-1">
            {(
              [
                ['plan', 'Plan'],
                ['claude', 'Ask Claude'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={[
                  'food-plan__tab flex-1 rounded-xl py-2.5 text-sm font-semibold transition',
                  tab === id
                    ? 'food-plan__tab--active bg-white/70 shadow-sm dark:bg-neutral-800/80'
                    : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200',
                ].join(' ')}
              >
                {label}
              </button>
            ))}
          </nav>

          {tab === 'plan' ? <FoodPlanDashboard plan={plan} /> : <FoodPlanChat plan={plan} />}
        </article>
      </div>
    </>
  );
}
