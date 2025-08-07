import React from 'react';
import { Star, Plus, Play, Calendar } from 'lucide-react';
import type { TVShow } from '../types/movie';

interface TVShowCardProps {
  show: TVShow;
  onShowClick: (show: TVShow) => void;
  onAddToWatchlist: (show: TVShow) => void;
  inWatchlist: boolean;
}

const TVShowCard: React.FC<TVShowCardProps> = ({ 
  show, 
  onShowClick, 
  onAddToWatchlist, 
  inWatchlist 
}) => {
  return (
    <div className="card bg-[#1f2937] shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-2 hover:scale-105">
      <figure className="relative overflow-hidden">
        <img 
          src={show.poster_path} 
          alt={show.name}
          className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-110"
          onClick={() => onShowClick(show)}
        />
        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
          <button 
            className="btn btn-circle btn-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-0 group-hover:scale-100"
            onClick={() => onShowClick(show)}
          >
            <Play size={20} />
          </button>
        </div>
        <div className="absolute top-2 right-2">
          <button
            className={`btn btn-circle btn-sm ${inWatchlist ? 'btn-secondary' : 'btn-ghost bg-black text-white bg-opacity-50'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            onClick={(e) => {
              e.stopPropagation();
              onAddToWatchlist(show);
            }}
          >
            <Plus size={16} className={inWatchlist ? 'rotate-45' : ''} />
          </button>
        </div>
      </figure>
      
      <div className="card-body p-4">
        <h2 
          className="card-title text-white text-base font-semibold cursor-pointer hover:text-primary transition-colors line-clamp-2"
          onClick={() => onShowClick(show)}
        >
          {show.name}
        </h2>
        
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="font-medium">{show.vote_average.toFixed(1)}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{new Date(show.first_air_date).getFullYear()}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {show.genres.slice(0, 2).map((genre) => (
            <span key={genre} className="badge text-white badge-outline badge-xs">
              {genre}
            </span>
          ))}
        </div>
        
        <div className="text-xs text-gray-500 mb-2">
          {show.number_of_seasons && (
            <span>{show.number_of_seasons} Season{show.number_of_seasons > 1 ? 's' : ''}</span>
          )}
          {show.number_of_episodes && (
            <span> • {show.number_of_episodes} Episodes</span>
          )}
        </div>
        
        <p className="text-xs text-gray-500 line-clamp-3">
          {show.overview}
        </p>
      </div>
    </div>
  );
};

export default TVShowCard;