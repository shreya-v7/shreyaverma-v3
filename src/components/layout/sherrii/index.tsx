import { useState, useEffect } from 'react';
import { FiX, FiZap } from 'react-icons/fi';
import { Corner } from '../../../types';
import { sherriiMessages } from '../../../data/sherrii-messages';
import { Toast } from '../../ui/Toast';
import { getCornerClasses, getRandomCorner } from '../../../utils/sherrii-positions';

const useAnnoyingMessages = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(sherriiMessages[0]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentCorner, setCurrentCorner] = useState<Corner>('bottom-right');
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) {
      setIsOpen(false);
      return;
    }
    const showSherrii = () => {
      if (!isOpen && !isDismissed) {
        setCurrentCorner(getRandomCorner());
        setCurrentMessage(sherriiMessages[Math.floor(Math.random() * sherriiMessages.length)]);
        setIsOpen(true);
      }
    };
    const initialDelay = Math.random() * 5000 + 3000;
    const initialTimer = setTimeout(showSherrii, initialDelay);
    const interval = setInterval(() => {
      if (!isOpen && !isDismissed) {
        const randomDelay = Math.random() * 60000 + 30000;
        setTimeout(showSherrii, randomDelay);
      }
    }, 10000);
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isOpen, isDismissed]);

  useEffect(() => {
    if (!isOpen || isDismissed) return;
    const interval = setInterval(() => {
      if (isDismissed) {
        clearInterval(interval);
        return;
      }
      setIsTyping(true);
      setTimeout(() => {
        if (isDismissed) return;
        setCurrentMessage(sherriiMessages[Math.floor(Math.random() * sherriiMessages.length)]);
        setIsTyping(false);
        if (Math.random() < 0.3) setCurrentCorner(getRandomCorner());
      }, 500);
    }, 7000);
    return () => clearInterval(interval);
  }, [isOpen, isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsOpen(false);
  };

  const restartMessages = () => {
    setIsDismissed(false);
    setCurrentCorner(getRandomCorner());
    setCurrentMessage(sherriiMessages[Math.floor(Math.random() * sherriiMessages.length)]);
    setIsOpen(true);
  };

  return { 
    isOpen, 
    currentMessage, 
    isTyping, 
    currentCorner, 
    isDismissed, 
    setIsOpen, 
    setIsDismissed: handleDismiss,
    restartMessages
  };
};

const SherriiBubble = ({ message, isTyping, onClose }: { message: string; isTyping: boolean; onClose: () => void }) => (
  <div className="flex items-center gap-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full shadow-2xl px-4 py-3 pr-2 max-w-[calc(100vw-3rem)]">
    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
      <span className="text-xl">👩</span>
    </div>
    <div className="flex-1 min-w-0 max-w-[200px]">
      {isTyping ? (
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      ) : (
        <p className="text-neutral-900 dark:text-neutral-100 text-xs font-medium break-words whitespace-pre-wrap">
          {message}
        </p>
      )}
    </div>
    <button
      onClick={onClose}
      className="flex-shrink-0 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors p-1.5 hover:rotate-90 duration-300 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"
      aria-label="Close"
    >
      <FiX className="w-4 h-4" />
    </button>
  </div>
);

export const Sherrii = () => {
  const [showAnnoyingToast, setShowAnnoyingToast] = useState(false);
  const { isOpen: isAnnoyingOpen, currentMessage, isTyping, currentCorner, isDismissed, setIsOpen: setAnnoyingOpen, setIsDismissed, restartMessages } = useAnnoyingMessages();

  const handleCloseAnnoying = () => {
    setAnnoyingOpen(false);
    setIsDismissed();
    setShowAnnoyingToast(true);
  };

  return (
    <>
      {isDismissed && !isAnnoyingOpen && (
        <button onClick={restartMessages} className="fixed top-20 left-6 z-50 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 text-white rounded-full p-3 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 hover:rotate-12 animate-pulse" aria-label="Restart annoying messages" title="Wanna yap again? Click me!">
          <FiZap className="w-5 h-5" />
        </button>
      )}
      {showAnnoyingToast && <Toast message="fine! I won't annoy!" duration={2000} onClose={() => setShowAnnoyingToast(false)} />}
      {isAnnoyingOpen && !isDismissed && (
        <div className={`fixed ${getCornerClasses(currentCorner)} z-50 animate-in slide-in-from-bottom-4 fade-in duration-500`}>
          <SherriiBubble message={currentMessage} isTyping={isTyping} onClose={handleCloseAnnoying} />
        </div>
      )}
    </>
  );
};
