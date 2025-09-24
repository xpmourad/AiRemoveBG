
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex flex-col items-center justify-center z-50 backdrop-blur-sm">
      <div className="w-16 h-16 border-4 border-t-purple-500 border-r-purple-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-lg text-gray-200">AI is working its magic...</p>
    </div>
  );
};
