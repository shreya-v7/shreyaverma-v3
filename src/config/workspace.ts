/**
 * Public scheduling + private workspace feature flags (Vite = client-safe env only).
 * API keys and secrets must never use the VITE_ prefix; store in AWS Secrets Manager / SSM and read from Lambda only.
 */

const env = import.meta.env;

export const workspaceAuthEnabled = Boolean(
  env.VITE_COGNITO_USER_POOL_ID && env.VITE_COGNITO_USER_POOL_CLIENT_ID,
);

/** Cal.com (or other) embed URL for public booking, e.g. https://cal.com/yourname or full embed URL */
export function getPublicBookingEmbedSrc(): string | null {
  const raw = env.VITE_PUBLIC_BOOKING_EMBED_URL?.trim();
  if (!raw) return null;
  return raw;
}

/** Same-origin or API Gateway URL for authenticated admin/workspace APIs (Lambda + Cognito authorizer) */
export function getWorkspaceApiBase(): string | null {
  const raw = env.VITE_WORKSPACE_API_URL?.trim();
  if (!raw) return null;
  return raw.replace(/\/$/, '');
}

export const adminCognitoGroup = env.VITE_COGNITO_ADMIN_GROUP?.trim() || 'admin';
