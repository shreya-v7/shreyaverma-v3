import { useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { fetchAuthSession, getCurrentUser, signIn, signOut } from 'aws-amplify/auth';
import { adminCognitoGroup, getWorkspaceApiBase } from '../../config/workspace';
import { cognitoGroupsFromJwt } from '../../lib/cognitoGroups';

type TabId = 'planner' | 'calendar' | 'admin';

export default function WorkspaceApp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [tab, setTab] = useState<TabId>('planner');
  const [adminGroups, setAdminGroups] = useState<string[]>([]);
  const [adminPreview, setAdminPreview] = useState<string | null>(null);

  const apiBase = getWorkspaceApiBase();
  const isAdmin = adminGroups.includes(adminCognitoGroup);

  const refreshSession = useCallback(async () => {
    try {
      await getCurrentUser();
      const session = await fetchAuthSession();
      const idJwt = session.tokens?.idToken?.toString();
      setAdminGroups(cognitoGroupsFromJwt(idJwt ?? undefined));
      setSignedIn(true);
    } catch {
      setSignedIn(false);
      setAdminGroups([]);
    }
  }, []);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  useEffect(() => {
    if (tab === 'admin' && !isAdmin) setTab('planner');
  }, [tab, isAdmin]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await signIn({ username: email.trim(), password });
      await refreshSession();
      setPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-in failed');
    } finally {
      setBusy(false);
    }
  };

  const handleSignOut = async () => {
    setBusy(true);
    try {
      await signOut();
    } finally {
      setBusy(false);
      setSignedIn(false);
      setTab('planner');
    }
  };

  const loadAdminConfig = async () => {
    if (!apiBase) {
      setAdminPreview('Set VITE_WORKSPACE_API_URL to your API Gateway base URL (Lambda reads secrets server-side).');
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const session = await fetchAuthSession();
      const idJwt = session.tokens?.idToken?.toString();
      if (!idJwt) throw new Error('No id token');
      const res = await fetch(`${apiBase}/admin/config`, {
        headers: { Authorization: `Bearer ${idJwt}` },
      });
      const text = await res.text();
      setAdminPreview(res.ok ? text : `Error ${res.status}: ${text}`);
    } catch (err) {
      setAdminPreview(err instanceof Error ? err.message : 'Request failed');
    } finally {
      setBusy(false);
    }
  };

  const tabs = useMemo(() => {
    const base: { id: TabId; label: string }[] = [
      { id: 'planner', label: 'Planner' },
      { id: 'calendar', label: 'Calendar' },
    ];
    if (isAdmin) base.push({ id: 'admin', label: 'Admin' });
    return base;
  }, [isAdmin]);

  if (signedIn === null) {
    return (
      <div className="py-12 text-center text-sm text-neutral-500 dark:text-neutral-400">
        Checking session…
      </div>
    );
  }

  if (!signedIn) {
    return (
      <>
        <Helmet>
          <title>Sign in</title>
          <meta name="robots" content="noindex,nofollow" />
        </Helmet>
        <div className="mx-auto max-w-sm space-y-4 py-12">
          <h1 className="text-xl font-semibold">Workspace</h1>
          <form onSubmit={handleSignIn} className="space-y-3">
            <label className="block text-sm">
              <span className="text-neutral-600 dark:text-neutral-400">Email</span>
              <input
                type="email"
                autoComplete="username"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm dark:border-neutral-600 dark:bg-neutral-900"
                required
              />
            </label>
            <label className="block text-sm">
              <span className="text-neutral-600 dark:text-neutral-400">Password</span>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm dark:border-neutral-600 dark:bg-neutral-900"
                required
              />
            </label>
            {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-lg bg-neutral-900 py-2 text-sm font-medium text-white disabled:opacity-60 dark:bg-neutral-100 dark:text-neutral-900"
            >
              {busy ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Workspace</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className="flex min-h-[60vh] flex-col gap-4 md:flex-row">
        <aside className="flex shrink-0 flex-col gap-2 md:w-44">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">Menu</span>
            <button
              type="button"
              onClick={() => void handleSignOut()}
              disabled={busy}
              className="text-xs text-neutral-600 underline underline-offset-2 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            >
              Sign out
            </button>
          </div>
          <nav className="flex flex-row flex-wrap gap-1 md:flex-col">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={[
                  'rounded-lg px-3 py-2 text-left text-sm transition',
                  tab === t.id
                    ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                    : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700',
                ].join(' ')}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </aside>

        <section className="min-w-0 flex-1 space-y-4 rounded-2xl border border-neutral-200 bg-neutral-50/80 p-4 dark:border-neutral-700 dark:bg-neutral-900/50">
          {tab === 'planner' && (
            <>
              <h2 className="text-lg font-semibold">Planner</h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Notion-style blocks, tasks, and private notes belong here. Persist them via your API (e.g. DynamoDB +
                Lambda) so nothing sensitive ships in the static bundle.
              </p>
              <div className="min-h-[240px] rounded-xl border border-dashed border-neutral-300 bg-white p-4 text-sm text-neutral-500 dark:border-neutral-600 dark:bg-neutral-950">
                Planner canvas placeholder – connect backend storage when ready.
              </div>
            </>
          )}

          {tab === 'calendar' && (
            <>
              <h2 className="text-lg font-semibold">Calendar</h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Your full calendar (private) lives in Google Calendar or Outlook. This app should not embed secret
                URLs in the client. Use your provider’s app for the master view; public visitors only see free slots
                via the booking page.
              </p>
            </>
          )}

          {tab === 'admin' && isAdmin && (
            <>
              <h2 className="text-lg font-semibold">Admin</h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Credentials and integration tokens must be loaded from AWS Secrets Manager or SSM via Lambda, then
                exposed only through an authenticated API. Never put secrets in <code>VITE_*</code> variables.
              </p>
              <button
                type="button"
                onClick={() => void loadAdminConfig()}
                disabled={busy}
                className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium dark:border-neutral-600"
              >
                Test admin API
              </button>
              {adminPreview ? (
                <pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded-lg border border-neutral-200 bg-white p-3 text-xs dark:border-neutral-700 dark:bg-neutral-950">
                  {adminPreview}
                </pre>
              ) : null}
            </>
          )}
        </section>
      </div>
    </>
  );
}
