import { useEffect, useMemo, useState } from 'react';
import { metaData } from '../../config/config';

const SARCASTIC_AI_PHRASES: string[] = [
  'Optimizing... by thinking really hard (source: vibes).',
  'Loading your assets. The algorithm is impressed.',
  'Running inference on time itself. Results soon.',
  'One more second. (The model said that confidently.)',
  'Caching like it is going out of style.',
  'Batched loading because patience is a vector.',
  'Preparing the experience. Debugging internally (silently).',
  'Latency negotiation in progress.',
  "Your wait time is being smoothed. Emotionally.",
  "Model warming up. Please ignore the existential dread.",
  'The server is pretending to be effortless.',
  'Compiling thoughts into pixels. Slowly.',
  'Fetching content. No promises, just probability.',
  'Loading assets with the confidence of a demo.',
  'Your page is computing its feelings.',
  'Background work: 100% effort, 0% glamour.',
  "Teaching your browser to believe.",
  'Training on performance (with zero training data).',
  'Synthesizing UI. May contain educated guesses.',
  'Making it fast. Eventually. Spiritually.',
  'Progress is moving in a parallel universe.',
  'Letting the GPU stretch first. Be kind.',
  "Pretending the model is omniscient. (It is not.)",
  'Bringing your site online one pixel at a time.',
  "Running magic. Do not ask for the receipts."
];

interface PreloaderProps {
  loading: boolean;
  progress: number;
}

const RING_R = 17;
const RING_C = 2 * Math.PI * RING_R;

export const Preloader = ({ loading, progress }: PreloaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const phraseCount = SARCASTIC_AI_PHRASES.length;

  const dashOffset = useMemo(() => {
    const p = Math.min(100, Math.max(0, progress));
    return RING_C - (p / 100) * RING_C;
  }, [progress]);

  useEffect(() => {
    if (!loading) {
      const t = window.setTimeout(() => setIsVisible(false), 450);
      return () => window.clearTimeout(t);
    }
  }, [loading]);

  useEffect(() => {
    if (!loading) return;

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhraseIndex(0);
      return;
    }

    const pickRandomDifferent = (current: number) => {
      if (phraseCount <= 1) return 0;
      let next = Math.floor(Math.random() * phraseCount);
      if (next === current) {
        next = (next + 1) % phraseCount;
      }
      return next;
    };

    setPhraseIndex((current) => pickRandomDifferent(current));
    const interval = window.setInterval(() => {
      setPhraseIndex((current) => pickRandomDifferent(current));
    }, 2200);

    return () => window.clearInterval(interval);
  }, [loading]);

  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy={loading}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      className={`fixed inset-0 z-[9999] flex items-center justify-center font-sans antialiased transition-opacity duration-500 ease-out ${
        loading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-neutral-50 via-white to-neutral-100 dark:from-[#050506] dark:via-[#08080c] dark:to-[#050506]"
        aria-hidden
      />
      <div
        className="preloader-ambient pointer-events-none absolute inset-0 opacity-40 dark:opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(115,115,115,0.12), transparent 50%), radial-gradient(ellipse 60% 40% at 100% 100%, rgba(115,115,115,0.08), transparent 45%)',
        }}
        aria-hidden
      />

      <div className="relative z-[1] w-full max-w-[420px] px-6 sm:px-4">
        <div
          className="rounded-2xl border border-neutral-200/90 bg-white/75 p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.04] backdrop-blur-xl dark:border-neutral-700/90 dark:bg-neutral-900/70 dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.45)] dark:ring-white/[0.06] sm:p-10"
        >
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-400">
              Portfolio
            </p>
            <h1 className="mt-3 text-[26px] font-semibold leading-none tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-[28px]">
              {metaData.title}
            </h1>
            <p className="mt-4 text-xs font-medium text-neutral-500 dark:text-neutral-400">
              Preparing your experience
            </p>
          </div>

          <p className="mt-6 min-h-[3.25rem] text-center text-[13px] leading-relaxed text-neutral-600 dark:text-neutral-400">
            {SARCASTIC_AI_PHRASES[phraseIndex]}
          </p>

          <div className="relative mx-auto mt-8 flex h-[120px] w-[120px] items-center justify-center">
            <svg
              className="h-[120px] w-[120px] -rotate-90 text-neutral-900 dark:text-neutral-100"
              viewBox="0 0 48 48"
              aria-hidden
            >
              <circle
                cx="24"
                cy="24"
                r={RING_R}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-neutral-200 dark:text-neutral-700"
              />
              <circle
                cx="24"
                cy="24"
                r={RING_R}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeDasharray={RING_C}
                strokeDashoffset={dashOffset}
                className="text-neutral-900 transition-[stroke-dashoffset] duration-300 ease-out dark:text-neutral-100"
              />
            </svg>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-semibold tabular-nums tracking-tight text-neutral-900 dark:text-neutral-50">
                {progress}
                <span className="text-base font-medium text-neutral-400 dark:text-neutral-500">%</span>
              </span>
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-2 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-500">
              <span>Load</span>
              <span className="tabular-nums normal-case tracking-normal text-neutral-700 dark:text-neutral-300">
                {progress}%
              </span>
            </div>
            <div
              className="h-[3px] w-full overflow-hidden rounded-full bg-neutral-200/90 dark:bg-neutral-800/90"
              aria-hidden
            >
              <div
                className="preloader-bar-shine h-full rounded-full bg-gradient-to-r from-neutral-700 via-neutral-900 to-neutral-800 transition-[width] duration-300 ease-out dark:from-neutral-200 dark:via-neutral-50 dark:to-neutral-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <span className="sr-only">
        {loading ? `Loading, ${progress} percent complete.` : 'Loading complete.'}
      </span>

      <style>{`
        @keyframes preloader-ambient-pulse {
          0%, 100% { opacity: 0.38; transform: scale(1); }
          50% { opacity: 0.52; transform: scale(1.015); }
        }
        .preloader-ambient {
          animation: preloader-ambient-pulse 8s ease-in-out infinite;
        }
        @keyframes preloader-bar-glow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.06); }
        }
        .preloader-bar-shine {
          animation: preloader-bar-glow 2.5s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .preloader-ambient,
          .preloader-bar-shine {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};
