import React, { useState } from 'react';
import { Search, Film, Menu, Heart, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom'; // ✅ import useLocation

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  watchlistCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ searchQuery, onSearchChange, watchlistCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // ✅ get current path

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex items-center justify-between p-4 shadow-md sticky top-0 z-50" style={{ backgroundColor: '#15191e' }}>
      {/* Left - Brand & menu button */}
      <div className="flex items-center space-x-4">
        <button onClick={toggleMenu} className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors duration-200" aria-label="Toggle menu">
          {isMenuOpen ? <X size={20} className="text-gray-700" /> : <Menu size={20} className="text-gray-700" />}
        </button>
        <a href="/" className="flex items-center space-x-2 text-lg font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200">
          <Film size={24} />
          <span>Movie App</span>
        </a>
      </div>

      {/* Desktop Nav */}
      <div className="hidden lg:flex space-x-6">
        <Link to="/" className={isActive('/') ? 'active' : 'text-gray-300 hover:text-blue-600'}>Home</Link>
        <Link to="/movies" className={isActive('/movies') ? 'active' : 'text-gray-300 hover:text-blue-600'}>Movies</Link>
        <Link to="/tvshows" className={isActive('/tvshows') ? 'active' : 'text-gray-300 hover:text-blue-600'}>TV Shows</Link>
        <Link to="/genres" className={isActive('/genres') ? 'active' : 'text-gray-300 hover:text-blue-600'}>Genres</Link>
      </div>

      {/* Right - Search & Watchlist */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search movies..."
            className="py-1 px-3 pr-8 rounded border border-gray-300 text-white w-32 md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-700">
            <Search size={16} />
          </button>
        </div>

        <div className="relative">
          <Link to="/favorites" className="relative">
            <span className="absolute -top-2 -right-2 bg-blue-800 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {watchlistCount}
            </span>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Heart size={20} className="text-gray-400 hover:text-red-500" />
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed top-16 left-0 w-full shadow-lg transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`} style={{ backgroundColor: "#15191e" }}>
        <div className="p-2 space-y-1">
          <Link to="/" onClick={toggleMenu} className={`block py-3 px-4 rounded-md ${isActive('/') ? 'active' : 'hover:bg-gray-700 text-white'}`}>
            Home
          </Link>
          <Link to="/movies" onClick={toggleMenu} className={`block py-3 px-4 rounded-md ${isActive('/movies') ? 'active' : 'hover:bg-gray-700 text-white'}`}>
            Movies
          </Link>
          <Link to="/tvshows" onClick={toggleMenu} className={`block py-3 px-4 rounded-md ${isActive('/tvshows') ? 'active' : 'hover:bg-gray-700 text-white'}`}>
            TV Shows
          </Link>
          <Link to="/genres" onClick={toggleMenu} className={`block py-3 px-4 rounded-md ${isActive('/genres') ? 'active' : 'hover:bg-gray-700 text-white'}`}>
            Genres
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
