import React from 'react';
import { X, Star, Calendar, Play, ExternalLink, Tv } from 'lucide-react';
import type { TVShow } from '../types/movie';

interface TVShowModalProps {
  show: TVShow | null;
  isOpen: boolean;
  onClose: () => void;
}

const TVShowModal: React.FC<TVShowModalProps> = ({ show, isOpen, onClose }) => {
  if (!show || !isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-4xl max-h-[90vh] p-0 " style={{ backgroundColor: 'oklch(21.15% 0.012 254.09)' }}>
        <div className="relative">
          {/* Header Image */}
          <div className="relative h-64 md:h-80 overflow-hidden rounded-t-lg">
            <img 
              src={show.backdrop_path} 
              alt={show.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
            <button 
              className="absolute top-4 right-4 btn btn-circle btn-sm btn-ghost bg-black bg-opacity-50 text-white hover:bg-opacity-70"
              onClick={onClose}
            >
              <X size={16} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 -mt-16 relative z-10">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Poster */}
              <div className="flex-shrink-0">
                <img 
                  src={show.poster_path} 
                  alt={show.name}
                  className="w-48 h-72 object-cover rounded-lg shadow-lg mx-auto md:mx-0"
                />
              </div>

              {/* Show Details */}
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{show.name}</h1>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-400 fill-current" />
                      <span className="font-medium text-white">{show.vote_average.toFixed(1)}</span>
                      <span>({show.vote_count.toLocaleString()} votes)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{new Date(show.first_air_date).getFullYear()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Tv size={16} />
                      <span>
                        {show.number_of_seasons} Season{show.number_of_seasons && show.number_of_seasons > 1 ? 's' : ''}
                        {show.number_of_episodes && ` • ${show.number_of_episodes} Episodes`}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {show.genres.map((genre) => (
                      <span key={genre} className="badge badge-primary badge-outline">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Overview</h3>
                  <p className="text-gray-300 leading-relaxed">{show.overview}</p>
                </div>

                {show.created_by && show.created_by.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Created By</h3>
                    <p className="text-gray-300">{show.created_by.join(', ')}</p>
                  </div>
                )}

                {show.cast && show.cast.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Cast</h3>
                    <p className="text-gray-300">{show.cast.join(', ')}</p>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  {show.trailer_url && (
                    <a 
                      href={show.trailer_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary gap-2"
                    >
                      <Play size={16} />
                      Watch Trailer
                    </a>
                  )}
                  <button className="btn btn-outline gap-2">
                    <ExternalLink size={16} />
                    More Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default TVShowModal;