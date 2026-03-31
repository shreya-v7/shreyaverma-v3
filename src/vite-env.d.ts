/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_BOOKING_EMBED_URL?: string;
  readonly VITE_COGNITO_USER_POOL_ID?: string;
  readonly VITE_COGNITO_USER_POOL_CLIENT_ID?: string;
  readonly VITE_COGNITO_IDENTITY_POOL_ID?: string;
  readonly VITE_COGNITO_ADMIN_GROUP?: string;
  readonly VITE_WORKSPACE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
