import type { ImgHTMLAttributes } from 'react';

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  /** Above-the-fold LCP image. Do not use for catalog thumbnails. */
  priority?: boolean;
};

/** Shared img defaults: async decode, lazy unless `priority`. */
export function SiteImage({
  priority = false,
  decoding = 'async',
  loading,
  fetchPriority,
  alt = '',
  ...props
}: Props) {
  return (
    <img
      alt={alt}
      decoding={decoding}
      loading={loading ?? (priority ? 'eager' : 'lazy')}
      fetchPriority={fetchPriority ?? (priority ? 'high' : undefined)}
      {...props}
    />
  );
}
