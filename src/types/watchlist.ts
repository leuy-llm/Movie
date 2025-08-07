import type { Movie, TVShow } from './movie';

export type WatchlistItem =
  | (Movie & { media_type: 'movie' })
  | (TVShow & { media_type: 'tv' });
