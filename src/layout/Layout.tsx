import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import { useWatchlist } from '../hooks/useWatchlist'; // ✅ instead of hooks/useWatchlist


import { useState } from 'react';
import FooterPage from '../views/FooterPage';

const Layout = () => {
    const { watchlistCount } = useWatchlist();

    const [searchQuery, setSearchQuery] = useState('');
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.21 0.03 263.45)' }}>
      <Navbar 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        watchlistCount={watchlistCount}
      />
      <Outlet />
      <FooterPage />
      {/* Footer */}
    </div>
  );
};

export default Layout;
