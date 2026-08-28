export type Result<T> = { ok: true; data: T } | { ok: false; message: string };

export async function fetchJson<T>(target: string): Promise<Result<T>> {
  try {
    const res = await fetch(target, { cache: 'no-store' });
    const ct = res.headers.get('content-type') || '';
    if (res.ok && !ct.includes('application/json')) {
      return {
        ok: false,
        message: 'API returned HTML instead of JSON. Start netlify dev or check production redirects.',
      };
    }

    const body = (await res.json().catch(() => ({}))) as Record<string, unknown> & {
      error?: string;
      message?: string;
    };

    if (!res.ok || body.error) {
      const detail = (body.message as string) || (body.error as string) || res.statusText;
      return { ok: false, message: detail || `HTTP ${res.status}` };
    }

    return { ok: true, data: body as T };
  } catch (e) {
    const hint = e instanceof Error ? e.message : String(e);
    return { ok: false, message: `Network error: ${hint}` };
  }
}
