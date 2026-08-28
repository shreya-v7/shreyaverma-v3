import { useState } from 'react';
import { FiPause, FiX } from 'react-icons/fi';

import type { SpotifyEmbedItem } from '../../lib/spotifyPlaylist';
import { stripSpotifyTitleSuffix } from '../../lib/spotifyStrings';

type Props = { item: SpotifyEmbedItem };

/** Cute fixed popup, bottom-right. No autoplay. */
export function FavoriteTrackPlayer({ item }: Props) {
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const label = stripSpotifyTitleSuffix(item.title, 'Just the Way You Are');

  if (hidden) return null;

  return (
    <aside
      className="fixed bottom-4 right-4 z-50 w-[min(calc(100vw-1.5rem),20rem)] max-w-xs rounded-2xl border border-zinc-900/10 bg-white/85 p-3 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-zinc-950/85"
      aria-label="Favorite track"
    >
      <div className="mb-2 flex items-center gap-2">
        <p className="min-w-0 flex-1 truncate text-xs font-medium text-zinc-700 dark:text-zinc-200">
          {label}
        </p>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="shrink-0 rounded-full p-1 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
          aria-label={paused ? 'Show player' : 'Pause'}
        >
          <FiPause className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setHidden(true)}
          className="shrink-0 rounded-full p-1 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
          aria-label="Close favorite track"
        >
          <FiX className="h-3.5 w-3.5" />
        </button>
      </div>
      {paused ? (
        <p className="py-6 text-center text-[11px] text-zinc-500 dark:text-zinc-400">Paused</p>
      ) : (
        <iframe
          title={item.title ? `${stripSpotifyTitleSuffix(item.title)} (Spotify)` : 'Favorite Spotify track'}
          src={item.embedUrl}
          width="100%"
          height="152"
          allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="block w-full rounded-xl"
        />
      )}
    </aside>
  );
}
