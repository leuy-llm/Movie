// src/components/MovieModalSkeleton.tsx
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const MovieModalSkeleton: React.FC = () => {
  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-4xl max-h-[90vh] p-0" style={{ backgroundColor: 'oklch(21.15% 0.012 254.09)' }}>
        <div className="relative">
          {/* Header Image */}
          <div className="relative h-64 md:h-80 overflow-hidden rounded-t-lg">
            <Skeleton height="100%" width="100%" />
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-700 opacity-50" />
          </div>

          {/* Content */}
          <div className="p-6 -mt-16 relative z-10">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Poster */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <Skeleton width={192} height={288} className="rounded-lg" />
              </div>

              {/* Movie Details */}
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    <Skeleton width="70%" />
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                    <Skeleton width={80} height={16} />
                    <Skeleton width={60} height={16} />
                    <Skeleton width={60} height={16} />
                  </div>

                  <div className="flex gap-2 mb-4">
                    <Skeleton width={60} height={28} />
                    <Skeleton width={60} height={28} />
                    <Skeleton width={60} height={28} />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    <Skeleton width={100} />
                  </h3>
                  <Skeleton count={3} />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    <Skeleton width={80} />
                  </h3>
                  <Skeleton width="60%" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    <Skeleton width={60} />
                  </h3>
                  <Skeleton width="80%" />
                </div>

                <div className="flex gap-3 pt-4">
                  <Skeleton height={40} width={140} />
                  <Skeleton height={40} width={140} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div className="modal-backdrop"></div>
    </div>
  );
};

export default MovieModalSkeleton;
