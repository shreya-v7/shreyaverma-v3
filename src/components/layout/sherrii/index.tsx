import React, { useState, useEffect, useRef } from 'react';
import { FiX, FiChevronDown, FiSend, FiMessageCircle, FiZap } from 'react-icons/fi';
import { Corner, ChatMessage } from '../../../types';
import { sherriiMessages } from '../../../data/sherrii-messages';
import { Toast } from '../../ui/Toast';

// Position utilities
const corners: Corner[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
const getCornerClasses = (corner: Corner): string => {
  switch (corner) {
    case 'top-left': return 'top-6 left-6';
    case 'top-right': return 'top-6 right-6';
    case 'bottom-left': return 'bottom-6 left-6';
    case 'bottom-right': return 'bottom-6 right-6';
    default: return 'bottom-6 right-6';
  }
};
const getRandomCorner = (): Corner => corners[Math.floor(Math.random() * corners.length)];

// Response generator
const getSherriiResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('hire') || lowerMessage.includes('recruiter') || lowerMessage.includes('recruiting') || lowerMessage.includes('position') || lowerMessage.includes('role') || lowerMessage.includes('opportunity')) {
    const recruiterResponses = [
      "omg yes! my code is single and ready to mingle 😏 check out my exp section!",
      "ur giving 'perfect match' energy! my stack = main character vibes 💅",
      "i'm available and my commits are clean! want to see my projects? 🔥",
      "my portfolio is giving 'hire me' and i'm here for it! let's talk ✨",
      "i code in my sleep and debug in my dreams, interested? 😎",
      "my skills = 'perfect fit' energy, no cap! check out my exp 💪",
      "hey bestie, my code is so clean it's giving ocd satisfaction, want to see?",
      "i debug like solving mysteries and code like writing poetry, hire me?",
      "my stack is giving 'i know what i'm doing' vibes, let's connect!",
      "looking for someone who codes w passion? that's literally me 🔥",
    ];
    return recruiterResponses[Math.floor(Math.random() * recruiterResponses.length)];
  }
  
  if (lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.includes('hello')) {
    return "hey bestie! wyd? 👋";
  }
  if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
    return "my projects? they're giving main character energy fr 🔥 check them out!";
  }
  if (lowerMessage.includes('experience') || lowerMessage.includes('job') || lowerMessage.includes('work')) {
    return "my exp is giving 'i know what i'm doing' vibes 💪 go check it out!";
  }
  if (lowerMessage.includes('skill') || lowerMessage.includes('tech') || lowerMessage.includes('code')) {
    return "my stack = big brain energy 🧠 no cap!";
  }
  if (lowerMessage.includes('available') || lowerMessage.includes('interested') || lowerMessage.includes('open')) {
    return "i'm available and my code is giving 'ready to commit' energy 😏 let's talk!";
  }
  if (lowerMessage.includes('resume') || lowerMessage.includes('cv') || lowerMessage.includes('linkedin')) {
    return "my exp section = main character energy! check it out and let's connect 💅";
  }
  if (lowerMessage.includes('cool') || lowerMessage.includes('nice') || lowerMessage.includes('awesome') || lowerMessage.includes('amazing')) {
    return "aww thanks bestie! ur so sweet 💅";
  }
  if (lowerMessage.includes('site') || lowerMessage.includes('website') || lowerMessage.includes('portfolio')) {
    return "this portfolio? it's giving immaculate vibes ✨ i'm obsessed!";
  }
  
  const randomResponses = [
    "periodt! 💅", "no cap, that's valid", "ur so real for that", "fr fr, i see u",
    "that's giving main character energy", "not me agreeing w u rn", "ur literally so right",
    "that's so valid bestie", "i'm here for it", "ur doing the most and i'm here for it",
    "that's giving ✨", "period!", "ur so real", "fr, no cap", "that's actually so true", "ur giving facts",
  ];
  return randomResponses[Math.floor(Math.random() * randomResponses.length)];
};

// Annoying messages appearance hook
const useAnnoyingMessages = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(sherriiMessages[0]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentCorner, setCurrentCorner] = useState<Corner>('bottom-right');
  const [isDismissed, setIsDismissed] = useState(false);
  const [isManuallyTriggered, setIsManuallyTriggered] = useState(false);

  // Auto-appearance logic - ONLY runs when NOT dismissed AND manually triggered
  useEffect(() => {
    // If dismissed, stop all automatic behavior
    if (isDismissed) {
      setIsOpen(false);
      return;
    }

    // Only auto-show if manually triggered (quirky button was clicked)
    if (!isManuallyTriggered) {
      return;
    }

    const showSherrii = () => {
      if (!isOpen && !isDismissed && isManuallyTriggered) {
        setCurrentCorner(getRandomCorner());
        setCurrentMessage(sherriiMessages[Math.floor(Math.random() * sherriiMessages.length)]);
        setIsOpen(true);
      }
    };

    const initialDelay = Math.random() * 5000 + 3000;
    const initialTimer = setTimeout(showSherrii, initialDelay);

    const interval = setInterval(() => {
      if (!isOpen && !isDismissed && isManuallyTriggered) {
        const randomDelay = Math.random() * 60000 + 30000;
        setTimeout(showSherrii, randomDelay);
      }
    }, 10000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isOpen, isDismissed, isManuallyTriggered]);

  // Message update interval - ONLY when open and not dismissed
  useEffect(() => {
    if (!isOpen || isDismissed || !isManuallyTriggered) return;

    const interval = setInterval(() => {
      if (isDismissed || !isManuallyTriggered) {
        clearInterval(interval);
        return;
      }
      
      setIsTyping(true);
      setTimeout(() => {
        if (isDismissed || !isManuallyTriggered) return;
        setCurrentMessage(sherriiMessages[Math.floor(Math.random() * sherriiMessages.length)]);
        setIsTyping(false);
        if (Math.random() < 0.3) {
          setCurrentCorner(getRandomCorner());
        }
      }, 500);
    }, 7000);

    return () => clearInterval(interval);
  }, [isOpen, isDismissed, isManuallyTriggered]);

  const triggerManually = () => {
    setIsManuallyTriggered(true);
    setCurrentCorner(getRandomCorner());
    setCurrentMessage(sherriiMessages[Math.floor(Math.random() * sherriiMessages.length)]);
    setIsOpen(true);
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsManuallyTriggered(false);
    setIsOpen(false);
  };

  const resetDismissal = () => {
    setIsDismissed(false);
    setIsManuallyTriggered(false);
  };

  return { 
    isOpen, 
    currentMessage, 
    isTyping, 
    currentCorner, 
    isDismissed, 
    setIsOpen, 
    setIsDismissed: handleDismiss, 
    setCurrentCorner,
    triggerManually,
    resetDismissal
  };
};

// Chat hook logic
const useSherriiChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const initializeChat = () => {
    if (messages.length === 0) {
      setMessages([{ id: 1, text: "hey bestie! wyd? 👋", isUser: false }]);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = { id: Date.now(), text: inputValue, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    const messageToRespondTo = inputValue;
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response: ChatMessage = { id: Date.now() + 1, text: getSherriiResponse(messageToRespondTo), isUser: false };
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 500);
  };

  return { messages, inputValue, isTyping, setInputValue, handleSendMessage, initializeChat };
};

// Bubble Component
const SherriiBubble: React.FC<{
  message: string;
  isTyping: boolean;
  onClose: () => void;
}> = ({ message, isTyping, onClose }) => (
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

// Chat Component
const SherriiChat: React.FC<{
  messages: ChatMessage[];
  isTyping: boolean;
  inputValue: string;
  onInputChange: (value: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  onClose: () => void;
  onHide: () => void;
}> = ({ messages, isTyping, inputValue, onInputChange, onSendMessage, onClose, onHide }) => {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-2xl w-72 h-80 flex flex-col overflow-hidden max-w-[calc(100vw-3rem)]">
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <span className="text-sm">👩</span>
          </div>
          <div>
            <h3 className="text-white font-semibold text-xs">sherrii</h3>
            <p className="text-white/80 text-[10px]">ur page assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={onHide} className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/20 rounded-full duration-300" aria-label="Hide" title="Hide chat">
            <FiChevronDown className="w-3 h-3" />
          </button>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors p-1 hover:rotate-90 duration-300" aria-label="Close" title="Close assistant">
            <FiX className="w-3 h-3" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2.5 space-y-2">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-lg px-2 py-1.5 break-words ${
              msg.isUser ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100'
            }`}>
              <p className="text-xs leading-relaxed whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-neutral-100 dark:bg-neutral-700 rounded-lg px-2 py-1.5">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={onSendMessage} className="p-2 border-t border-neutral-200 dark:border-neutral-700">
        <div className="flex gap-1.5">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-2 py-1.5 text-xs bg-neutral-100 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-neutral-900 dark:text-neutral-100"
          />
          <button type="submit" className="px-3 py-1.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-colors">
            <FiSend className="w-3 h-3" />
          </button>
        </div>
      </form>
    </div>
  );
};

// Main Component
export const Sherrii: React.FC = () => {
  // Annoying messages state
  const [showAnnoyingToast, setShowAnnoyingToast] = useState(false);
  const [showRestartMessage, setShowRestartMessage] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const { isOpen: isAnnoyingOpen, currentMessage, isTyping, currentCorner, isDismissed, setIsOpen: setAnnoyingOpen, setIsDismissed, triggerManually, resetDismissal } = useAnnoyingMessages();

  // Chat state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { messages, inputValue, isTyping: isChatTyping, setInputValue, handleSendMessage, initializeChat } = useSherriiChat();

  // Restart button animation
  useEffect(() => {
    if (isDismissed && !isAnnoyingOpen) {
      setIsJumping(true);
      setShowRestartMessage(false);
      
      let jumpCount = 0;
      const maxJumps = 4;
      
      const jumpInterval = setInterval(() => {
        jumpCount++;
        if (jumpCount >= maxJumps) {
          clearInterval(jumpInterval);
          setIsJumping(false);
          setShowRestartMessage(true);
          
          setTimeout(() => {
            setShowRestartMessage(false);
          }, 5000);
        } else {
          setIsJumping(prev => !prev);
        }
      }, 300);
      
      return () => clearInterval(jumpInterval);
    }
  }, [isDismissed, isAnnoyingOpen]);

  // Handlers
  const handleCloseAnnoying = () => {
    setAnnoyingOpen(false);
    setIsDismissed(); // This now calls handleDismiss which sets isDismissed to true
    setShowAnnoyingToast(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  const handleHideChat = () => {
    setIsChatOpen(false);
  };

  const handleOpenChat = () => {
    setIsChatOpen(true);
    initializeChat();
  };

  const handleRestartAnnoying = () => {
    resetDismissal();
    triggerManually();
  };

  return (
    <>
      {/* Top Left: Quirky button to trigger annoying messages */}
      {isDismissed && !isAnnoyingOpen && (
        <div className="fixed top-6 left-6 z-50 flex items-center gap-2">
          {showRestartMessage && (
            <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-2 shadow-lg text-xs text-neutral-900 dark:text-neutral-100 whitespace-nowrap animate-in slide-in-from-left-4 fade-in">
              wanna yap again, click me!
            </div>
          )}
          <button
            onClick={handleRestartAnnoying}
            className="bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 text-white rounded-full p-3 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 hover:rotate-12 animate-in slide-in-from-left-4 fade-in"
            aria-label="Restart annoying messages"
            title="Bring back annoying messages"
            style={isJumping ? { animation: 'bounce 0.3s' } : {}}
          >
            <FiZap className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Top Left: Button to manually trigger annoying messages */}
      {!isDismissed && !isAnnoyingOpen && (
        <button
          onClick={triggerManually}
          className="fixed top-6 left-6 z-50 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 text-white rounded-full p-3 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 hover:rotate-12 animate-pulse"
          aria-label="Start annoying messages"
          title="Click for annoying messages!"
        >
          <FiZap className="w-5 h-5" />
        </button>
      )}

      {/* Bottom Right: Chat button */}
      <button
        onClick={handleOpenChat}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full p-3 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
        aria-label="Open chat"
        title="Chat with sherrii"
      >
        <FiMessageCircle className="w-5 h-5" />
      </button>

      {/* Toast for annoying messages */}
      {showAnnoyingToast && (
        <Toast
          message="fine! I won't annoy!"
          duration={2000}
          onClose={() => setShowAnnoyingToast(false)}
        />
      )}

      {/* Annoying messages bubble */}
      {isAnnoyingOpen && !isDismissed && (
        <div className={`fixed ${getCornerClasses(currentCorner)} z-50 animate-in slide-in-from-bottom-4 fade-in duration-500`}>
          <SherriiBubble
            message={currentMessage}
            isTyping={isTyping}
            onClose={handleCloseAnnoying}
          />
        </div>
      )}

      {/* Chat window */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 fade-in duration-500">
          <SherriiChat
            messages={messages}
            isTyping={isChatTyping}
            inputValue={inputValue}
            onInputChange={setInputValue}
            onSendMessage={handleSendMessage}
            onClose={handleCloseChat}
            onHide={handleHideChat}
          />
        </div>
      )}
    </>
  );
};
