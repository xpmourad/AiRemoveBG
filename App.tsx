
import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ImageDisplay } from './components/ImageDisplay';
import { Button } from './components/Button';
import { Loader } from './components/Loader';
import { removeBackground } from './services/geminiService';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    setOriginalImage(file);
    setOriginalImageUrl(URL.createObjectURL(file));
    setProcessedImageUrl(null);
    setError(null);
  };

  const handleRemoveBackground = useCallback(async () => {
    if (!originalImage) return;

    setIsLoading(true);
    setError(null);
    setProcessedImageUrl(null);

    try {
      const resultUrl = await removeBackground(originalImage);
      setProcessedImageUrl(resultUrl);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage]);

  const handleReset = () => {
    setOriginalImage(null);
    setOriginalImageUrl(null);
    setProcessedImageUrl(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      {isLoading && <Loader />}
      <div className="w-full max-w-5xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            AI Background Remover
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Upload an image to magically remove the background in seconds.
          </p>
        </header>

        <main className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-700">
          {!originalImageUrl && (
            <ImageUploader onImageSelect={handleImageSelect} />
          )}

          {originalImageUrl && !processedImageUrl && !isLoading && (
            <div className="flex flex-col items-center gap-6">
              <ImageDisplay src={originalImageUrl} alt="Original" title="Your Image" />
              <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={handleRemoveBackground} disabled={isLoading}>
                    Remove Background
                  </Button>
                  <Button onClick={handleReset} variant="secondary">
                    Choose a different image
                  </Button>
              </div>
            </div>
          )}

          {error && (
            <div className="text-center p-4 bg-red-900/50 text-red-300 rounded-lg border border-red-700">
              <p className="font-bold">An Error Occurred</p>
              <p>{error}</p>
              <Button onClick={handleReset} variant="secondary" className="mt-4">Try Again</Button>
            </div>
          )}

          {processedImageUrl && (
            <div className="flex flex-col items-center gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                <ImageDisplay src={originalImageUrl!} alt="Original" title="Original" />
                <ImageDisplay src={processedImageUrl} alt="Background Removed" title="Result" isResult={true} />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <a
                  href={processedImageUrl}
                  download="background-removed.png"
                  className="w-full sm:w-auto text-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-900 transition-all duration-300"
                >
                  Download Image
                </a>
                 <Button onClick={handleReset} variant="secondary">
                    Start Over
                  </Button>
              </div>
            </div>
          )}
        </main>
        <footer className="text-center mt-8 text-gray-500 text-sm">
            <p>Powered by Gemini API</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
