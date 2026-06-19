import { useEffect, useMemo, useRef, useState } from 'react';
import { FiMusic } from 'react-icons/fi';

import type { SpotifyEmbedItem } from '../../lib/spotifyPlaylist';
import { stripSpotifyTitleSuffix } from '../../lib/spotifyStrings';

const GOLDEN = Math.PI * (3 - Math.sqrt(5));

function vogelCenters(n: number): { x: number; y: number }[] {
  if (n <= 0) return [];
  if (n === 1) return [{ x: 0.5, y: 0.5 }];
  const out: { x: number; y: number }[] = [];
  for (let i = 0; i < n; i++) {
    // sqrt distribution = even areal density (no central clumping, no hollow ring)
    const t = (i + 0.5) / n;
    const r = Math.sqrt(t) * 0.46;
    const theta = i * GOLDEN + Math.sin(i * 1.63) * 0.05;
    let x = 0.5 + r * Math.cos(theta);
    let y = 0.5 + r * Math.sin(theta);
    const spread = 1.04;
    x = 0.5 + (x - 0.5) * spread;
    y = 0.5 + (y - 0.5) * spread;
    out.push({ x, y });
  }
  return out;
}

function hashId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (Math.imul(31, h) + id.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function hashIds(ids: string[]): number {
  let h = 0;
  for (const id of ids) {
    for (let i = 0; i < id.length; i++) h = (Math.imul(31, h) + id.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const out = [...arr];
  let s = seed >>> 0;
  const rnd = () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

type LayoutCell = { artist: SpotifyEmbedItem; x: number; y: number; sizePct: number; z: number; hoverScale: number };

/** Overlapping cloud: scattered Vogel + larger bubbles (light overlap ok); hover pops + name. */
function buildLayout(items: SpotifyEmbedItem[]): LayoutCell[] {
  const n = items.length;
  if (!n) return [];
  const shuffled = seededShuffle(items, hashIds(items.map((i) => i.id)));
  const raw = vogelCenters(n);

  if (n === 1) {
    const a = shuffled[0];
    const w = 0.7 + (hashId(a.id) % 30) / 100;
    const sizePct = Math.min(40, 33 * w);
    const hoverScale = Math.min(2.12, Math.max(1.38, 31 / sizePct));
    return [{ artist: a, x: 0.5, y: 0.5, sizePct, z: 12, hoverScale }];
  }

  // Diameter (% of frame); nudged down slightly from the “big” pass for lighter overlap.
  const base = Math.min(31, Math.max(15, 148 / Math.sqrt(n)));

  return shuffled.map((artist, i) => {
    const w = 0.86 + (hashId(artist.id) % 30) / 100; // 0.86-1.15: gentle size variation
    const sizePct = Math.min(35, base * w);
    const half = sizePct / 100 / 2;
    const m = half - 0.048; // slight bleed past frame edges
    const z = 5 + (hashId(artist.id) % 28);
    const hoverScale = Math.min(2.45, Math.max(1.38, 29 / sizePct));
    return {
      artist,
      x: clamp(raw[i].x, m, 1 - m),
      y: clamp(raw[i].y, m, 1 - m),
      sizePct,
      z,
      hoverScale,
    };
  });
}

/** Which bubble “owns” the cursor: inside disk → highest z; else nearest rim. */
function pickSpotlightTarget(nx: number, ny: number, layout: LayoutCell[]): number {
  const inside: number[] = [];
  for (let i = 0; i < layout.length; i++) {
    const { x, y, sizePct } = layout[i];
    const r = sizePct / 200;
    const d = Math.hypot(nx - x, ny - y);
    if (d <= r) inside.push(i);
  }
  if (inside.length) {
    return inside.reduce((best, i) => (layout[i].z > layout[best].z ? i : best));
  }
  let best = 0;
  let bestEdge = Infinity;
  let bestD = Infinity;
  for (let i = 0; i < layout.length; i++) {
    const { x, y, sizePct } = layout[i];
    const r = sizePct / 200;
    const d = Math.hypot(nx - x, ny - y);
    const edge = Math.max(0, d - r);
    if (edge < bestEdge || (edge === bestEdge && d < bestD)) {
      bestEdge = edge;
      bestD = d;
      best = i;
    }
  }
  return best;
}

/** Push bubble centers away from the pointer (px), only within ~influenceR of probe; pin stays put. */
function repulsionNudgePx(
  probe: { nx: number; ny: number },
  cell: LayoutCell,
  index: number,
  pinIndex: number | null,
  framePx: number,
): { x: number; y: number } {
  if (pinIndex === null || framePx <= 0) return { x: 0, y: 0 };
  if (index === pinIndex) return { x: 0, y: 0 };

  const { x: cx, y: cy, sizePct } = cell;
  const dx = cx - probe.nx;
  const dy = cy - probe.ny;
  const d = Math.hypot(dx, dy);
  if (d < 1e-5) return { x: 0, y: 0 };

  const influenceR = 0.42;
  if (d > influenceR) return { x: 0, y: 0 };

  const r = sizePct / 200;
  const cursorInThisDisk = d <= r;
  const boost = cursorInThisDisk ? 1.42 : 1;

  const falloff = ((influenceR - d) / influenceR) ** 2;
  const maxPush = framePx * 0.125;
  const mag = maxPush * falloff * boost;

  return { x: (dx / d) * mag, y: (dy / d) * mag };
}

type Props = { items: SpotifyEmbedItem[] };

export function ArtistBubbleCloud({ items }: Props) {
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const layout = useMemo(() => buildLayout(items), [items]);
  const innerRef = useRef<HTMLDivElement>(null);
  const [probe, setProbe] = useState<{ nx: number; ny: number } | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const pinIndex =
    probe && layout.length > 1 && !reduceMotion ? pickSpotlightTarget(probe.nx, probe.ny, layout) : null;

  const framePx = (() => {
    if (typeof document === 'undefined' || !innerRef.current) return 0;
    const rr = innerRef.current.getBoundingClientRect();
    return Math.min(rr.width, rr.height);
  })();

  const onInnerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = innerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0) return;
    setProbe({
      nx: (e.clientX - r.left) / r.width,
      ny: (e.clientY - r.top) / r.height,
    });
  };

  const onInnerTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    const t = e.touches[0];
    if (!t) return;
    const el = innerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0) return;
    setProbe({
      nx: (t.clientX - r.left) / r.width,
      ny: (t.clientY - r.top) / r.height,
    });
  };

  const onInnerLeave = () => setProbe(null);

  if (!items.length) return null;

  return (
    <div className="artist-bubble-cloud relative mx-auto w-full max-w-xl overflow-visible px-1 pt-12 pb-14 sm:pt-14 sm:pb-16">
      <div
        ref={innerRef}
        className="artist-bubble-cloud-inner relative mx-auto aspect-square w-full max-h-[min(96vw,36rem)]"
        onMouseMove={onInnerMove}
        onMouseLeave={onInnerLeave}
        onTouchStart={onInnerTouch}
        onTouchMove={onInnerTouch}
        onTouchEnd={onInnerLeave}
      >
        {layout.map((cell, i) => {
          const { artist, x, y, sizePct, z, hoverScale } = cell;
          const title = stripSpotifyTitleSuffix(artist.title, 'Artist');
          const showImg = Boolean(artist.imageUrl && !failed[artist.id]);
          const isPin = pinIndex !== null && i === pinIndex;
          const nudge = probe && pinIndex !== null ? repulsionNudgePx(probe, cell, i, pinIndex, framePx) : { x: 0, y: 0 };

          return (
            <a
              key={artist.id}
              href={artist.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                left: `${x * 100}%`,
                top: `${y * 100}%`,
                width: `${sizePct}%`,
                height: `${sizePct}%`,
                zIndex: isPin ? 92 : z,
                ['--art-hover-scale' as string]: hoverScale.toFixed(3),
                ['--art-nudge-x' as string]: `${nudge.x.toFixed(2)}px`,
                ['--art-nudge-y' as string]: `${nudge.y.toFixed(2)}px`,
              }}
              className={[
                'artist-bubble-hit group absolute overflow-hidden rounded-full bg-zinc-900 shadow-[0_8px_28px_-6px_rgba(0,0,0,0.45)] outline-none ring-0 focus-visible:ring-2 focus-visible:ring-violet-500/70 dark:bg-zinc-950 dark:shadow-[0_12px_36px_-8px_rgba(0,0,0,0.75)]',
                isPin ? 'artist-bubble-hit--spotlight' : '',
              ].join(' ')}
            >
              <span className="sr-only">{title}</span>
              {showImg ? (
                <img
                  src={artist.imageUrl}
                  alt=""
                  className="h-full w-full rounded-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={() => setFailed((f) => ({ ...f, [artist.id]: true }))}
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-zinc-800 to-zinc-950">
                  <FiMusic className="h-[36%] w-[36%] text-white/72" aria-hidden />
                </span>
              )}
              <div
                className="artist-bubble-name pointer-events-none absolute inset-x-0 bottom-0 rounded-b-[inherit] bg-gradient-to-t from-black/[0.92] via-black/55 to-transparent pb-2.5 pt-10 opacity-0 backdrop-blur-[1.5px] transition-[opacity,transform] duration-[420ms] ease-out translate-y-1 group-hover:translate-y-0 group-hover:opacity-100"
                aria-hidden
              >
                <p className="line-clamp-2 px-2 text-center text-[11px] font-medium leading-snug tracking-tight text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] sm:text-xs">
                  {title}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
