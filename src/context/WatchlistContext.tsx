import { createContext } from 'react';
import type { WatchlistItem } from '../types/watchlist';

export interface WatchlistContextType {
  watchlist: WatchlistItem[];
  addToWatchlist: (item: WatchlistItem) => void;
  isInWatchlist: (id: number, mediaType: 'movie' | 'tv') => boolean;
  watchlistCount: number;
}

export const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);
