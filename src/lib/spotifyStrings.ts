/** Strip trailing " | Spotify" from oEmbed titles. */
export function stripSpotifyTitleSuffix(value: string | undefined, fallback = ''): string {
  if (!value) return fallback;
  const t = value.replace(/\s*\|\s*Spotify\s*$/i, '').trim();
  return t || fallback;
}

/** Append autoplay=1 for embed iframes (Spotify). */
export function spotifyEmbedWithAutoplay(embedUrl: string): string {
  const sep = embedUrl.includes('?') ? '&' : '?';
  return `${embedUrl}${sep}autoplay=1`;
}
