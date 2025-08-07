// src/components/HeroSkeleton.tsx
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const HeroSkeleton: React.FC = () => {
  return (
    <div className="hero min-h-[60vh] relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-400 via-gray-600 to-transparent"></div>

      <div className="hero-content text-neutral-content relative z-10 max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 w-full">
          <div className="flex-shrink-0">
            <Skeleton height={384} width={256} className="rounded-lg" />
          </div>

          <div className="max-w-md text-center lg:text-left space-y-6 w-full">
            <div>
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                <Skeleton width={80} height={24} />
                <Skeleton width={50} height={24} />
              </div>
              <h1 className="mb-4">
                <Skeleton height={48} width="100%" />
                <Skeleton height={48} width="80%" />
              </h1>
            </div>

            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              <Skeleton width={60} height={32} />
              <Skeleton width={60} height={32} />
              <Skeleton width={60} height={32} />
            </div>

            <p className="text-gray-300">
              <Skeleton count={3} />
            </p>

            <div className="flex gap-4 justify-center lg:justify-start">
              <Skeleton height={48} width={150} />
              <Skeleton height={48} width={150} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSkeleton;
