import { useEffect, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

interface PreloaderProps {
  loading: boolean;
  progress: number;
}

export const Preloader = ({ loading, progress }: PreloaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const isDark = useTheme();

  useEffect(() => {
    if (!loading) {
      // Fade out animation
      setTimeout(() => {
        setIsVisible(false);
      }, 500);
    }
  }, [loading]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500 ${
        loading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } ${
        isDark 
          ? 'bg-gradient-to-br from-neutral-900 via-purple-900/20 to-neutral-900' 
          : 'bg-gradient-to-br from-neutral-50 via-purple-50/30 to-neutral-50'
      }`}
    >
      <div className="flex flex-col items-center justify-center space-y-8">
        {/* Swiss Roll Spiral Loader */}
        <div className="relative w-40 h-40">
          <svg className="w-full h-full" viewBox="0 0 160 160">
            <defs>
              <linearGradient id="gradient-outer" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={isDark ? "#a855f7" : "#c084fc"} />
                <stop offset="50%" stopColor={isDark ? "#ec4899" : "#f472b6"} />
                <stop offset="100%" stopColor={isDark ? "#a855f7" : "#c084fc"} />
              </linearGradient>
              <linearGradient id="gradient-middle" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={isDark ? "#ec4899" : "#f472b6"} />
                <stop offset="50%" stopColor={isDark ? "#a855f7" : "#c084fc"} />
                <stop offset="100%" stopColor={isDark ? "#ec4899" : "#f472b6"} />
              </linearGradient>
              <linearGradient id="gradient-inner" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={isDark ? "#a855f7" : "#c084fc"} />
                <stop offset="50%" stopColor={isDark ? "#ec4899" : "#f472b6"} />
                <stop offset="100%" stopColor={isDark ? "#a855f7" : "#c084fc"} />
              </linearGradient>
            </defs>
            
            {/* Outer spiral - Swiss roll layer 1 */}
            <g className="swiss-roll-outer">
              <path
                d="M 80 80 L 80 20 A 60 60 0 0 1 140 80 A 60 60 0 0 1 80 140 A 60 60 0 0 1 20 80 A 60 60 0 0 1 80 20"
                fill="none"
                stroke="url(#gradient-outer)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="swiss-roll-path"
              />
            </g>
            
            {/* Middle spiral - Swiss roll layer 2 */}
            <g className="swiss-roll-middle">
              <path
                d="M 80 80 L 80 35 A 45 45 0 0 1 125 80 A 45 45 0 0 1 80 125 A 45 45 0 0 1 35 80 A 45 45 0 0 1 80 35"
                fill="none"
                stroke="url(#gradient-middle)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="swiss-roll-path"
              />
            </g>
            
            {/* Inner spiral - Swiss roll layer 3 */}
            <g className="swiss-roll-inner">
              <path
                d="M 80 80 L 80 50 A 30 30 0 0 1 110 80 A 30 30 0 0 1 80 110 A 30 30 0 0 1 50 80 A 30 30 0 0 1 80 50"
                fill="none"
                stroke="url(#gradient-inner)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="swiss-roll-path"
              />
            </g>
          </svg>
          
          {/* Center pulsing circle */}
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full ${
            isDark 
              ? 'bg-gradient-to-br from-pink-500 to-purple-600' 
              : 'bg-gradient-to-br from-pink-400 to-purple-500'
          } animate-pulse flex items-center justify-center shadow-2xl`}>
            <span className="text-xl font-bold text-white">SV</span>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${
            isDark 
              ? 'from-pink-400 to-purple-400' 
              : 'from-pink-500 to-purple-600'
          } bg-clip-text text-transparent`}>
            Loading...
          </h2>
          <p className={`text-sm ${
            isDark ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            Preparing your experience
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 md:w-80 space-y-2">
          <div className={`h-2 rounded-full overflow-hidden ${
            isDark ? 'bg-neutral-700' : 'bg-neutral-200'
          }`}>
            <div
              className={`h-full rounded-full transition-all duration-300 ease-out ${
                isDark
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500'
                  : 'bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400'
              } shadow-lg`}
              style={{ width: `${progress}%` }}
            >
              <div className="h-full w-full bg-white/30 animate-pulse" />
            </div>
          </div>
          <p className={`text-xs text-center font-medium ${
            isDark ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            {progress}%
          </p>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full ${
                isDark
                  ? 'bg-purple-500/20'
                  : 'bg-purple-400/30'
              } animate-float`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        @keyframes swiss-roll-rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @keyframes swiss-roll-reverse {
          0% {
            transform: rotate(360deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
        
        .swiss-roll-outer {
          animation: swiss-roll-rotate 2s linear infinite;
        }
        
        .swiss-roll-middle {
          animation: swiss-roll-reverse 1.5s linear infinite;
        }
        
        .swiss-roll-inner {
          animation: swiss-roll-rotate 1s linear infinite;
        }
        
        .swiss-roll-path {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          animation: swiss-roll-dash 2s ease-in-out infinite;
        }
        
        @keyframes swiss-roll-dash {
          0% {
            stroke-dashoffset: 400;
            opacity: 0.3;
          }
          50% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
          100% {
            stroke-dashoffset: -400;
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
};

