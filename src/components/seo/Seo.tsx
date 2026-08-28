import { Helmet } from 'react-helmet-async';
import { metaData, socialLinks } from '../../config/config';

export function absoluteUrl(path = '/'): string {
  const origin = metaData.baseUrl.replace(/\/$/, '');
  if (!path || path === '/') return `${origin}/`;
  return `${origin}${path.startsWith('/') ? path : `/${path}`}`;
}

export function absoluteImageUrl(src?: string): string {
  if (!src) return absoluteUrl(metaData.ogImage);
  if (/^https?:\/\//i.test(src)) return src;
  return absoluteUrl(src.startsWith('/') ? src : `/${src}`);
}

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: metaData.name,
    url: metaData.baseUrl,
    image: absoluteImageUrl(metaData.ogImage),
    jobTitle: 'Graduate student, Carnegie Mellon University',
    description: metaData.description,
    sameAs: [socialLinks.github, socialLinks.linkedin, socialLinks.twitter, socialLinks.instagram],
    email: 'shreya.verma2000@gmail.com',
  };
}

type SeoProps = {
  title: string;
  description: string;
  path: string;
  ogType?: 'website' | 'article' | 'profile';
  image?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

export function Seo({
  title,
  description,
  path,
  ogType = 'website',
  image,
  noindex = false,
  jsonLd,
}: SeoProps) {
  const url = absoluteUrl(path);
  const ogImage = absoluteImageUrl(image || metaData.ogImage);
  const jsonLdList = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow'} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={metaData.name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@shreyasapphire" />
      {jsonLdList.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
}
