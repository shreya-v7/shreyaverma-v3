import { loadProjectEnv } from './_env.mjs';
import { FETCH_HEADERS, corsPreflight, json } from './_http.mjs';

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

  if (value.startsWith('@')) return { kind: 'handle', handle: value.slice(1).split('/')[0] };

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
    { headers: FETCH_HEADERS, signal: AbortSignal.timeout(5000) },
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
  try {
    const archiveUrl = `${base.replace(/\/+$/, '')}/api/v1/archive?limit=${limit}&offset=${offset}&sort=new`;
    const res = await fetch(archiveUrl, {
      headers: FETCH_HEADERS,
      redirect: 'manual',
      signal: AbortSignal.timeout(5000),
    });
    const contentType = res.headers.get('content-type') || '';
    if (!res.ok || !contentType.includes('application/json')) return { ok: false };
    const data = await res.json();
    return Array.isArray(data) ? { ok: true, rows: data } : { ok: false };
  } catch {
    // A timeout, network error, or malformed archive must still allow RSS fallback.
    return { ok: false };
  }
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

  if (input.kind === 'publication') return input.base;

  const publicationBase = `https://${input.slug}.substack.com`;
  const probe = await fetchArchiveRows(publicationBase, 1, 0);
  if (probe.ok) return publicationBase;
  // A publication slug remains usable via RSS even when the archive/profile API fails.
  return (await resolvePublicationFromHandle(input.slug).catch(() => null)) || publicationBase;
}

/**
 * @param {unknown} item
 * @param {string} base
 * @returns {Record<string, unknown> | null}
 */
function mapArchivePost(item, base) {
  if (!item || typeof item !== 'object') return null;
  const row = /** @type {Record<string, unknown>} */ (item);

  const slug = typeof row.slug === 'string' ? row.slug : '';
  const title = typeof row.title === 'string' ? row.title : '';
  if (!slug || !title) return null;

  const audience = typeof row.audience === 'string' ? row.audience : 'everyone';
  if (audience === 'only_paid' || audience === 'founding') return null;

  const postDate = typeof row.post_date === 'string' ? row.post_date : '';
  const date = postDate ? postDate.slice(0, 10) : undefined;

  const caption =
    (typeof row.description === 'string' && row.description.trim()) ||
    (typeof row.subtitle === 'string' && row.subtitle.trim()) ||
    (typeof row.truncated_body_text === 'string' && row.truncated_body_text.trim()) ||
    '';

  const canonical = typeof row.canonical_url === 'string' ? row.canonical_url : '';
  const link = canonical || `${base.replace(/\/+$/, '')}/p/${slug}`;

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

function decodeXml(value) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function stripHtml(value) {
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * @param {string} xml
 * @param {string} base
 */
function parseRssPosts(xml, base) {
  const blocks = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)];
  return blocks
    .map((match, index) => {
      const block = match[1] || '';
      const title = decodeXml(block.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '');
      const link = decodeXml(block.match(/<link>([\s\S]*?)<\/link>/i)?.[1] || '');
      if (!title || !link) return null;

      const pubDate = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1];
      const rawDesc = decodeXml(block.match(/<description>([\s\S]*?)<\/description>/i)?.[1] || '');
      const image =
        block.match(/<enclosure[^>]+url=["']([^"']+)["']/i)?.[1] ||
        block.match(/<media:content[^>]+url=["']([^"']+)["']/i)?.[1];
      const slug = link.replace(/\/+$/, '').split('/').pop() || `rss-${index}`;
      let date;
      if (pubDate) {
        const parsed = new Date(pubDate);
        if (!Number.isNaN(parsed.getTime())) date = parsed.toISOString().slice(0, 10);
      }

      return {
        id: slug,
        title,
        caption: stripHtml(rawDesc).slice(0, 280),
        date,
        tags: [],
        link,
        image,
        type: 'blogs',
        source: 'substack',
      };
    })
    .filter(Boolean);
}

async function fetchRssPosts(base) {
  try {
    const feedUrl = `${base.replace(/\/+$/, '')}/feed`;
    const res = await fetch(feedUrl, {
      headers: { ...FETCH_HEADERS, Accept: 'application/rss+xml, application/xml, text/xml, */*' },
      redirect: 'follow',
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return [];
    const xml = await res.text();
    if (!xml.includes('<item')) return [];
    return parseRssPosts(xml, base);
  } catch {
    return [];
  }
}

export async function handler(event) {
  loadProjectEnv();

  if (event.httpMethod === 'OPTIONS') return corsPreflight();

  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const limit = Math.min(50, Math.max(1, Number.parseInt(event.queryStringParameters?.limit || '24', 10) || 24));
  const offset = Math.max(0, Number.parseInt(event.queryStringParameters?.offset || '0', 10) || 0);

  try {
    const configured = process.env.SUBSTACK_PUBLICATION_URL?.trim();
    // Migrate the obsolete deployed handle as well as missing configuration.
    const legacy = /^(?:@?shreyaverma1|(?:https?:\/\/)?shreyaverma1\.substack\.com\/?|https?:\/\/substack\.com\/@shreyaverma1\/?)$/i;
    const publication = !configured || legacy.test(configured)
      ? 'https://shreyave.substack.com'
      : configured;
    const base = await resolvePublicationBase(publication);

    if (!base) {
      return json(503, {
        error: 'missing_env',
        message:
          'Set SUBSTACK_PUBLICATION_URL to your @handle, publication slug, or full Substack URL.',
        posts: [],
      });
    }

    const archive = await fetchArchiveRows(base, limit, offset);
    let posts = archive.ok ? archive.rows.map((row) => mapArchivePost(row, base)).filter(Boolean) : [];

    if (posts.length === 0) {
      const rssPosts = await fetchRssPosts(base);
      posts = rssPosts.slice(offset, offset + limit);
    }

    if (!archive.ok && posts.length === 0) {
      return json(502, {
        error: 'substack_fetch_failed',
        message: `Could not load posts from ${base}. Check SUBSTACK_PUBLICATION_URL.`,
        posts: [],
        publicationUrl: base,
      });
    }

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
