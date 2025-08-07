import React from 'react';

const StatCardSkeleton: React.FC = () => {
  return (
    <div className="stat bg-[#1f2937] rounded-lg p-6 animate-pulse">
      <div className="stat-figure mb-4">
        <div className="w-8 h-8 bg-gray-700 rounded-full" />
      </div>
      <div className="h-4 w-24 bg-gray-700 rounded mb-2"></div>
      <div className="h-6 w-16 bg-gray-600 rounded mb-2"></div>
      <div className="h-3 w-32 bg-gray-700 rounded"></div>
    </div>
  );
};

export default StatCardSkeleton;
