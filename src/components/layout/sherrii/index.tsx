import { useState, useEffect, useRef } from 'react';
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
  const [iconPosition, setIconPosition] = useState(80); // Default top position in pixels
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [currentDragY, setCurrentDragY] = useState(0);
  const dragStartRef = useRef({ y: 0, top: 0 });
  const currentDragYRef = useRef(0);

  // Load saved position from localStorage on mount
  useEffect(() => {
    const savedPosition = localStorage.getItem('sherrii-icon-position');
    if (savedPosition) {
      setIconPosition(parseInt(savedPosition, 10));
    }
  }, []);

  // Save position to localStorage whenever it changes (but not while dragging)
  useEffect(() => {
    if (!isDragging && iconPosition !== 80) {
      localStorage.setItem('sherrii-icon-position', iconPosition.toString());
    }
  }, [iconPosition, isDragging]);

  const handleCloseAnnoying = () => {
    setAnnoyingOpen(false);
    setIsDismissed();
    setShowAnnoyingToast(true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setHasDragged(false);
    dragStartRef.current = {
      y: e.clientY,
      top: iconPosition,
    };
  };

  useEffect(() => {
    if (!isDragging) return;

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      
      const deltaY = e.clientY - dragStartRef.current.y;
      
      // Track if user has actually dragged (more than 5px threshold)
      if (Math.abs(deltaY) > 5) {
        setHasDragged(true);
      }

      // Use requestAnimationFrame for smooth updates
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        const newTop = dragStartRef.current.top + deltaY;
        
        // Constrain to viewport bounds (with padding)
        const minTop = 20;
        const maxTop = window.innerHeight - 60; // Button height + padding
        
        const constrainedTop = Math.max(minTop, Math.min(maxTop, newTop));
        const constrainedDelta = constrainedTop - dragStartRef.current.top;
        
        currentDragYRef.current = constrainedDelta;
        setCurrentDragY(constrainedDelta);
      });
    };

    const handleMouseUp = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      // Update final position
      const finalTop = dragStartRef.current.top + currentDragYRef.current;
      const minTop = 20;
      const maxTop = window.innerHeight - 60;
      const constrainedTop = Math.max(minTop, Math.min(maxTop, finalTop));
      setIconPosition(constrainedTop);
      
      setIsDragging(false);
      setCurrentDragY(0);
      
      // Reset hasDragged after a short delay to allow click if no drag occurred
      setTimeout(() => {
        setHasDragged(false);
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: false });
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleClick = (e: React.MouseEvent) => {
    // Prevent click if user was dragging
    if (hasDragged) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    restartMessages();
  };

  return (
    <>
      {isDismissed && !isAnnoyingOpen && (
        <button
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          className={`fixed left-6 z-50 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 text-white rounded-full p-3 shadow-2xl hover:shadow-3xl hover:scale-110 hover:rotate-12 ${
            isDragging 
              ? 'cursor-grabbing scale-105 select-none' 
              : 'cursor-grab animate-pulse'
          }`}
          style={{ 
            top: `${iconPosition}px`,
            transform: isDragging ? `translateY(${currentDragY}px)` : undefined,
            transition: isDragging ? 'none' : 'top 0.2s ease-out',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            pointerEvents: 'auto',
          }}
          aria-label="Restart annoying messages"
          title="Drag me around! Click to restart messages"
        >
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