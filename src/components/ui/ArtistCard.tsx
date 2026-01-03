import { FiMusic } from 'react-icons/fi';

interface ArtistCardProps {
  artist: {
    id: string;
    name: string;
    image?: string;
    genre?: string;
  };
}

export const ArtistCard = ({ artist }: ArtistCardProps) => {
  return (
    <article className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group aspect-square flex flex-col h-full w-full max-w-[280px] mx-auto">
      <div className="p-4 flex-1 flex flex-col items-center justify-center text-center">
        {/* Circular Image */}
        <div className="w-20 h-20 bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 rounded-full mb-3 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300 flex-shrink-0 overflow-hidden">
          {artist.image ? (
            <img src={`/${artist.image}`} alt={artist.name} className="w-full h-full object-cover rounded-full" />
          ) : (
            <FiMusic className="w-10 h-10 text-purple-600 dark:text-purple-400" />
          )}
        </div>

        {/* Artist Name */}
        <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 mb-1 break-words">
          {artist.name}
        </h3>

        {/* Genre */}
        {artist.genre && (
          <p className="text-xs text-purple-600 dark:text-purple-400 font-medium break-words">
            {artist.genre}
          </p>
        )}
      </div>
    </article>
  );
};
