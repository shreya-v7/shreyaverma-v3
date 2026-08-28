import type { ReactNode } from 'react';

type Props = {
  title: string;
  message: string;
  hint?: ReactNode;
};

export function ApiLoadError({ title, message, hint }: Props) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 text-sm text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900/70 dark:text-neutral-300">
      <p className="font-medium text-neutral-900 dark:text-neutral-100">{title}</p>
      <p className="mt-1 whitespace-pre-wrap break-words">{message}</p>
      {hint ? <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">{hint}</p> : null}
    </div>
  );
}
