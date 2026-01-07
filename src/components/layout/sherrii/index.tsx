import { useState, useEffect, useRef } from 'react';
import { FiX } from 'react-icons/fi';
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

// Cute Butterfly Component with Nudge Animation
const CuteButterfly = ({ isDragging }: { isDragging: boolean }) => (
  <div className={`relative w-16 h-16 sm:w-20 sm:h-20 ${isDragging ? '' : 'animate-nudge'}`}>
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full"
      style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.15))' }}
    >
      {/* Upper Left Wing */}
      <ellipse cx="30" cy="35" rx="20" ry="25" fill="#ff6b9d" opacity="0.9" />
      <ellipse cx="30" cy="35" rx="15" ry="20" fill="#ff8fab" />
      <ellipse cx="25" cy="30" rx="8" ry="10" fill="#ffb3d9" />
      
      {/* Upper Right Wing */}
      <ellipse cx="70" cy="35" rx="20" ry="25" fill="#ff6b9d" opacity="0.9" />
      <ellipse cx="70" cy="35" rx="15" ry="20" fill="#ff8fab" />
      <ellipse cx="75" cy="30" rx="8" ry="10" fill="#ffb3d9" />
      
      {/* Lower Left Wing */}
      <ellipse cx="30" cy="65" rx="20" ry="25" fill="#c77dff" opacity="0.9" />
      <ellipse cx="30" cy="65" rx="15" ry="20" fill="#d89eff" />
      <ellipse cx="25" cy="70" rx="8" ry="10" fill="#e6b3ff" />
      
      {/* Lower Right Wing */}
      <ellipse cx="70" cy="65" rx="20" ry="25" fill="#c77dff" opacity="0.9" />
      <ellipse cx="70" cy="65" rx="15" ry="20" fill="#d89eff" />
      <ellipse cx="75" cy="70" rx="8" ry="10" fill="#e6b3ff" />
      
      {/* Body */}
      <ellipse cx="50" cy="50" rx="4" ry="35" fill="#4a5568" />
      <ellipse cx="50" cy="45" rx="3" ry="8" fill="#2d3748" />
      
      {/* Antennae */}
      <line x1="50" y1="15" x2="45" y2="10" stroke="#2d3748" strokeWidth="2" strokeLinecap="round" />
      <line x1="50" y1="15" x2="55" y2="10" stroke="#2d3748" strokeWidth="2" strokeLinecap="round" />
      <circle cx="45" cy="10" r="2" fill="#ff6b9d" />
      <circle cx="55" cy="10" r="2" fill="#ff6b9d" />
      
      {/* Wing Patterns - Left Upper */}
      <circle cx="25" cy="30" r="3" fill="#ffffff" opacity="0.7" />
      <circle cx="32" cy="38" r="2" fill="#ffffff" opacity="0.5" />
      
      {/* Wing Patterns - Right Upper */}
      <circle cx="75" cy="30" r="3" fill="#ffffff" opacity="0.7" />
      <circle cx="68" cy="38" r="2" fill="#ffffff" opacity="0.5" />
      
      {/* Wing Patterns - Left Lower */}
      <circle cx="25" cy="70" r="3" fill="#ffffff" opacity="0.7" />
      <circle cx="32" cy="62" r="2" fill="#ffffff" opacity="0.5" />
      
      {/* Wing Patterns - Right Lower */}
      <circle cx="75" cy="70" r="3" fill="#ffffff" opacity="0.7" />
      <circle cx="68" cy="62" r="2" fill="#ffffff" opacity="0.5" />
    </svg>
    
    {/* Nudge Animation Styles */}
    <style>{`
      @keyframes nudge {
        0%, 100% {
          transform: translateX(0) rotate(0deg);
        }
        10% {
          transform: translateX(8px) rotate(-5deg);
        }
        20% {
          transform: translateX(0) rotate(0deg);
        }
        30% {
          transform: translateX(6px) rotate(3deg);
        }
        40% {
          transform: translateX(0) rotate(0deg);
        }
        50% {
          transform: translateX(4px) rotate(-2deg);
        }
        60% {
          transform: translateX(0) rotate(0deg);
        }
        70% {
          transform: translateX(3px) rotate(2deg);
        }
        80% {
          transform: translateX(0) rotate(0deg);
        }
        90% {
          transform: translateX(2px) rotate(-1deg);
        }
        100% {
          transform: translateX(0) rotate(0deg);
        }
      }
      .animate-nudge {
        animation: nudge 2s ease-in-out infinite;
      }
    `}</style>
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
  const shouldPreventScrollRef = useRef(false);

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

  const getClientY = (e: MouseEvent | TouchEvent): number => {
    if ('touches' in e && e.touches.length > 0) {
      return e.touches[0].clientY;
    }
    if ('clientY' in e) {
      return e.clientY;
    }
    return 0;
  };

  const handleStart = (clientY: number) => {
    setIsDragging(true);
    setHasDragged(false);
    dragStartRef.current = {
      y: clientY,
      top: iconPosition,
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleStart(e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    // Don't prevent default here - allow normal scrolling unless user drags
    if (e.touches.length === 1) {
      handleStart(e.touches[0].clientY);
    }
  };

  useEffect(() => {
    if (!isDragging) {
      shouldPreventScrollRef.current = false;
      return;
    }

    let animationFrameId: number;

    const handleMove = (clientY: number) => {
      const deltaY = clientY - dragStartRef.current.y;
      
      // Track if user has actually dragged (more than 5px threshold)
      if (Math.abs(deltaY) > 5) {
        setHasDragged(true);
        shouldPreventScrollRef.current = true;
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

    const handleMouseMove = (e: MouseEvent) => {
      if (shouldPreventScrollRef.current) {
        e.preventDefault();
      }
      handleMove(e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        if (shouldPreventScrollRef.current) {
          e.preventDefault();
        }
        handleMove(e.touches[0].clientY);
      }
    };

    const handleEnd = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      // Calculate final position
      const finalTop = dragStartRef.current.top + currentDragYRef.current;
      const minTop = 20;
      const maxTop = window.innerHeight - 60;
      const constrainedTop = Math.max(minTop, Math.min(maxTop, finalTop));
      
      // Update position and reset drag state synchronously - no animation
      setIconPosition(constrainedTop);
      setCurrentDragY(0);
      setIsDragging(false);
      shouldPreventScrollRef.current = false;
      
      // Reset hasDragged after a short delay to allow click if no drag occurred
      setTimeout(() => {
        setHasDragged(false);
      }, 100);
    };

    const handleMouseUp = () => handleEnd();
    const handleTouchEnd = () => handleEnd();

    window.addEventListener('mousemove', handleMouseMove, { passive: false });
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      shouldPreventScrollRef.current = false;
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

  const handleTouchEndClick = (e: React.TouchEvent) => {
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
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEndClick}
          className={`fixed left-0 z-50 touch-none ${
            isDragging 
              ? 'cursor-grabbing select-none' 
              : 'cursor-grab'
          }`}
          style={{ 
            top: `${iconPosition}px`,
            transform: isDragging ? `translateY(${currentDragY}px)` : 'translateY(0)',
            transition: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            WebkitTouchCallout: 'none',
            touchAction: isDragging ? 'none' : 'manipulation',
            pointerEvents: 'auto',
            willChange: isDragging ? 'transform' : 'auto',
            padding: '8px',
            background: 'transparent',
            border: 'none',
            outline: 'none',
          }}
          aria-label="Restart annoying messages"
          title="Drag me around! Click to restart messages"
        >
          <div className={`relative ${isDragging ? 'scale-105' : 'hover:scale-110'} transition-transform duration-200`}>
            <CuteButterfly isDragging={isDragging} />
          </div>
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