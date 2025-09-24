
import React from 'react';

interface ImageDisplayProps {
  src: string;
  alt: string;
  title: string;
  isResult?: boolean;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ src, alt, title, isResult = false }) => {
  const resultBgStyle: React.CSSProperties = {
    backgroundImage: `
      linear-gradient(45deg, #4b5563 25%, transparent 25%), 
      linear-gradient(-45deg, #4b5563 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #4b5563 75%),
      linear-gradient(-45deg, transparent 75%, #4b5563 75%)`,
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
  };
  
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <h2 className="text-xl font-semibold text-gray-300">{title}</h2>
      <div 
        className="w-full max-w-md p-2 bg-gray-700/50 rounded-lg shadow-lg border border-gray-700"
        style={isResult ? resultBgStyle : {}}
      >
        <img
          src={src}
          alt={alt}
          className="rounded-md w-full h-auto object-contain max-h-96"
        />
      </div>
    </div>
  );
};
