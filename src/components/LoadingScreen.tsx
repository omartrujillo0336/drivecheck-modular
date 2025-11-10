import { useEffect, useState } from "react";
import logoImage from "figma:asset/3093bb845f485984ff57f69a77a069fed95267c8.png";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoadingComplete, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-green-600 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="flex flex-col items-center gap-6 sm:gap-8 w-full max-w-md">
        {/* Logo animado */}
        <div className="relative w-full flex justify-center">
          <div className="absolute inset-0 bg-white/20 blur-2xl animate-pulse"></div>
          <div className="relative bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-2xl max-w-xs sm:max-w-sm w-full">
            <img 
              src={logoImage} 
              alt="DriveCheck Logo" 
              className="w-full h-auto animate-pulse"
              style={{ animationDuration: '2s' }}
            />
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="w-full max-w-xs sm:max-w-sm bg-white/20 rounded-full h-2 overflow-hidden backdrop-blur-sm">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-300 ease-out shadow-lg"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-white">Cargando módulos...</p>
      </div>
    </div>
  );
}
