import { existsSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

function projectRoot() {
  try {
    const url = import.meta?.url;
    if (typeof url === 'string' && url.length > 0) {
      return join(dirname(fileURLToPath(url)), '../..');
    }
  } catch {
    // Netlify CLI bundler may not provide import.meta.url
  }
  return process.cwd();
}

/** Netlify dev sometimes skips .env for functions; load project root .env as fallback. */
export function loadProjectEnv() {
  try {
    const root = projectRoot();
    for (const name of ['.env', '.env.local']) {
      const path = join(root, name);
      if (!existsSync(path)) continue;

      for (const line of readFileSync(path, 'utf8').split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;

        const eq = trimmed.indexOf('=');
        if (eq <= 0) continue;

        const key = trimmed.slice(0, eq).trim();
        let value = trimmed.slice(eq + 1).trim();
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }

        if (!process.env[key]) process.env[key] = value;
      }
    }
  } catch {
    // Never crash the function if env loading fails
  }
}

export function env(name) {
  return (process.env[name] || '').trim();
}
