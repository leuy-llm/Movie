import React, { useState } from 'react';
import MovieCard from '../components/MovieCard';
import TVShowCard from '../components/TVShowCard';
import MovieModal from '../components/MovieModal';
import TVShowModal from '../components/TVShowModal';
import { useMovies } from '../hooks/useMovies';
import { genres } from '../data/movieData';
import { tvShows, tvGenres } from '../data/tvShowData';
import type { Movie, TVShow, Genre } from '../types/movie';
import { Tag, Film, Tv } from 'lucide-react';

interface GenresPageProps {
  searchQuery: string;
  addToWatchlist: (item: Movie | TVShow) => void;
  isInWatchlist: (id: number) => boolean;
}

const GenresPage: React.FC<GenresPageProps> = ({ 
  // _searchQuery, 
  addToWatchlist, 
  isInWatchlist 
}) => {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [contentType, setContentType] = useState<'movies' | 'tv'>('movies');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedShow, setSelectedShow] = useState<TVShow | null>(null);
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false);
  const [isTVModalOpen, setIsTVModalOpen] = useState(false);

  const { movies } = useMovies('', selectedGenre ? [selectedGenre.id] : []);

  const filteredTVShows = selectedGenre 
    ? tvShows.filter(show => show.genre_ids.includes(selectedGenre.id))
    : tvShows;

  const currentGenres = contentType === 'movies' ? genres : tvGenres;
  const currentContent = contentType === 'movies' ? movies : filteredTVShows;

  const handleGenreClick = (genre: Genre) => {
    setSelectedGenre(genre);
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsMovieModalOpen(true);
  };

  const handleTVShowClick = (show: TVShow) => {
    setSelectedShow(show);
    setIsTVModalOpen(true);
  };

  const handleCloseMovieModal = () => {
    setIsMovieModalOpen(false);
    setSelectedMovie(null);
  };

  const handleCloseTVModal = () => {
    setIsTVModalOpen(false);
    setSelectedShow(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
        <div className="flex items-center gap-3 mb-8">
            <Tag className="text-accent" size={32} />
            <div>
            <h1 className="text-3xl font-bold text-white">Browse by Genres</h1>
            <p className="text-gray-400">Explore content by your favorite genres</p>
            </div>
        </div>

      {/* Content Type Toggle */}
      <div className="tabs tabs-boxed mb-8 w-fit">
        <button 
          className={`tab gap-2 ${contentType === 'movies' ? 'tab-active' : ''}`}
          onClick={() => {
            setContentType('movies');
            setSelectedGenre(null);
          }}
        >
          <Film size={16} />
          Movies
        </button>
        <button 
          className={`tab gap-2 ${contentType === 'tv' ? 'tab-active' : ''}`}
          onClick={() => {
            setContentType('tv');
            setSelectedGenre(null);
          }}
        >
          <Tv size={16} />
          TV Shows
        </button>
      </div>

      {/* Genre Grid */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {contentType === 'movies' ? 'Movie' : 'TV Show'} Genres
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {currentGenres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreClick(genre)}
              className={`btn ${
                selectedGenre?.id === genre.id 
                  ? 'btn-primary' 
                  : 'btn-outline btn-ghost'
              } transition-all duration-200 text-white hover:bg-gray-900 hover:scale-105`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Genre Content */}
      {selectedGenre && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-white">
              {selectedGenre.name} {contentType === 'movies' ? 'Movies' : 'TV Shows'}
            </h2>
            <div className="badge badge-primary">{currentContent.length} items</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {contentType === 'movies' 
              ? movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={handleMovieClick}
                    onAddToWatchlist={addToWatchlist}
                    inWatchlist={isInWatchlist(movie.id)}
                  />
                ))
              : filteredTVShows.map((show) => (
                  <TVShowCard
                    key={show.id}
                    show={show}
                    onShowClick={handleTVShowClick}
                    onAddToWatchlist={addToWatchlist}
                    inWatchlist={isInWatchlist(show.id)}
                  />
                ))
            }
          </div>

          {currentContent.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">
                {contentType === 'movies' ? '🎬' : '📺'}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                No {contentType === 'movies' ? 'movies' : 'TV shows'} found
              </h3>
              <p className="text-gray-400">
                Try selecting a different genre
              </p>
            </div>
          )}
        </div>
      )}

      {/* Popular Genres Overview */}
      {!selectedGenre && (
        <div className="space-y-8">
          <h2 className="text-2xl font-bold">Popular Genres</h2>
          
          {currentGenres.slice(0, 3).map((genre) => {
                const genreContent = contentType === 'movies' 
                ? movies.filter(movie => movie.genre_ids.includes(genre.id)).slice(0, 4)
                : tvShows.filter(show => show.genre_ids.includes(genre.id)).slice(0, 4);

            return (
                <div key={genre.id} className="space-y-4">
                        <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">{genre.name}</h3>
                        <button 
                            onClick={() => handleGenreClick(genre)}
                            className="btn btn-outline btn-sm">
                            View All
                        </button>
                        </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contentType === 'movies' 
                            ? genreContent.map((movie) => (
                                <MovieCard
                                key={movie.id}
                                movie={movie as Movie}
                                onMovieClick={handleMovieClick}
                                onAddToWatchlist={addToWatchlist}
                                inWatchlist={isInWatchlist(movie.id)}
                                />
                            ))
                            : genreContent.map((show) => (
                                <TVShowCard
                                key={show.id}
                                show={show as TVShow}
                                onShowClick={handleTVShowClick}
                                onAddToWatchlist={addToWatchlist}
                                inWatchlist={isInWatchlist(show.id)}
                                />
                            ))
                        }
                    </div>
                </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      <MovieModal
        movie={selectedMovie}
        isOpen={isMovieModalOpen}
        onClose={handleCloseMovieModal}
      />

      <TVShowModal
        show={selectedShow}
        isOpen={isTVModalOpen}
        onClose={handleCloseTVModal}
      />
    </div>
  );
};

export default GenresPage;