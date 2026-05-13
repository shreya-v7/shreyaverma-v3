/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_BOOKING_EMBED_URL?: string;
  readonly VITE_SPOTIFY_API_PROXY_TARGET?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
