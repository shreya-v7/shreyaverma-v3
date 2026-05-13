import type { SpotifyEmbedItem } from '../../lib/spotifyPlaylist';
import { spotifyEmbedWithAutoplay, stripSpotifyTitleSuffix } from '../../lib/spotifyStrings';

type Props = { item: SpotifyEmbedItem; onPause: () => void };

export function FavoriteTrackPlayer({ item, onPause }: Props) {
  const src = spotifyEmbedWithAutoplay(item.embedUrl);
  const label = stripSpotifyTitleSuffix(item.title, 'Favorite track');

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[min(calc(100vw-2rem),320px)] rounded-2xl border border-zinc-900/10 bg-white/92 p-2 shadow-[0_22px_70px_-28px_rgba(0,0,0,0.65)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/92">
      <div className="mb-1.5 flex items-center justify-between gap-2 px-1">
        <p className="truncate text-xs font-medium text-zinc-600 dark:text-zinc-300">{label}</p>
        <button
          type="button"
          onClick={onPause}
          className="shrink-0 rounded-full border border-zinc-900/10 px-2.5 py-0.5 text-[10px] font-medium text-zinc-700 transition hover:bg-zinc-900 hover:text-white dark:border-white/10 dark:text-zinc-200 dark:hover:bg-white dark:hover:text-zinc-950"
        >
          Pause
        </button>
      </div>
      <iframe
        title={item.title ? `${stripSpotifyTitleSuffix(item.title)} (Spotify)` : 'Favorite Spotify track'}
        src={src}
        width="100%"
        height="80"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="eager"
        className="block rounded-xl"
      />
    </div>
  );
}
