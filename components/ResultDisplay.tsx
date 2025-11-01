
import React from 'react';
import { Loader } from './Loader';
import { DownloadIcon } from './icons/DownloadIcon';

interface ResultDisplayProps {
  isLoading: boolean;
  error: string | null;
  generatedImage: string | null;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, error, generatedImage }) => {
  
  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'halloween-costume.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center h-full">
        <Loader />
        <p className="mt-4 text-lg text-orange-400 font-creepster tracking-wider">Generating your spooky look...</p>
        <p className="text-sm text-gray-400">This can take a moment.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-grow flex items-center justify-center h-full p-4 bg-red-900/20 border border-red-500 rounded-lg">
        <p className="text-center text-red-400">{error}</p>
      </div>
    );
  }

  if (generatedImage) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center h-full space-y-4">
        <div className="relative group w-full h-full min-h-[300px] flex items-center justify-center">
            <img src={generatedImage} alt="Generated costume" className="max-h-full max-w-full object-contain rounded-lg shadow-2xl shadow-black/50" />
            <button
                onClick={handleDownload}
                className="absolute bottom-4 right-4 bg-black/50 hover:bg-orange-600 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
                aria-label="Download Image"
            >
                <DownloadIcon className="w-6 h-6" />
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col items-center justify-center h-full text-center text-gray-500 bg-gray-900/30 rounded-lg p-4">
      <p className="text-2xl font-creepster tracking-wider">Your creation awaits...</p>
      <p>The generated image will appear here once you're done.</p>
    </div>
  );
};
