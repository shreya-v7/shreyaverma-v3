import { useEffect, useMemo, useState } from 'react';
import { Autoplay, EffectCube, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { SpotifyEmbedItem } from '../../lib/spotifyPlaylist';

import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

type Props = {
  items: SpotifyEmbedItem[];
  /** Used in iframe titles when playlist title is missing. */
  embedContext?: string;
};

export function PlaylistCubeSwiper({
  items,
  embedContext = 'Music box',
}: Props) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const pagination = useMemo(
    () => ({
      clickable: true,
      renderBullet(index: number, className: string) {
        const item = items[index];
        if (item?.imageUrl) {
          const src = item.imageUrl.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
          return `<span class="${className}"><img src="${src}" alt="" width="44" height="44" referrerpolicy="no-referrer" loading="lazy" decoding="async" class="playlist-cube-bullet-img" /></span>`;
        }
        return `<span class="${className}"><span class="playlist-cube-pagenum">${index + 1}</span></span>`;
      },
    }),
    [items],
  );

  if (!items.length) return null;

  const cube = !reduceMotion;
  const rewindEnabled = items.length > 1;
  const autoplayOn = rewindEnabled && !reduceMotion;

  return (
    <section className="space-y-0">
      <div className="playlist-cube-swiper-wrap relative mx-auto w-full max-w-[min(100%,28rem)] pb-8">
        <Swiper
          key={items.map((i) => i.id).join('-')}
          modules={[EffectCube, Pagination, ...(autoplayOn ? [Autoplay] : [])]}
          effect={cube ? 'cube' : 'slide'}
          grabCursor
          speed={cube ? 600 : 320}
          rewind={rewindEnabled}
          autoplay={
            autoplayOn
              ? {
                  delay: 5500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                  waitForTransition: true,
                }
              : undefined
          }
          {...(cube
            ? {
                cubeEffect: {
                  shadow: true,
                  slideShadows: true,
                  shadowOffset: 52,
                  shadowScale: 0.88,
                },
              }
            : {})}
          pagination={pagination}
          className="playlist-cube-swiper aspect-[4/5] w-full max-h-[26rem]"
          style={{ width: '100%' }}
        >
          {items.map((item) => (
            <SwiperSlide key={`${item.type}-${item.id}`}>
              <div className="playlist-cube-face spotify-card flex h-full flex-col overflow-hidden p-2">
                <iframe
                  title={item.title ? `${item.title} (Spotify)` : `${embedContext} · Spotify`}
                  src={item.embedUrl}
                  width="100%"
                  height="100%"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="block min-h-[220px] w-full flex-1 rounded-2xl sm:min-h-[280px]"
                />
                <a
                  href={item.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 shrink-0 text-center text-xs font-medium tracking-wide text-zinc-500 underline-offset-2 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-white"
                >
                  Open in Spotify
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
