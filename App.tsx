
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ThemeSelector } from './components/ThemeSelector';
import { ResultDisplay } from './components/ResultDisplay';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { generateCostumeImage } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';

type OriginalImage = {
  file: File;
  base64: string;
};

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<OriginalImage | null>(null);
  const [theme, setTheme] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    try {
      const base64 = await fileToBase64(file);
      setOriginalImage({ file, base64 });
      setGeneratedImage(null);
      setError(null);
    } catch (err) {
      setError('Failed to load image. Please try another file.');
    }
  };

  const handleGenerate = useCallback(async () => {
    if (!originalImage || !theme) {
      setError('Please upload an image and select a theme first.');
      return;
    }

    setIsLoading(true);
    setGeneratedImage(null);
    setError(null);

    try {
      const { base64, file } = originalImage;
      const resultBase64 = await generateCostumeImage(base64, file.type, theme);
      setGeneratedImage(`data:image/png;base64,${resultBase64}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to generate costume. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, theme]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl mx-auto">
        <Header />

        <main className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="flex flex-col space-y-6 bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-lg">
            <div>
              <h2 className="text-xl font-bold text-orange-400 mb-1">1. Upload Your Photo</h2>
              <p className="text-sm text-gray-400">Pick a clear, well-lit photo of a person.</p>
            </div>
            <ImageUploader onImageUpload={handleImageUpload} currentImage={originalImage?.base64 ?? null} />
            
            <div>
              <h2 className="text-xl font-bold text-orange-400 mb-1">2. Choose Your Costume</h2>
              <p className="text-sm text-gray-400">Select a theme or type your own spooky idea.</p>
            </div>
            <ThemeSelector onThemeChange={setTheme} />

            <button
              onClick={handleGenerate}
              disabled={isLoading || !originalImage || !theme}
              className="w-full flex items-center justify-center px-6 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-lg text-lg transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:text-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50"
            >
              <SparklesIcon className="w-6 h-6 mr-3" />
              {isLoading ? 'Conjuring...' : 'Generate Costume'}
            </button>
          </div>

          <div className="flex flex-col bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-lg min-h-[400px] lg:min-h-0">
            <h2 className="text-xl font-bold text-orange-400 mb-4">3. Behold the Transformation!</h2>
            <ResultDisplay
              isLoading={isLoading}
              error={error}
              generatedImage={generatedImage}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
