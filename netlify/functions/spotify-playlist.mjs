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

function binary(statusCode, body, headers = {}) {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      ...headers,
    },
    body,
    isBase64Encoded: true,
  };
}

const EMBED_HEIGHT = {
  playlist: 352,
  track: 152,
  artist: 352,
};

function extractSpotifyId(value, kind) {
  const raw = (value || '').trim();
  if (!raw) return '';
  const match = raw.match(new RegExp(`(?:open\\.spotify\\.com/${kind}/|spotify:${kind}:)([A-Za-z0-9]+)`));
  return match?.[1] || raw.split('?')[0].trim();
}

function splitValues(value) {
  return (value || '')
    .split(/[\n,]+/)
    .map((v) => v.trim())
    .filter(Boolean);
}

function embedItem(kind, value) {
  const id = extractSpotifyId(value, kind);
  if (!id) return null;
  const spotifyUrl = `https://open.spotify.com/${kind}/${encodeURIComponent(id)}`;
  return {
    id,
    type: kind,
    embedUrl: `https://open.spotify.com/embed/${kind}/${encodeURIComponent(id)}?utm_source=generator&theme=0`,
    spotifyUrl,
    height: EMBED_HEIGHT[kind],
  };
}

function readItems(kind, envName, fallbackName) {
  const values = splitValues(process.env[envName]);
  if (fallbackName && process.env[fallbackName]) values.unshift(process.env[fallbackName]);

  const seen = new Set();
  return values
    .map((value) => embedItem(kind, value))
    .filter((item) => {
      if (!item || seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
}

async function withOEmbedMeta(item) {
  try {
    const url = `https://open.spotify.com/oembed?url=${encodeURIComponent(item.spotifyUrl)}`;
    const response = await fetch(url);
    if (!response.ok) return item;

    const meta = await response.json();
    return {
      ...item,
      title: typeof meta.title === 'string' ? meta.title.replace(/\s*\|\s*Spotify\s*$/i, '') : undefined,
      imageUrl: typeof meta.thumbnail_url === 'string' ? meta.thumbnail_url : undefined,
    };
  } catch {
    return item;
  }
}

function isAllowedSpotifyThumbnailHost(hostname) {
  const h = String(hostname || '').toLowerCase();
  if (!h) return false;
  if (h === 'i.scdn.co') return true;
  if (h.endsWith('.scdn.co')) return true;
  if (h.endsWith('.spotifycdn.com') || h === 'spotifycdn.com') return true;
  return false;
}

async function imageResponse(rawUrl) {
  try {
    const url = new URL(rawUrl || '');
    if (!isAllowedSpotifyThumbnailHost(url.hostname)) {
      return json(400, { error: 'invalid_image_url' });
    }

    const response = await fetch(url);
    if (!response.ok) return json(response.status, { error: 'image_fetch_failed' });

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const body = Buffer.from(await response.arrayBuffer()).toString('base64');
    return binary(200, body, {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=86400',
    });
  } catch {
    return json(400, { error: 'invalid_image_url' });
  }
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

  if (event.httpMethod !== 'GET') return { statusCode: 405, body: 'Method Not Allowed' };

  if (event.queryStringParameters?.mode === 'image') {
    return imageResponse(event.queryStringParameters.url);
  }

  const playlists = await Promise.all(
    readItems('playlist', 'SPOTIFY_PLAYLIST_IDS', 'SPOTIFY_PLAYLIST_ID').map(withOEmbedMeta),
  );
  const topArtists = await Promise.all(readItems('artist', 'SPOTIFY_TOP_ARTIST_IDS').map(withOEmbedMeta));
  const favoriteTrack = embedItem('track', process.env.SPOTIFY_FAVORITE_TRACK_ID);

  if (!playlists.length && !topArtists.length && !favoriteTrack) {
    return json(503, {
      error: 'missing_env',
      message: 'Set SPOTIFY_PLAYLIST_ID or SPOTIFY_PLAYLIST_IDS to one or more Spotify playlist URLs/IDs.',
    });
  }

  return json(
    200,
    {
      playlists,
      topArtists,
      favoriteTrack,
    },
    { 'Cache-Control': 'no-store' },
  );
}
