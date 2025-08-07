import React, { useState } from 'react';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';
import GenreFilter from '../components/GenerFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import { useMovies } from '../hooks/useMovies';
import { genres } from '../data/movieData';
import type { Movie } from '../types/movie';
import { Film, Filter } from 'lucide-react';
import { useWatchlist } from '..//hooks/useWatchlist';

interface MoviesPageProps {
  searchQuery: string;
}

const MoviesPage: React.FC<MoviesPageProps> = ({ searchQuery }) => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'popularity' | 'rating' | 'year'>('popularity');

  const { movies, loading } = useMovies(searchQuery, selectedGenres);

  // Watchlist actions from context
  const { addToWatchlist, isInWatchlist } = useWatchlist();

  const sortedMovies = [...movies].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.vote_average - a.vote_average;
      case 'year':
        return new Date(b.release_date).getFullYear() - new Date(a.release_date).getFullYear();
      default:
        return b.vote_count - a.vote_count;
    }
  });

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
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
        <Film className="text-primary" size={32} />
        <div>
          <h1 className="text-3xl font-bold text-white">Movies</h1>
          <p className="text-gray-400">Discover amazing movies from around the world</p>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="space-y-6 mb-8">
        <GenreFilter
          genres={genres}
          selectedGenres={selectedGenres}
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
            {loading ? 'Loading...' : `${sortedMovies.length} movies found`}
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedMovies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={handleMovieClick}
                    onAddToWatchlist={(movie) => addToWatchlist({ ...movie, media_type: 'movie' })}
                    inWatchlist={isInWatchlist(movie.id, 'movie')}
                />
                ))}
            </div>

            {sortedMovies.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎬</div>
                    <h3 className="text-xl font-semibold mb-2">No movies found</h3>
                    <p className="text-gray-400">
                        Try adjusting your search or filter criteria
                    </p>
                </div>
          )}
        </>
      )}

      {/* Movie Modal */}
      
      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default MoviesPage;