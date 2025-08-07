import React from 'react';
import { Play, Info, Star } from 'lucide-react';
import type { Movie } from '../types/movie';

interface HeroProps {
  featuredMovie: Movie;
  onMovieClick: (movie: Movie) => void;
}

const Hero: React.FC<HeroProps> = ({ featuredMovie, onMovieClick }) => {
  return (
    <div className="hero min-h-[60vh] relative overflow-hidden">
      <div 
        className="hero-overlay bg-black bg-opacity-60 absolute inset-0"
        style={{
          backgroundImage: `url(${featuredMovie.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
      
      <div className="hero-content text-neutral-content relative z-10 max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <img 
              src={featuredMovie.poster_path} 
              alt={featuredMovie.title}
              className="w-64 h-96 object-cover rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <div className="max-w-md text-center lg:text-left space-y-6">
            <div>
              <div className="flex items-center gap-2 justify-center lg:justify-start mb-2">
                <span className="badge badge-accent font">Featured</span>
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-400 fill-current" />
                  <span className="font-medium">{featuredMovie.vote_average.toFixed(1)}</span>
                </div>
              </div>
              <h1 className="mb-4 text-4xl lg:text-6xl font-bold leading-tight">
                {featuredMovie.title}
              </h1>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {featuredMovie.genres.slice(0, 3).map((genre) => (
                <span key={genre} className="badge badge-outline badge-lg">
                  {genre}
                </span>
              ))}
            </div>
            
            <p className="text-lg leading-relaxed text-gray-200">
              {featuredMovie.overview.slice(0, 200)}...
            </p>
            
            <div className="flex gap-4 justify-center lg:justify-start">
              {featuredMovie.trailer_url && (
                <a 
                  href={featuredMovie.trailer_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                >
                  <Play size={20} />
                  Watch Trailer
                </a>
              )}
              <button 
                onClick={() => onMovieClick(featuredMovie)}
                className="btn btn-outline btn-lg gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
              >
                <Info size={20} />
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;