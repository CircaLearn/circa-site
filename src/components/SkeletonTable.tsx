export default function SkeletonTable() {
  return (
    <div className="w-full px-4">
      {/* make 5 rows */}
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex justify-between py-2">
          <div className="flex-1 h-6 bg-gray-300 mx-2 rounded shimmer"></div>
          <div className="flex-1 h-6 bg-gray-300 mx-2 rounded shimmer"></div>
          <div className="flex-1 h-6 bg-gray-300 mx-2 rounded shimmer"></div>
          <div className="flex-1 h-6 bg-gray-300 mx-2 rounded shimmer"></div>
          <div className="flex-1 h-6 bg-gray-300 mx-2 rounded shimmer"></div>
        </div>
      ))}
    </div>
  );
}
