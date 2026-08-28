import { Link } from 'react-router-dom';

type Props = {
  kind: string;
  title: string;
  blurb?: string;
  href?: string;
  external?: boolean;
};

export function HighlightCard({ kind, title, blurb, href, external = false }: Props) {
  const body = (
    <>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
        {kind}
      </p>
      <h3 className="mt-1.5 text-sm font-semibold text-neutral-900 dark:text-neutral-100">{title}</h3>
      {blurb ? (
        <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-600 dark:text-neutral-300 line-clamp-2">
          {blurb}
        </p>
      ) : null}
    </>
  );

  const className =
    'block rounded-xl border border-neutral-200 bg-white px-4 py-3 shadow-sm dark:border-neutral-700 dark:bg-neutral-800';

  if (!href) {
    return <article className={className}>{body}</article>;
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${className} transition hover:border-neutral-400 dark:hover:border-neutral-500`}>
        {body}
      </a>
    );
  }

  return (
    <Link to={href} className={`${className} transition hover:border-neutral-400 dark:hover:border-neutral-500`}>
      {body}
    </Link>
  );
}
