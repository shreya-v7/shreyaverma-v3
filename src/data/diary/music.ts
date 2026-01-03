import { PersonalPost } from '../../types';

export const musicPosts: PersonalPost[] = [
  {
    id: 'music-1',
    caption: 'no cap, this hits different fr',
    type: 'music',
    tags: ['pop', 'favorite'],
    metadata: {
      artist: 'Bruno Mars',
      album: 'Just The Way You Are',
    }
  },
  {
    id: 'music-2',
    caption: 'vibes are immaculate when coding',
    type: 'music',
    tags: ['pop', 'motivational'],
    metadata: {
      artist: 'Selena Gomez',
      album: 'Who Says',
    }
  },
  {
    id: 'music-3',
    caption: 'this goes hard ngl',
    type: 'music',
    tags: ['soundtrack', 'orchestral'],
    metadata: {
      artist: 'Brian Tyler',
      album: 'F1 Theme',
    }
  },
  {
    id: 'music-4',
    caption: 'lowkey obsessed with this one',
    type: 'music',
    tags: ['soundtrack', 'electronic'],
    metadata: {
      artist: 'Jesper Kyd',
      album: 'Lose My Mind',
    }
  }
];

export interface Artist {
  id: string;
  name: string;
  image?: string;
  genre?: string;
}

export const artists: Artist[] = [
  { id: 'artist-1', name: 'Selena Gomez', genre: 'Pop', image: 'music/selenagomez.jpg' },
  { id: 'artist-2', name: 'Charlie Puth', genre: 'Pop', image: 'music/charlieputh.jpg' },
  { id: 'artist-3', name: 'The Chainsmokers', genre: 'EDM', image: 'music/chainsmokers.jpeg' },
  { id: 'artist-4', name: 'Coldplay', genre: 'Alternative Rock', image: 'music/coldplay.jpeg' },
  { id: 'artist-5', name: 'Veorra', genre: 'Electronic', image: 'music/veorra.jpg' },
  { id: 'artist-6', name: 'David Guetta', genre: 'EDM', image: 'music/davidguetta.jpeg' },
  { id: 'artist-7', name: 'Pedro Capó', genre: 'Latin Pop', image: 'music/pedrocapo.jpg' },
  { id: 'artist-8', name: 'Bruno Mars', genre: 'Pop', image: 'music/brunomars.jpg' },
  { id: 'artist-9', name: 'Arijit Singh', genre: 'Bollywood', image: 'music/arijitsingh.jpeg' },
  { id: 'artist-10', name: 'Indila', genre: 'French Pop', image: 'music/indila.jpg' },
  { id: 'artist-11', name: 'Hans Zimmer', genre: 'Film Score', image: 'music/hanszimmer.jpg' },
  { id: 'artist-12', name: 'Tyla', genre: 'Pop', image: 'music/tyla.jpg' },
];
