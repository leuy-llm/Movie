import React, { useState } from 'react';
import Hero from '../components/Hero';
import MovieCard from '../components/MovieCard';
import TVShowCard from '../components/TVShowCard';
import MovieModal from '../components/MovieModal';
import TVShowModal from '../components/TVShowModal';
import LoadingSpinner from '../components/LoadingSpinner';
import { useMovies } from '../hooks/useMovies';
// import { useWatchlist } from '../hooks/useWatchlist';
import { tvShows } from '../data/tvShowData';
import type { Movie, TVShow } from '../types/movie';
import { TrendingUp, Film, Tv, Star } from 'lucide-react';
import HeroSkeleton from '../components/HeroSkeleton';
import StatCardSkeleton from '../components/StatCardSkeleton';
import MovieCardSkeleton from '../components/MovieCardSkeleton';

interface HomePageProps {
  searchQuery: string;
  watchlistCount: number;
  addToWatchlist: (item: Movie | TVShow) => void;
  isInWatchlist: (id: number) => boolean;
}

const HomePage: React.FC<HomePageProps> = ({ 
  searchQuery, 
  watchlistCount, 
  addToWatchlist, 
  isInWatchlist 
}) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedTVShow, setSelectedTVShow] = useState<TVShow | null>(null);
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false);
  const [isTVModalOpen, setIsTVModalOpen] = useState(false);

  const { movies, loading } = useMovies(searchQuery, []);

  const featuredMovie = movies[0];
  const trendingMovies = movies.slice(0, 8);
  const trendingTVShows = tvShows.slice(0, 8);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsMovieModalOpen(true);
  };

  const handleTVShowClick = (show: TVShow) => {
    setSelectedTVShow(show);
    setIsTVModalOpen(true);
  };

  const handleCloseMovieModal = () => {
    setIsMovieModalOpen(false);
    setSelectedMovie(null);
  };

  const handleCloseTVModal = () => {
    setIsTVModalOpen(false);
    setSelectedTVShow(null);
  };

  // if (loading) {
  //   return <LoadingSpinner />;
  // }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {loading && !searchQuery ? (
        <HeroSkeleton />
      ) : (
        featuredMovie && !searchQuery && (
          <Hero 
            featuredMovie={featuredMovie} 
            onMovieClick={handleMovieClick} 
          />
        )
      )}


      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading ? (
                // Show 3 skeletons while loading
                <>
                <StatCardSkeleton />
                <StatCardSkeleton />
                <StatCardSkeleton />
                </>
            ) : (
                <>
                {/* Trending Now */}
                <div className="stat bg-[#1f2937] rounded-lg p-6">
                    <div className="stat-figure text-primary">
                    <TrendingUp size={32} />
                    </div>
                    <div className="stat-title text-white">Trending Now</div>
                    <div className="stat-value text-primary">{movies.length + tvShows.length}</div>
                    <div className="stat-desc text-gray-400">Movies & TV Shows</div>
                </div>

                {/* Movies */}
                <div className="stat bg-[#1f2937] rounded-lg p-6">
                    <div className="stat-figure text-secondary">
                    <Film size={32} />
                    </div>
                    <div className="stat-title text-white">Movies</div>
                    <div className="stat-value text-secondary">{movies.length}</div>
                    <div className="stat-desc text-gray-400">Available to watch</div>
                </div>

                {/* TV Shows */}
                <div className="stat bg-[#1f2937] rounded-lg p-6">
                    <div className="stat-figure text-accent">
                    <Tv size={32} />
                    </div>
                    <div className="stat-title text-white">TV Shows</div>
                    <div className="stat-value text-accent">{tvShows.length}</div>
                    <div className="stat-desc text-gray-400">Series to binge</div>
                </div>
                </>
            )}
            </div>


        {/* Trending Movies Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-primary" size={24} />
              <h2 className="text-2xl font-bold text-white">Trending Movies</h2>
            </div>
            <div className="badge badge-primary">Hot</div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading
                ? Array.from({ length: 8 }).map((_, index) => (
                    <MovieCardSkeleton key={index} />

                ))
                : trendingMovies.map((movie) => (
                    <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={handleMovieClick}
                    onAddToWatchlist={addToWatchlist}
                    inWatchlist={isInWatchlist(movie.id)}
                    />
                ))}
            </div>

        </section>

        {/* Trending TV Shows Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2">
              <Tv className="text-secondary" size={24} />
              <h2 className="text-2xl font-bold text-white">Popular TV Shows</h2>
            </div>
            <div className="badge badge-secondary">Binge-worthy</div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <MovieCardSkeleton key={index} />
                )):
                trendingTVShows.map((show) => (
                  <TVShowCard
                    key={show.id}
                    show={show}
                    onShowClick={handleTVShowClick}
                    onAddToWatchlist={addToWatchlist}
                    inWatchlist={isInWatchlist(show.id)}
                  />
                ))}
          </div>
        </section>

        {/* Top Rated Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-400 fill-current" size={24} />
              <h2 className="text-2xl font-bold text-white">Top Rated</h2>
            </div>
            <div className="badge badge-warning">9.0+</div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading ? (
                // Show 4 skeleton cards while loading
                Array.from({ length: 4 }).map((_, index) => (
                <MovieCardSkeleton key={index} />
                ))
            ) : (
                // Show filtered top-rated movies
                movies
                .filter(movie => movie.vote_average >= 9.0)
                .slice(0, 4)
                .map((movie) => (
                    <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={handleMovieClick}
                    onAddToWatchlist={addToWatchlist}
                    inWatchlist={isInWatchlist(movie.id)}
                    />
                ))
            )}
            </div>

        </section>
      </div>

      {/* Modals */}
      {loading ? (
        <MovieCardSkeleton />
        ) : (
        <MovieModal
            movie={selectedMovie}
            isOpen={isMovieModalOpen}
            onClose={handleCloseMovieModal}
        />
        )}

        <TVShowModal
        show={selectedTVShow}
        isOpen={isTVModalOpen}
        onClose={handleCloseTVModal}
        />

            </div>
        );
        };

export default HomePage;