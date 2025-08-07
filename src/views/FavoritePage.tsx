import React, { useState } from 'react';
import { useWatchlist } from '../context/WatchlistContext';
import MovieCard from '../components/MovieCard';
import type { Movie } from '../types/movie';
import MovieModal from '../components/MovieModal';
import MovieModalSkeleton from '../components/MovieModalSkeleton';

const FavoritePage: React.FC = () => {
  const { watchlist, addToWatchlist, isInWatchlist } = useWatchlist();

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };


  const handleCloseModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#15191e' }}>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-white mb-6">Your Watchlist</h1>

        {watchlist.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-xl text-gray-300">No movies in your watchlist</h2>
            <p className="text-gray-500 mt-2">Go add some from the home page!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {watchlist.map((movie: Movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onMovieClick={handleMovieClick} // ✅ trigger modal
                onAddToWatchlist={addToWatchlist}
                inWatchlist={isInWatchlist(movie.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal rendering */}
      {isModalOpen && !selectedMovie ? (
        <MovieModalSkeleton />
      ) : (
        <MovieModal
          movie={selectedMovie}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default FavoritePage;
