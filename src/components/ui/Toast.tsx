import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

export const Toast = ({ message, duration = 3000, onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3 max-w-md">
        <p className="text-sm font-medium flex-1">{message}</p>
        <button onClick={() => { setIsVisible(false); setTimeout(onClose, 300); }} className="text-white/80 dark:text-neutral-600 hover:text-white dark:hover:text-neutral-900 transition-colors" aria-label="Close">
          <FiX className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

