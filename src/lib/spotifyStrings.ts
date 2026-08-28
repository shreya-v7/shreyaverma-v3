/** Strip trailing " | Spotify" from oEmbed titles. */
export function stripSpotifyTitleSuffix(value: string | undefined, fallback = ''): string {
  if (!value) return fallback;
  const t = value.replace(/\s*\|\s*Spotify\s*$/i, '').trim();
  return t || fallback;
}
