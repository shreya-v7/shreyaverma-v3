import { useEffect, useState } from 'react';

import { fetchSpotifyEmbed } from '../lib/spotifyPlaylist';
import type { SpotifyEmbedConfig } from '../lib/spotifyPlaylist';

export function useSpotifyEmbed() {
  const [embed, setEmbed] = useState<SpotifyEmbedConfig | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchSpotifyEmbed().then((result) => {
      if (cancelled) return;
      if (result.ok) {
        setEmbed(result.data);
        setError('');
      } else {
        setError(result.message);
      }
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { embed, error, loading };
}
