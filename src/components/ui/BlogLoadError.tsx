type Props = { message: string };

export function BlogLoadError({ message }: Props) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 text-sm text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900/70 dark:text-neutral-300">
      <p className="font-medium text-neutral-900 dark:text-neutral-100">Could not load Substack posts</p>
      <p className="mt-1 whitespace-pre-wrap break-words">{message}</p>
      <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
        Set <code className="rounded bg-neutral-200/80 px-1 dark:bg-neutral-800">SUBSTACK_PUBLICATION_URL</code> to your @handle (
        <code className="rounded bg-neutral-200/80 px-1 dark:bg-neutral-800">shreyaverma1</code>). Locally run{' '}
        <code className="rounded bg-neutral-200/80 px-1 dark:bg-neutral-800">netlify dev</code>.
      </p>
    </div>
  );
}
