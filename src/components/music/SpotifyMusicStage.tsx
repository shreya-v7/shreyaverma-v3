import { lazy, Suspense } from 'react';

import { ArtistBubbleCloud } from '../ui/ArtistBubbleCloud';
import { MusicBoxLoader } from '../ui/MusicBoxLoader';
import type { SpotifyEmbedConfig, SpotifyEmbedItem } from '../../lib/spotifyPlaylist';

const PlaylistCubeSwiper = lazy(() =>
  import('../ui/PlaylistCubeSwiper').then((m) => ({ default: m.PlaylistCubeSwiper })),
);

type Props = { embed: SpotifyEmbedConfig };

const sectionWrap = 'relative mx-auto w-full max-w-[min(100%,38rem)]';

/** Playlist cube and artist grid as two spaced blocks (no bordered “stage” chrome). */
export function SpotifyMusicStage({ embed }: Props) {
  const hasPlaylists = embed.playlists.length > 0;
  const hasArtists = embed.topArtists.length > 0;
  if (!hasPlaylists && !hasArtists) return null;

  return (
    <div className="space-y-10 sm:space-y-12">
      {hasPlaylists ? (
        <div className={sectionWrap}>
          <Suspense fallback={<MusicBoxLoader compact />}>
            <PlaylistCubeSwiper embedded hideSectionTitle items={embed.playlists} embedContext="Music box" />
          </Suspense>
        </div>
      ) : null}
      {hasArtists ? <ArtistsSection items={embed.topArtists} /> : null}
    </div>
  );
}

function ArtistsSection({ items }: { items: SpotifyEmbedItem[] }) {
  return (
    <div className={sectionWrap}>
      <h3 className="mb-5 text-xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:mb-6 sm:text-2xl">
        Artists
      </h3>
      <ArtistBubbleCloud items={items} />
    </div>
  );
}
