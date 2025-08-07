// src/components/MovieCardSkeleton.tsx
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const MovieCardSkeleton: React.FC = () => {
  return (
    <div
      className="card shadow-xl animate-pulse"
      style={{ backgroundColor: '#15191e' }}
    >
      <figure className="relative h-80 w-full bg-gray-400 rounded overflow-hidden">
        <Skeleton height="100%" width="100%" />
      </figure>

      <div className="card-body p-4">
        <h2 className="text-base font-semibold text-white mb-2">
          <Skeleton width="80%" />
        </h2>

        <div className="flex items-center gap-2 text-sm mb-2">
          <Skeleton width={30} height={14} />
          <Skeleton width={20} height={14} />
        </div>

        <div className="flex gap-2 mb-3">
          <Skeleton width={40} height={20} />
          <Skeleton width={40} height={20} />
        </div>

        <div className="text-xs text-gray-500">
          <Skeleton count={3} />
        </div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
