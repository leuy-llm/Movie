import React, { createContext, useContext, useState, useCallback } from 'react';
import type { WatchlistItem } from '../types/watchlist';

interface WatchlistContextType {
  watchlist: WatchlistItem[];
  addToWatchlist: (item: WatchlistItem) => void;
  isInWatchlist: (id: number, mediaType: 'movie' | 'tv') => boolean;
  watchlistCount: number;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);

  const addToWatchlist = useCallback((item: WatchlistItem) => {
    setWatchlist(prev => {
      const exists = prev.some(w => w.id === item.id && w.media_type === item.media_type);
      return exists ? prev.filter(w => !(w.id === item.id && w.media_type === item.media_type)) : [...prev, item];
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

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};
