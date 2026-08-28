import { useState } from 'react';
import { FiMusic } from 'react-icons/fi';

import type { SpotifyEmbedItem } from '../../lib/spotifyPlaylist';
import { stripSpotifyTitleSuffix } from '../../lib/spotifyStrings';
import { SiteImage } from './SiteImage';

export function SpotifyArtistCard({
  artist,
  compact = false,
}: {
  artist: SpotifyEmbedItem;
  compact?: boolean;
}) {
  const title = stripSpotifyTitleSuffix(artist.title, 'Spotify artist');
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(artist.imageUrl && !imageFailed);

  return (
    <a
      href={artist.spotifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="spotify-card group block overflow-hidden p-2 transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative overflow-hidden rounded-2xl bg-zinc-950">
        {showImage ? (
          <SiteImage
            src={artist.imageUrl}
            alt={title}
            referrerPolicy="no-referrer"
            onError={() => setImageFailed(true)}
            width={400}
            height={compact ? 224 : 288}
            className={`w-full object-cover transition duration-500 group-hover:scale-105 ${compact ? 'h-56' : 'h-72'}`}
          />
        ) : (
          <div className={`flex w-full items-center justify-center bg-zinc-900 ${compact ? 'h-56' : 'h-72'}`}>
            <FiMusic className="h-12 w-12 text-white/70" />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-white/65">Artist</p>
          <h3 className="mt-1 text-lg font-semibold text-white">{title}</h3>
        </div>
      </div>
    </a>
  );
}
