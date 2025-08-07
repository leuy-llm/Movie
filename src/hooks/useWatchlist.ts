import { useState, useCallback } from 'react';
import type { Movie, TVShow } from '../types/movie';

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState<(Movie | TVShow)[]>([]);

  const addToWatchlist = useCallback((item: Movie | TVShow) => {
    setWatchlist(prev => {
      const isAlreadyInWatchlist = prev.some(watchlistItem => watchlistItem.id === item.id);
      if (isAlreadyInWatchlist) {
        return prev.filter(watchlistItem => watchlistItem.id !== item.id);
      }
      return [...prev, item];
    });
  }, []);

  const isInWatchlist = useCallback((itemId: number) => {
    return watchlist.some(item => item.id === itemId);
  }, [watchlist]);

  return {
    watchlist,
    addToWatchlist,
    isInWatchlist,
    watchlistCount: watchlist.length
  };
};