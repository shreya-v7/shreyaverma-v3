/**
 * In-page loading UI for /diary/music (not the global site preloader).
 */
export function MusicBoxLoader({ compact = false }: { compact?: boolean }) {
  const h = compact ? 'min-h-[412px]' : 'min-h-[min(60vh,480px)]';

  return (
    <div
      className={`spotify-theme playlist-cube-swiper-wrap mx-auto flex w-full max-w-[min(100%,28rem)] flex-col items-center justify-center gap-8 rounded-[1.75rem] border border-zinc-900/10 bg-gradient-to-b from-zinc-100/90 to-zinc-50/80 px-6 py-12 dark:border-white/10 dark:from-zinc-900/85 dark:to-zinc-950/90 ${h}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="spotify-eq" aria-hidden>
        <span className="h-2 w-0.5 rounded-sm" />
        <span className="h-3 w-0.5 rounded-sm" />
        <span className="h-2.5 w-0.5 rounded-sm" />
        <span className="h-3.5 w-0.5 rounded-sm" />
      </div>
      <div className="music-box-loader-stage relative">
        <div className="music-box-loader-cube" />
        <div className="music-box-loader-cube-gloss" aria-hidden />
      </div>
      <p className="max-w-[14rem] text-center text-sm font-medium text-zinc-600 dark:text-zinc-400">
        {compact ? 'Loading player…' : 'Connecting to Spotify…'}
      </p>
    </div>
  );
}
