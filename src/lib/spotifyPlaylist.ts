import { fetchJson } from './api';

export type SpotifyEmbedItem = {
  id: string;
  type: 'playlist' | 'track' | 'artist';
  embedUrl: string;
  spotifyUrl: string;
  height: number;
  title?: string;
  imageUrl?: string;
};

export type SpotifyEmbedConfig = {
  playlists: SpotifyEmbedItem[];
  topArtists: SpotifyEmbedItem[];
  favoriteTrack: SpotifyEmbedItem | null;
};

export const fetchSpotifyEmbed = () => fetchJson<SpotifyEmbedConfig>('/api/spotify-playlist?mode=embed');
