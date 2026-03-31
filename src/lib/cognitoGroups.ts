/** Parse `cognito:groups` from a raw Cognito JWT (id or access token). */
export function cognitoGroupsFromJwt(jwt: string | undefined): string[] {
  if (!jwt) return [];
  try {
    const part = jwt.split('.')[1];
    if (!part) return [];
    const b64 = part.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(atob(b64));
    const g = decoded['cognito:groups'];
    return Array.isArray(g) ? g : [];
  } catch {
    return [];
  }
}
