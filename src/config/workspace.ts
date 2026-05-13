const env = import.meta.env;

/** Public Cal.com (or similar) embed URL for `/book` and Contact link. */
export function getPublicBookingEmbedSrc(): string | null {
  const raw = env.VITE_PUBLIC_BOOKING_EMBED_URL?.trim();
  return raw || null;
}
