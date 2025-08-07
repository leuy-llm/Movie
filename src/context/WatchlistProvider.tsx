import React, { useState, useCallback } from 'react';
import { WatchlistContext } from './WatchlistContext';
import type { WatchlistItem } from '../types/watchlist';

export const WatchlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);

  const addToWatchlist = useCallback((item: WatchlistItem) => {
    setWatchlist(prev => {
      const exists = prev.some(w => w.id === item.id && w.media_type === item.media_type);
      return exists
        ? prev.filter(w => !(w.id === item.id && w.media_type === item.media_type))
        : [...prev, item];
    });
  }, []);

  const isInWatchlist = useCallback((id: number, mediaType: 'movie' | 'tv') => {
    return watchlist.some(item => item.id === id && item.media_type === mediaType);
  }, [watchlist]);

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        isInWatchlist,
        watchlistCount: watchlist.length,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};
