import { useState, useEffect, useRef } from 'react';
import { FiX } from 'react-icons/fi';
import { Corner } from '../../../types';
import { sherriiMessages } from '../../../data/sherrii-messages';
import { pickSherriiAvatar, type SherriiAvatar } from '../../../data/sherrii-avatars';
import { Toast } from '../../ui/Toast';
import {
  getCornerClasses,
  getRandomCorner,
  getBubbleCornerFromDock,
} from '../../../utils/sherrii-positions';

function nextAvatarAvoidRepeat(prev: SherriiAvatar): SherriiAvatar {
  let next = pickSherriiAvatar();
  for (let i = 0; i < 14 && next === prev; i += 1) {
    next = pickSherriiAvatar();
  }
  return next;
}

const useAnnoyingMessages = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(sherriiMessages[0]);
  const [currentAvatar, setCurrentAvatar] = useState<SherriiAvatar>(() => pickSherriiAvatar());
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
        setCurrentAvatar(pickSherriiAvatar());
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
        setCurrentAvatar((a) => nextAvatarAvoidRepeat(a));
        setIsTyping(false);
        if (Math.random() < 0.3) setCurrentCorner(getRandomCorner());
      }, 500);
    }, 7000);
    return () => clearInterval(interval);
  }, [isOpen, isDismissed]);

  useEffect(() => {
    if (!isOpen || isDismissed) return;
    const id = window.setInterval(() => {
      setCurrentAvatar((a) => nextAvatarAvoidRepeat(a));
    }, 3600);
    return () => clearInterval(id);
  }, [isOpen, isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsOpen(false);
  };

  const restartMessages = (preferredCorner?: Corner) => {
    setIsDismissed(false);
    setCurrentCorner(preferredCorner ?? getRandomCorner());
    setCurrentMessage(sherriiMessages[Math.floor(Math.random() * sherriiMessages.length)]);
    setCurrentAvatar(pickSherriiAvatar());
    setIsOpen(true);
  };

  return { 
    isOpen, 
    currentMessage, 
    currentAvatar,
    isTyping, 
    currentCorner, 
    isDismissed, 
    setIsOpen, 
    setIsDismissed: handleDismiss,
    restartMessages
  };
};

function avatarHueShift(emoji: string): number {
  let n = 0;
  for (let i = 0; i < emoji.length; i += 1) n += emoji.charCodeAt(i);
  return (n % 118) - 48;
}

const SherriiBubble = ({
  message,
  isTyping,
  avatar,
  onClose,
}: {
  message: string;
  isTyping: boolean;
  avatar: SherriiAvatar;
  onClose: () => void;
}) => (
  <div className="flex items-center gap-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full shadow-2xl px-3 py-2 pr-1.5 max-w-[calc(100vw-3rem)]">
    <div
      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-pink-500 to-purple-600 transition-[filter] duration-700 ease-out shadow-inner"
      style={{ filter: `hue-rotate(${avatarHueShift(avatar)}deg) saturate(1.12)` }}
    >
      <span key={avatar} className="sherrii-avatar-emoji text-base leading-none block select-none" aria-hidden="true">
        {avatar}
      </span>
    </div>
    <div className="flex-1 min-w-0 max-w-[170px]">
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
      <FiX className="w-3.5 h-3.5" />
    </button>
  </div>
);

// Cute Butterfly Component with Nudge Animation
const CuteButterfly = ({ isDragging }: { isDragging: boolean }) => (
  <div className={`relative w-12 h-12 sm:w-14 sm:h-14 ${isDragging ? '' : 'animate-nudge'}`}>
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

const EDGE_PAD = 12;

interface DockPoint {
  left: number;
  top: number;
}

const DEFAULT_DOCK: DockPoint = { left: EDGE_PAD, top: 80 };

function clampDockDuringDrag(
  left: number,
  top: number,
  w: number,
  h: number
): DockPoint {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  return {
    left: Math.max(0, Math.min(vw - w, left)),
    top: Math.max(0, Math.min(vh - h, top)),
  };
}

function snapDockToNearestEdge(left: number, top: number, w: number, h: number): DockPoint {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const cx = left + w / 2;
  const cy = top + h / 2;
  const dLeft = cx;
  const dRight = vw - cx;
  const dTop = cy;
  const dBottom = vh - cy;
  const m = Math.min(dLeft, dRight, dTop, dBottom);
  if (m === dLeft) {
    return {
      left: EDGE_PAD,
      top: Math.max(EDGE_PAD, Math.min(vh - h - EDGE_PAD, top)),
    };
  }
  if (m === dRight) {
    return {
      left: Math.max(EDGE_PAD, vw - w - EDGE_PAD),
      top: Math.max(EDGE_PAD, Math.min(vh - h - EDGE_PAD, top)),
    };
  }
  if (m === dTop) {
    return {
      left: Math.max(EDGE_PAD, Math.min(vw - w - EDGE_PAD, left)),
      top: EDGE_PAD,
    };
  }
  return {
    left: Math.max(EDGE_PAD, Math.min(vw - w - EDGE_PAD, left)),
    top: Math.max(EDGE_PAD, vh - h - EDGE_PAD),
  };
}

function loadDockFromStorage(): DockPoint {
  if (typeof window === 'undefined') return { ...DEFAULT_DOCK };
  const raw = localStorage.getItem('sherrii-icon-position');
  if (!raw) return { ...DEFAULT_DOCK };
  try {
    const parsed = JSON.parse(raw) as { left?: number; top?: number };
    if (typeof parsed.left === 'number' && typeof parsed.top === 'number') {
      return { left: parsed.left, top: parsed.top };
    }
  } catch {
    const legacy = parseInt(raw, 10);
    if (!Number.isNaN(legacy)) {
      return { left: EDGE_PAD, top: legacy };
    }
  }
  return { ...DEFAULT_DOCK };
}

export const Sherrii = () => {
  const [showAnnoyingToast, setShowAnnoyingToast] = useState(false);
  const {
    isOpen: isAnnoyingOpen,
    currentMessage,
    currentAvatar,
    isTyping,
    currentCorner,
    isDismissed,
    setIsOpen: setAnnoyingOpen,
    setIsDismissed,
    restartMessages,
  } = useAnnoyingMessages();
  const [dockPosition, setDockPosition] = useState<DockPoint>(() => loadDockFromStorage());
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, left: 0, top: 0 });
  const livePosRef = useRef<DockPoint>({ ...DEFAULT_DOCK });
  const activePointerIdRef = useRef<number | null>(null);
  const dockButtonRef = useRef<HTMLButtonElement>(null);
  const pendingDragRafRef = useRef(0);

  useEffect(() => {
    if (isDragging) return;
    try {
      localStorage.setItem('sherrii-icon-position', JSON.stringify(dockPosition));
    } catch {
      /* ignore quota */
    }
  }, [dockPosition, isDragging]);

  useEffect(() => {
    const onResize = () => {
      const el = dockButtonRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setDockPosition((p) => snapDockToNearestEdge(p.left, p.top, r.width, r.height));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleCloseAnnoying = () => {
    setAnnoyingOpen(false);
    setIsDismissed();
    setShowAnnoyingToast(true);
  };

  const dragListenersRef = useRef<{
    move: (ev: PointerEvent) => void;
    up: (ev: PointerEvent) => void;
  } | null>(null);

  useEffect(() => {
    return () => {
      if (pendingDragRafRef.current) {
        cancelAnimationFrame(pendingDragRafRef.current);
        pendingDragRafRef.current = 0;
      }
      const bundle = dragListenersRef.current;
      if (bundle) {
        window.removeEventListener('pointermove', bundle.move);
        window.removeEventListener('pointerup', bundle.up);
        window.removeEventListener('pointercancel', bundle.up);
        dragListenersRef.current = null;
      }
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (dragListenersRef.current) return;
    e.stopPropagation();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    const pointerId = e.pointerId;
    activePointerIdRef.current = pointerId;
    setIsDragging(true);
    setHasDragged(false);
    const el = dockButtonRef.current;
    const r = el?.getBoundingClientRect();
    livePosRef.current = { ...dockPosition };
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      left: r?.left ?? dockPosition.left,
      top: r?.top ?? dockPosition.top,
    };

    const teardown = () => {
      if (pendingDragRafRef.current) {
        cancelAnimationFrame(pendingDragRafRef.current);
        pendingDragRafRef.current = 0;
      }
      const bundle = dragListenersRef.current;
      dragListenersRef.current = null;
      if (bundle) {
        window.removeEventListener('pointermove', bundle.move);
        window.removeEventListener('pointerup', bundle.up);
        window.removeEventListener('pointercancel', bundle.up);
      }
      const btn = dockButtonRef.current;
      if (btn) {
        try {
          if (btn.hasPointerCapture(pointerId)) btn.releasePointerCapture(pointerId);
        } catch {
          /* ignore */
        }
      }
      activePointerIdRef.current = null;
    };

    const applyMove = (clientX: number, clientY: number) => {
      const dx = clientX - dragStartRef.current.x;
      const dy = clientY - dragStartRef.current.y;
      if (Math.hypot(dx, dy) > 5) {
        setHasDragged(true);
      }
      if (pendingDragRafRef.current) cancelAnimationFrame(pendingDragRafRef.current);
      pendingDragRafRef.current = requestAnimationFrame(() => {
        pendingDragRafRef.current = 0;
        const btnEl = dockButtonRef.current;
        const w = btnEl?.offsetWidth ?? 64;
        const h = btnEl?.offsetHeight ?? 64;
        const next = clampDockDuringDrag(
          dragStartRef.current.left + dx,
          dragStartRef.current.top + dy,
          w,
          h
        );
        livePosRef.current = next;
        setDockPosition(next);
      });
    };

    const handlePointerMove = (ev: PointerEvent) => {
      if (ev.pointerId !== pointerId) return;
      if (ev.cancelable) ev.preventDefault();
      applyMove(ev.clientX, ev.clientY);
    };

    const handlePointerUp = (ev: PointerEvent) => {
      if (ev.pointerId !== pointerId) return;
      teardown();
      const btnEl = dockButtonRef.current;
      const w = btnEl?.offsetWidth ?? 64;
      const h = btnEl?.offsetHeight ?? 64;
      const p = livePosRef.current;
      setDockPosition(snapDockToNearestEdge(p.left, p.top, w, h));
      setIsDragging(false);
      setTimeout(() => setHasDragged(false), 100);
    };

    dragListenersRef.current = { move: handlePointerMove, up: handlePointerUp };
    window.addEventListener('pointermove', handlePointerMove, { passive: false });
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
  };

  const openFromDock = () => {
    const el = dockButtonRef.current;
    const w = el?.offsetWidth ?? 64;
    const h = el?.offsetHeight ?? 64;
    const corner = getBubbleCornerFromDock(dockPosition.left, dockPosition.top, w, h);
    restartMessages(corner);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (hasDragged) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    openFromDock();
  };

  const positionTransition = 'left 0.38s cubic-bezier(0.22, 1, 0.36, 1), top 0.38s cubic-bezier(0.22, 1, 0.36, 1)';

  return (
    <>
      {isDismissed && !isAnnoyingOpen && (
        <button
          ref={dockButtonRef}
          type="button"
          onClick={handleClick}
          onPointerDown={handlePointerDown}
          className={`fixed z-50 touch-none ${
            isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
          }`}
          style={{
            left: dockPosition.left,
            top: dockPosition.top,
            transform: 'translateZ(0)',
            transition: isDragging ? 'none' : positionTransition,
            userSelect: 'none',
            WebkitUserSelect: 'none',
            WebkitTouchCallout: 'none',
            touchAction: 'none',
            pointerEvents: 'auto',
            willChange: isDragging ? 'left, top' : 'auto',
            padding: '6px',
            background: 'transparent',
            border: 'none',
            outline: 'none',
          }}
          aria-label="Restart annoying messages"
          title="Drag to any edge. Click to restart messages."
        >
          <div className={`relative ${isDragging ? 'scale-105' : 'hover:scale-110'} transition-transform duration-200`}>
            <CuteButterfly isDragging={isDragging} />
          </div>
        </button>
      )}
      {showAnnoyingToast && <Toast message="fine! I won't annoy!" duration={2000} onClose={() => setShowAnnoyingToast(false)} />}
      {isAnnoyingOpen && !isDismissed && (
        <div
          className={`fixed ${getCornerClasses(currentCorner)} z-50 animate-in slide-in-from-bottom-4 fade-in duration-500 transition-[top,left,right,bottom] duration-500 ease-out`}
        >
          <SherriiBubble message={currentMessage} isTyping={isTyping} avatar={currentAvatar} onClose={handleCloseAnnoying} />
        </div>
      )}
    </>
  );
};