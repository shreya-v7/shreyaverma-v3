type Props = { message: string };

/** Spotify API / embed failure (music page). */
export function MusicLoadError({ message }: Props) {
  return (
    <div className="max-w-2xl rounded-2xl border border-neutral-900/15 bg-white/80 px-5 py-6 text-neutral-900 shadow-[0_18px_54px_-32px_rgba(0,0,0,0.38)] dark:border-white/15 dark:bg-neutral-950/70 dark:text-neutral-100">
      <p className="text-sm font-semibold tracking-wide">Spotify request failed</p>
      <p className="mt-2 text-sm text-neutral-700 whitespace-pre-wrap break-words dark:text-neutral-300">{message}</p>
      <p className="mt-3 text-[11px] text-neutral-500 dark:text-neutral-400">
        Locally: run <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-900">netlify dev</code> then{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-900">npm run dev</code>, with{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-900">SPOTIFY_*</code> set in{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-900">.env</code> (never commit secrets).
      </p>
    </div>
  );
}
