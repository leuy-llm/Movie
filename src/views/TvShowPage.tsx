import React, { useState } from 'react';
import TVShowCard from '../components/TVShowCard';
import TVShowModal from '../components/TVShowModal';
import GenreFilter from '../components/GenerFilter';
import { tvShows, tvGenres } from '../data/tvShowData';
import type { TVShow } from '../types/movie';
import { Tv, Filter } from 'lucide-react';
import MovieCardSkeleton from '../components/MovieCardSkeleton';

interface TVShowsPageProps {
  searchQuery: string;
  addToWatchlist: (show: TVShow) => void;
  isInWatchlist: (id: number) => boolean;
}

const TVShowsPage: React.FC<TVShowsPageProps> = ({ 
  searchQuery, 
  addToWatchlist, 
  isInWatchlist 
}) => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedShow, setSelectedShow] = useState<TVShow | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'popularity' | 'rating' | 'year'>('popularity');
  const [loading, _setLoading] = useState(false);

  const filteredShows = tvShows.filter(show => {
    const matchesSearch = show.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         show.overview.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGenre = selectedGenres.length === 0 || 
                        selectedGenres.some(genreId => show.genre_ids.includes(genreId));

    return matchesSearch && matchesGenre;
  });

  const sortedShows = [...filteredShows].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.vote_average - a.vote_average;
      case 'year':
        return new Date(b.first_air_date).getFullYear() - new Date(a.first_air_date).getFullYear();
      default:
        return b.vote_count - a.vote_count;
    }
  });

  const handleShowClick = (show: TVShow) => {
    setSelectedShow(show);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedShow(null);
  };

  const handleGenreToggle = (genreId: number) => {
    setSelectedGenres(prev => 
      prev.includes(genreId)
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    );
  };

  const handleClearFilters = () => {
    setSelectedGenres([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-8">
        <Tv className="text-secondary" size={32} />
        <div>
          <h1 className="text-3xl font-bold shadow-2xl text-white">TV Shows</h1>
          <p className="text-gray-400">Binge-watch the best series and shows</p>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="space-y-6 mb-8">
        <GenreFilter genres={tvGenres} selectedGenres={selectedGenres}
          onGenreToggle={handleGenreToggle}
          onClearFilters={handleClearFilters}
        />

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-primary" />
            <span className="font-medium text-white">Sort by:</span>
             <select
                    className="select select-bordered select-sm bg-gray-800 text-white border-gray-600 focus:border-primary focus:ring-primary rounded-md transition duration-150"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'popularity' | 'rating' | 'year')}
                >
                    <option value="popularity">Popularity</option>
                    <option value="rating">Rating</option>
                    <option value="year">Release Year</option>
                </select>
          </div>

          <div className="text-sm text-gray-400">
            {loading ? 'Loading...' : `${sortedShows.length} TV shows found`}
          </div>
        </div>
      </div>

      {/* TV Shows Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading
                ? Array.from({ length: 8 }).map((_, index) => (
                    <MovieCardSkeleton key={index} />
                ))
                : sortedShows.map((show) => (
                    <TVShowCard
                    key={show.id}
                    show={show}
                    onShowClick={handleShowClick}
                    onAddToWatchlist={addToWatchlist}
                    inWatchlist={isInWatchlist(show.id)}
                    />
                ))}
</div>

    {!loading && sortedShows.length === 0 && (
    <div className="text-center py-12">
        <div className="text-6xl mb-4">📺</div>
        <h3 className="text-xl font-semibold mb-2">No TV shows found</h3>
        <p className="text-gray-400">
        Try adjusting your search or filter criteria
        </p>
    </div>
    )}

      {/* TV Show Modal */}
      <TVShowModal
        show={selectedShow}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default TVShowsPage;