import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import FavoritePage from './views/FavoritePage';
import TVShowsPage from './views/TvShowPage';
import MoviesPage from './views/MoviesPage';
import HomePage from './views/Home';
import GenresPage from './views/GenresPage';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage searchQuery="" watchlistCount={0} addToWatchlist={() => {}} isInWatchlist={() => false} />} />
          <Route path="/movies" element={<MoviesPage searchQuery="" />} />
          <Route path="/favorites" element={<FavoritePage />} />
          <Route path='/tvshows' element={<TVShowsPage searchQuery="" addToWatchlist={() => {}} isInWatchlist={() => false} />} />
          <Route path="/genres" element={<GenresPage searchQuery="" addToWatchlist={() => {}} isInWatchlist={() => false} />} />
        </Route>
          <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;