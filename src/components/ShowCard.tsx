import { Heart, Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext';
import type { Show } from '../types/show';

interface ShowCardProps {
  show: Show;
}

function ShowCard({ show }: ShowCardProps) {
  const { addToWatchlist, isInWatchlist } = useWatchlist();

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <Link to={`/tv/${show.id}`}>
        <div className="relative">
          <img 
            src={show.poster_path} 
            alt={show.name} 
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-2 right-2 bg-gray-900 bg-opacity-80 text-white text-xs px-2 py-1 rounded flex items-center">
            <Star size={14} className="mr-1 text-yellow-400 fill-yellow-400" />
            {show.vote_average.toFixed(1)}
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/tv/${show.id}`}>
          <h3 className="font-bold text-lg mb-1 hover:text-blue-500 transition-colors">{show.name}</h3>
        </Link>
        
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>{show.first_air_date.split('-')[0]}</span>
          <span>{show.number_of_seasons} season{show.number_of_seasons !== 1 ? 's' : ''}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {show.genres.slice(0, 2).map((genre, index) => (
            <span 
              key={index} 
              className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
            >
              {genre}
            </span>
          ))}
        </div>

        <button
          onClick={() => addToWatchlist(show)}
          className={`w-full flex items-center justify-center py-1 px-3 rounded transition-colors ${
            isInWatchlist(show.id) 
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
          }`}
        >
          <Heart 
            size={16} 
            className={`mr-2 ${isInWatchlist(show.id) ? 'fill-white' : ''}`} 
          />
          {isInWatchlist(show.id) ? 'In Watchlist' : 'Add to Watchlist'}
        </button>
      </div>
    </div>
  );
}

export default ShowCard;