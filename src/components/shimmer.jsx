import React from 'react';
// import 'tailwindcss/tailwind.css';

const Shimmer = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex space-x-4">
          {Array.from({ length: 5 }).map((_, colIndex) => (
            <div key={colIndex} className="w-52 h-32 bg-gray-300 animate-pulse rounded-md" />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
