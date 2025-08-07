import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'react-loading-skeleton/dist/skeleton.css';
import { WatchlistProvider } from './context/WatchlistContext.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WatchlistProvider>
      <App />
    </WatchlistProvider>
  </StrictMode>,
)
