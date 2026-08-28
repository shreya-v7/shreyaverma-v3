import { FavoriteTrackPlayer } from '../../components/music/FavoriteTrackPlayer';
import { ApiLoadError } from '../../components/ui/ApiLoadError';
import { ParticleField } from '../../components/ui/ParticleField';
import { SpotifyMusicStage } from '../../components/music/SpotifyMusicStage';
import { MusicBoxLoader } from '../../components/ui/MusicBoxLoader';
import { useSpotifyEmbed } from '../../hooks/useSpotifyEmbed';

export default function Music() {
  const { embed, error, loading } = useSpotifyEmbed();

  return (
    <>
      <ParticleField type="music" count={18} />
      <section className="relative z-10 spotify-theme space-y-8">
        <header>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">Music box</h2>
        </header>

        <div className="min-h-[320px]">
          {error ? (
            <ApiLoadError
              title="Spotify request failed"
              message={error}
              hint={
                <>
                  Locally run <code className="rounded bg-neutral-200/80 px-1 dark:bg-neutral-800">netlify dev</code> with{' '}
                  <code className="rounded bg-neutral-200/80 px-1 dark:bg-neutral-800">SPOTIFY_*</code> set in{' '}
                  <code className="rounded bg-neutral-200/80 px-1 dark:bg-neutral-800">.env</code>.
                </>
              }
            />
          ) : loading ? (
            <MusicBoxLoader />
          ) : embed ? (
            <SpotifyMusicStage embed={embed} />
          ) : null}
        </div>
      </section>
      {embed?.favoriteTrack ? <FavoriteTrackPlayer item={embed.favoriteTrack} /> : null}
    </>
  );
}
