import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { MusicCard } from '../../components/ui/MusicCard';
import { ArtistCard } from '../../components/ui/ArtistCard';
import { musicPosts, artists } from '../../data/diary/music';
import { useState, useEffect } from 'react';

const musicNotes = ['♪', '♫', '♬', '♩', '♭', '♮', '♯', '𝄞', '𝄢', '𝄡'];

export default function Music() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [notes, setNotes] = useState<Array<{ id: number; note: string; x: number; y: number; vx: number; vy: number; rotation: number }>>([]);

  useEffect(() => {
    if (!isPlaying) {
      setNotes([]);
      return;
    }

    const interval = setInterval(() => {
      const newNote = {
        id: Date.now() + Math.random(),
        note: musicNotes[Math.floor(Math.random() * musicNotes.length)],
        x: Math.random() * 100,
        y: 100,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.5 - 0.3,
        rotation: Math.random() * 360,
      };
      setNotes(prev => [...prev.slice(-30), newNote]);
    }, 300);

    const animationInterval = setInterval(() => {
      setNotes(prev => prev.map(note => ({
        ...note,
        x: note.x + note.vx,
        y: note.y + note.vy,
        rotation: note.rotation + 2,
      })).filter(note => note.y > -10));
    }, 50);

    return () => {
      clearInterval(interval);
      clearInterval(animationInterval);
    };
  }, [isPlaying]);


  return (
    <section className="relative min-h-[800px] space-y-8">
      {/* Music Notes Particles - Page Wide */}
      {isPlaying && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {notes.map((note) => (
            <div
              key={note.id}
              className="absolute text-3xl text-blue-400/40 dark:text-blue-300/30 font-bold select-none"
              style={{
                left: `${note.x}%`,
                top: `${note.y}%`,
                transform: `rotate(${note.rotation}deg)`,
                transition: 'none',
              }}
            >
              {note.note}
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10 space-y-8">
        {/* Songs Row */}
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">Songs</h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            navigation={true}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="music-swiper"
            onSlideChange={() => setIsPlaying(true)}
          >
            {musicPosts.map((post) => (
              <SwiperSlide key={post.id} className="!h-auto">
                <div className="h-full">
                  <MusicCard post={post} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Artists Row */}
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">Artists</h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            navigation={true}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="artists-swiper"
          >
            {artists.map((artist) => (
              <SwiperSlide key={artist.id} className="!h-auto">
                <div className="h-full">
                  <ArtistCard artist={artist} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style>{`
        .music-swiper {
          padding-bottom: 50px;
          padding-left: 50px;
          padding-right: 50px;
        }
        .music-swiper .swiper-wrapper {
          align-items: stretch;
        }
        .music-swiper .swiper-slide {
          height: auto;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .music-swiper .swiper-slide > div {
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .music-swiper .swiper-button-next,
        .music-swiper .swiper-button-prev {
          color: rgb(37 99 235);
          width: 40px;
          height: 40px;
          margin-top: 0;
          top: 50%;
          transform: translateY(-50%);
        }
        .music-swiper .swiper-button-next {
          right: 0;
        }
        .music-swiper .swiper-button-prev {
          left: 0;
        }
        .music-swiper .swiper-button-next::after,
        .music-swiper .swiper-button-prev::after {
          font-size: 20px;
        }
        .music-swiper .swiper-pagination {
          bottom: 10px;
        }
        .music-swiper .swiper-pagination-bullet {
          background: rgb(37 99 235);
          opacity: 0.5;
          width: 8px;
          height: 8px;
        }
        .music-swiper .swiper-pagination-bullet-active {
          background: rgb(37 99 235);
          opacity: 1;
        }
        .dark .music-swiper .swiper-pagination-bullet {
          background: rgb(147 197 253);
          opacity: 0.5;
        }
        .dark .music-swiper .swiper-pagination-bullet-active {
          background: rgb(147 197 253);
          opacity: 1;
        }
        
        .artists-swiper {
          padding-bottom: 50px;
          padding-left: 50px;
          padding-right: 50px;
        }
        .artists-swiper .swiper-wrapper {
          align-items: stretch;
        }
        .artists-swiper .swiper-slide {
          height: auto;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .artists-swiper .swiper-slide > div {
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .artists-swiper .swiper-button-next,
        .artists-swiper .swiper-button-prev {
          color: rgb(168 85 247);
          width: 40px;
          height: 40px;
          margin-top: 0;
          top: 50%;
          transform: translateY(-50%);
        }
        .artists-swiper .swiper-button-next {
          right: 0;
        }
        .artists-swiper .swiper-button-prev {
          left: 0;
        }
        .artists-swiper .swiper-button-next::after,
        .artists-swiper .swiper-button-prev::after {
          font-size: 20px;
        }
        .artists-swiper .swiper-pagination {
          bottom: 10px;
        }
        .artists-swiper .swiper-pagination-bullet {
          background: rgb(168 85 247);
          opacity: 0.5;
          width: 8px;
          height: 8px;
        }
        .artists-swiper .swiper-pagination-bullet-active {
          background: rgb(168 85 247);
          opacity: 1;
        }
        .dark .artists-swiper .swiper-pagination-bullet {
          background: rgb(196 181 253);
          opacity: 0.5;
        }
        .dark .artists-swiper .swiper-pagination-bullet-active {
          background: rgb(196 181 253);
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
