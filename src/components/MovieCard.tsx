import React from 'react';
import { Star, Plus, Play } from 'lucide-react';
import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onMovieClick: (movie: Movie) => void;
  onAddToWatchlist: (movie: Movie) => void;
  inWatchlist: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ 
  movie, 
  onMovieClick, 
  onAddToWatchlist, 
  inWatchlist 
}) => {
  return (
    <div className="card bg-[oklch(21.15% 0.012 254.09)] shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-2 hover:scale-105">
      <figure className="relative overflow-hidden">
        <img 
          src={movie.poster_path} 
          alt={movie.title}
          className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-110"
          onClick={() => onMovieClick(movie)}
        />
        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
          <button 
            className="btn btn-circle btn-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-0 group-hover:scale-100"
            onClick={() => onMovieClick(movie)}
          >
            <Play size={20} />
          </button>
        </div>
        <div className="absolute top-2 right-2">
          <button
            className={`btn btn-circle btn-sm ${inWatchlist ? 'btn-secondary' : 'btn-ghost bg-black text-white bg-opacity-50'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            onClick={(e) => {
              e.stopPropagation();
              onAddToWatchlist(movie);
            }}
          >
            <Plus size={16} className={inWatchlist ? 'rotate-45' : ''} />
          </button>
        </div>
      </figure>
      
      <div className="card-body p-4">
        <h2 
          className="card-title text-base text-white font-semibold cursor-pointer hover:text-primary transition-colors line-clamp-2"
          onClick={() => onMovieClick(movie)}
        >
          {movie.title}
        </h2>
        
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="font-medium">{movie.vote_average.toFixed(1)}</span>
          </div>
          <span>•</span>
          <span>{new Date(movie.release_date).getFullYear()}</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {movie.genres.slice(0, 2).map((genre) => (
            <span key={genre} className="badge badge-outline text-white badge-xs">
              {genre}
            </span>
          ))}
        </div>
        
        <p className="text-xs text-gray-500 line-clamp-3">
          {movie.overview}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;