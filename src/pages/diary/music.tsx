import { useEffect, useState } from 'react';

import { FavoriteTrackPlayer } from '../../components/music/FavoriteTrackPlayer';
import { MusicLoadError } from '../../components/music/MusicLoadError';
import { SpotifyMusicStage } from '../../components/music/SpotifyMusicStage';
import { MusicBoxLoader } from '../../components/ui/MusicBoxLoader';
import { ParticleField } from '../../components/ui/ParticleField';
import { useFloatingParticles } from '../../hooks/useFloatingParticles';
import { fetchSpotifyEmbed } from '../../lib/spotifyPlaylist';
import type { SpotifyEmbedConfig } from '../../lib/spotifyPlaylist';

const GLYPHS = ['♪', '♫', '♬', '♩', '🎵', '🎶', '🎼', '🎹'] as const;

export default function Music() {
  const [embed, setEmbed] = useState<SpotifyEmbedConfig | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showFavorite, setShowFavorite] = useState(true);

  const floaters = useFloatingParticles<{ sym: string }>({
    spawnIntervalMs: 420,
    maxParticles: 36,
    spawn: () => ({
      x: Math.random() * 100,
      y: 105,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.45 + 0.22),
      rotation: Math.random() * 360,
      data: { sym: GLYPHS[Math.floor(Math.random() * GLYPHS.length)]! },
    }),
  });

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchSpotifyEmbed().then((r) => {
      if (cancelled) return;
      if (r.ok) {
        setEmbed(r.data);
        setError('');
      } else {
        setError(r.message);
      }
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="spotify-theme relative min-h-[600px] space-y-8 pb-20">
      <ParticleField
        particles={floaters}
        render={(p) => ({
          className: 'text-2xl text-violet-600/35 dark:text-violet-300/30 sm:text-3xl',
          children: (p.data as { sym: string }).sym,
        })}
      />

      <div className="relative z-10 space-y-8">
        <header>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">Music box</h2>
        </header>

        <div className="min-h-[320px]">
          {error ? (
            <MusicLoadError message={error} />
          ) : loading ? (
            <MusicBoxLoader />
          ) : embed ? (
            <div className="space-y-6">
              {showFavorite && embed.favoriteTrack && (
                <FavoriteTrackPlayer item={embed.favoriteTrack} onPause={() => setShowFavorite(false)} />
              )}
              <SpotifyMusicStage embed={embed} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
