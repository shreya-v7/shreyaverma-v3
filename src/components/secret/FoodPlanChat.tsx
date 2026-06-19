import type { FormEvent } from 'react';
import type { FoodPlan } from '../../types/foodPlan';
import { useFoodPlanChat } from '../../hooks/useFoodPlanChat';

export function FoodPlanChat({ plan }: { plan: FoodPlan }) {
  const { messages, input, setInput, loading, error, send, endRef } = useFoodPlanChat(plan);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void send();
  };

  return (
    <div className="food-plan food-plan__glass food-plan__chat-panel flex flex-col p-4 sm:p-5">
      <div className="food-plan__chat flex-1 space-y-3 pr-1">
        {messages.map((msg, i) => (
          <div
            key={`${msg.role}-${i}`}
            className={[
              'max-w-[92%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
              msg.role === 'user'
                ? 'food-plan__bubble-user ml-auto text-neutral-900 dark:text-neutral-100'
                : 'food-plan__bubble-assistant text-neutral-700 dark:text-neutral-300',
            ].join(' ')}
          >
            {msg.content}
          </div>
        ))}
        {loading ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Thinking…</p>
        ) : null}
        <div ref={endRef} />
      </div>

      {error ? <p className="mt-2 text-xs text-red-600 dark:text-red-400">{error}</p> : null}

      <form onSubmit={onSubmit} className="mt-4 flex gap-2 border-t border-neutral-200/40 pt-4 dark:border-neutral-700/40">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What should I eat tonight? Swap ideas? Grocery help?"
          disabled={loading}
          className="food-plan__input min-w-0 flex-1 rounded-full px-4 py-2.5 text-sm placeholder:text-neutral-500 dark:placeholder:text-neutral-500"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="shrink-0 rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-600/20 hover:bg-emerald-700 disabled:opacity-40"
        >
          Send
        </button>
      </form>
    </div>
  );
}
