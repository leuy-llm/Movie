function ShowCardSkeleton() {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg animate-pulse">
      <div className="bg-gray-700 w-full h-64"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-700 rounded mb-3 w-3/4"></div>
        <div className="flex justify-between mb-3">
          <div className="h-4 bg-gray-700 rounded w-1/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/4"></div>
        </div>
        <div className="flex space-x-2 mb-4">
          <div className="h-5 bg-gray-700 rounded w-1/3"></div>
          <div className="h-5 bg-gray-700 rounded w-1/3"></div>
        </div>
        <div className="h-8 bg-gray-700 rounded w-full"></div>
      </div>
    </div>
  );
}

export default ShowCardSkeleton;