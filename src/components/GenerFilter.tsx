import React from 'react';
import { Filter } from 'lucide-react';
import type { Genre } from '../types/movie';

interface GenreFilterProps {
  genres: Genre[];
  selectedGenres: number[];
  onGenreToggle: (genreId: number) => void;
  onClearFilters: () => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({
  genres,
  selectedGenres,
  onGenreToggle,
  onClearFilters
}) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-primary" />
          <h3 className="font-semibold text-white">Filter by Genre</h3>
        </div>
        {selectedGenres.length > 0 && (
          <button 
            onClick={onClearFilters}
            className="btn btn-ghost btn-sm text-primary"
          >
            Clear All
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onGenreToggle(genre.id)}
            className={`btn btn-sm ${
              selectedGenres.includes(genre.id)
                ? 'btn-primary'
                : 'btn-outline  hover:bg-gray-800 btn-ghost'
            } transition-all text-white duration-200`}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;