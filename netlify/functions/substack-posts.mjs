function json(statusCode, body, extraHeaders = {}) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  };
}

const FETCH_HEADERS = {
  Accept: 'application/json',
  'User-Agent': 'Mozilla/5.0 (compatible; shreyaverma-portfolio/1.0)',
};

/**
 * @param {string | undefined} raw
 * @returns {{ kind: 'empty' } | { kind: 'handle'; handle: string } | { kind: 'publication'; base: string } | { kind: 'slug'; slug: string }}
 */
function parsePublicationInput(raw) {
  const value = (raw || '').trim();
  if (!value) return { kind: 'empty' };

  if (/^https?:\/\//i.test(value)) {
    const url = value.replace(/\/+$/, '');
    const profileMatch = url.match(/substack\.com\/@([^/?#]+)/i);
    if (profileMatch?.[1]) return { kind: 'handle', handle: profileMatch[1] };

    const hostMatch = url.match(/^https?:\/\/([^/?#]+)/i);
    if (hostMatch?.[1]) return { kind: 'publication', base: `https://${hostMatch[1]}` };
    return { kind: 'empty' };
  }

  const slug = value.replace(/^@/, '').replace(/\.substack\.com\/?$/i, '').split('/')[0];
  if (!slug) return { kind: 'empty' };

  // Handles often include digits; publication subdomains are usually short words.
  // Always try slug as publication first, then resolve as @handle via public profile.
  return { kind: 'slug', slug };
}

/**
 * @param {string} handle
 * @returns {Promise<string | null>}
 */
async function resolvePublicationFromHandle(handle) {
  const res = await fetch(
    `https://substack.com/api/v1/user/${encodeURIComponent(handle)}/public_profile`,
    { headers: FETCH_HEADERS },
  );

  if (!res.ok) return null;

  const data = await res.json();
  const rows = Array.isArray(data?.publicationUsers) ? data.publicationUsers : [];
  if (rows.length === 0) return null;

  const primary = rows.find((row) => row?.is_primary) ?? rows[0];
  const pub = primary?.publication;
  if (!pub || typeof pub !== 'object') return null;

  if (typeof pub.custom_domain === 'string' && pub.custom_domain.trim()) {
    const domain = pub.custom_domain.trim().replace(/\/+$/, '');
    return /^https?:\/\//i.test(domain) ? domain : `https://${domain}`;
  }

  if (typeof pub.subdomain === 'string' && pub.subdomain.trim()) {
    return `https://${pub.subdomain.trim()}.substack.com`;
  }

  return null;
}

/**
 * @param {string} base
 * @returns {Promise<{ ok: true; rows: unknown[] } | { ok: false }>}
 */
async function fetchArchiveRows(base, limit, offset) {
  const archiveUrl = `${base.replace(/\/+$/, '')}/api/v1/archive?limit=${limit}&offset=${offset}&sort=new`;
  const res = await fetch(archiveUrl, { headers: FETCH_HEADERS, redirect: 'follow' });
  const contentType = res.headers.get('content-type') || '';

  if (!res.ok || !contentType.includes('application/json')) {
    return { ok: false };
  }

  const data = await res.json();
  if (!Array.isArray(data)) return { ok: false };

  return { ok: true, rows: data };
}

/**
 * @param {string | undefined} raw
 * @returns {Promise<string | null>}
 */
async function resolvePublicationBase(raw) {
  const input = parsePublicationInput(raw);
  if (input.kind === 'empty') return null;

  if (input.kind === 'handle') {
    return resolvePublicationFromHandle(input.handle);
  }

  if (input.kind === 'publication') {
    const probe = await fetchArchiveRows(input.base, 1, 0);
    if (probe.ok) return input.base.replace(/\/+$/, '');

    const host = input.base.replace(/^https?:\/\//i, '').split('/')[0] ?? '';
    const sub = host.replace(/\.substack\.com$/i, '');
    if (sub && sub !== host) {
      const fromHandle = await resolvePublicationFromHandle(sub);
      if (fromHandle) return fromHandle;
    }

    return input.base.replace(/\/+$/, '');
  }

  const publicationBase = `https://${input.slug}.substack.com`;
  const probe = await fetchArchiveRows(publicationBase, 1, 0);
  if (probe.ok) return publicationBase;

  return resolvePublicationFromHandle(input.slug);
}

/**
 * @param {unknown} item
 * @returns {Record<string, unknown> | null}
 */
function mapArchivePost(item) {
  if (!item || typeof item !== 'object') return null;
  const row = /** @type {Record<string, unknown>} */ (item);

  const slug = typeof row.slug === 'string' ? row.slug : '';
  const title = typeof row.title === 'string' ? row.title : '';
  if (!slug || !title) return null;

  const audience = typeof row.audience === 'string' ? row.audience : 'everyone';
  if (audience !== 'everyone') return null;

  const postDate = typeof row.post_date === 'string' ? row.post_date : '';
  const date = postDate ? postDate.slice(0, 10) : undefined;

  const caption =
    (typeof row.description === 'string' && row.description.trim()) ||
    (typeof row.subtitle === 'string' && row.subtitle.trim()) ||
    (typeof row.truncated_body_text === 'string' && row.truncated_body_text.trim()) ||
    '';

  const link =
    (typeof row.canonical_url === 'string' && row.canonical_url) ||
    `https://substack.com/p/${slug}`;

  const image = typeof row.cover_image === 'string' ? row.cover_image : undefined;

  /** @type {{ name?: string; slug?: string }[]} */
  const postTags = Array.isArray(row.postTags) ? row.postTags : [];
  const tags = postTags
    .map((t) => (typeof t.name === 'string' ? t.name : typeof t.slug === 'string' ? t.slug : ''))
    .filter(Boolean);

  return {
    id: slug,
    title,
    caption,
    date,
    tags,
    link,
    image,
    type: 'blogs',
    source: 'substack',
  };
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const limit = Math.min(50, Math.max(1, Number.parseInt(event.queryStringParameters?.limit || '24', 10) || 24));
  const offset = Math.max(0, Number.parseInt(event.queryStringParameters?.offset || '0', 10) || 0);

  try {
    const base = await resolvePublicationBase(process.env.SUBSTACK_PUBLICATION_URL);

    if (!base) {
      return json(503, {
        error: 'missing_env',
        message:
          'Set SUBSTACK_PUBLICATION_URL to your @handle (e.g. shreyaverma1), publication slug (e.g. shreyave), or full URL.',
        posts: [],
      });
    }

    const archive = await fetchArchiveRows(base, limit, offset);
    if (!archive.ok) {
      return json(502, {
        error: 'substack_fetch_failed',
        message: `Could not load posts from ${base}. Check SUBSTACK_PUBLICATION_URL.`,
        posts: [],
        publicationUrl: base,
      });
    }

    const posts = archive.rows.map(mapArchivePost).filter(Boolean);

    return json(
      200,
      { posts, publicationUrl: base },
      { 'Cache-Control': 'public, max-age=300, s-maxage=600, stale-while-revalidate=3600' },
    );
  } catch (e) {
    const hint = e instanceof Error ? e.message : String(e);
    return json(502, {
      error: 'substack_fetch_error',
      message: hint,
      posts: [],
    });
  }
}
