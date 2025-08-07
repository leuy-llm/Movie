import { Link } from 'react-router-dom';
import { genres } from '../data/movieData';
import { Clock, Film, Tv, Heart } from 'lucide-react';

function Genres() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.21 0.03 263.45)' }}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Explore Genres</h1>
          <p className="text-gray-400">
            Browse movies and TV shows by genre
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {genres.map((genre) => (
            <Link 
              to={`/genre/${genre.id}`} 
              key={genre.id}
              className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div 
                className="h-48 bg-gradient-to-r from-blue-900 to-purple-900 flex items-center justify-center"
                style={{ backgroundColor: `hsl(${genre.id * 10}, 70%, 30%)` }}
              >
                <div className="text-center p-4">
                  <Film size={48} className="mx-auto mb-2 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                  <h3 className="text-2xl font-bold text-white">{genre.name}</h3>
                </div>
              </div>
              
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex space-x-4 text-white">
                  <div className="flex items-center">
                    <Film size={20} className="mr-1" />
                    <span>120+ Movies</span>
                  </div>
                  <div className="flex items-center">
                    <Tv size={20} className="mr-1" />
                    <span>80+ Shows</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Popular Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link 
              to="/trending" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-lg flex items-center hover:shadow-lg transition-shadow"
            >
              <Clock className="mr-3" size={24} />
              <div>
                <h3 className="font-medium">Trending Now</h3>
                <p className="text-sm text-gray-300">Most popular this week</p>
              </div>
            </Link>
            <Link 
              to="/top-rated" 
              className="bg-gradient-to-r from-green-600 to-teal-600 p-4 rounded-lg flex items-center hover:shadow-lg transition-shadow"
            >
              <Film className="mr-3" size={24} />
              <div>
                <h3 className="font-medium">Top Rated Movies</h3>
                <p className="text-sm text-gray-300">Highest rated of all time</p>
              </div>
            </Link>
            <Link 
              to="/watchlist" 
              className="bg-gradient-to-r from-red-600 to-pink-600 p-4 rounded-lg flex items-center hover:shadow-lg transition-shadow"
            >
              <Heart className="mr-3" size={24} />
              <div>
                <h3 className="font-medium">Your Watchlist</h3>
                <p className="text-sm text-gray-300">Saved for later</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Genres;