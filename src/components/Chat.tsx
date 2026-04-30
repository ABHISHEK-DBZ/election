'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { sanitizeHTML } from '@/utils/sanitize';
import { ChatMessage, Variants } from '@/types';
import { useGeminiChat } from '@/hooks/useGeminiChat';

/**
 * Floating glassmorphism Chatbot UI — "Ballot Buddy".
 * Refactored to use useGeminiChat hook and LazyMotion for efficiency.
 * Accessibility: Respects user preference for reduced motion.
 * 
 * @component
 * @returns {JSX.Element} The rendered global floating Chat assistant.
 */
const Chat: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const shouldReduceMotion = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, isLoading, sendMessage } = useGeminiChat([
    { text: "Hello! I'm Ballot Buddy. I can neutrally explain election propositions or concepts. What's on your mind?", sender: 'bot' }
  ]);

  /**
   * Automatically scrolls the chat window to the latest message.
   */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  /**
   * Animation variants that respect reduced motion preferences.
   */
  const chatWindowVariants: Variants = {
    initial: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 50, 
      scale: shouldReduceMotion ? 1 : 0.9, 
      filter: shouldReduceMotion ? 'none' : 'blur(10px)' 
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      filter: 'none' 
    },
    exit: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 20, 
      scale: shouldReduceMotion ? 1 : 0.9, 
      filter: shouldReduceMotion ? 'none' : 'blur(10px)' 
    }
  };

  const toggleButtonVariants: Variants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 }
  };

  /**
   * Handles form submission.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const text = input.trim();
    setInput('');
    await sendMessage(text);
  };

  return (
    <>
      {/* --- Floating Toggle Button --- */}
      <m.button
        variants={toggleButtonVariants}
        initial="initial"
        animate="animate"
        whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: 5 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.9, rotate: -5 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 bg-blue-600 text-white rounded-full shadow-[0_10px_30px_rgba(37,99,235,0.4)] flex items-center justify-center z-40 transition-transform ${isOpen ? 'hidden' : ''}`}
        aria-label="Open Ballot Buddy Chat"
        aria-expanded={isOpen}
      >
        <MessageCircle size={32} />
      </m.button>

      {/* --- Main Chat Window --- */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            variants={chatWindowVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 w-[90vw] max-w-[420px] h-[650px] max-h-[85vh] z-50 flex flex-col glass-panel rounded-[2rem] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.25)] border border-white/20 dark:border-slate-700/50"
            role="dialog"
            aria-label="Ballot Buddy Chat Window"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 flex items-center justify-between text-white border-b border-white/10 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
                  <Bot size={24} />
                </div>
                <div>
                  <h2 className="font-black text-lg leading-none mb-0.5 tracking-tight">Ballot Buddy</h2>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <p className="text-[10px] uppercase font-black text-blue-100/70 tracking-widest">Live Assistant</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-all active:scale-90"
                aria-label="Close Chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50/30 dark:bg-slate-900/40"
              aria-live="polite"
            >
              {messages.map((msg: ChatMessage, idx: number) => (
                <m.div 
                  key={idx}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl shadow-xl text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-sm' 
                      : 'glass-panel bg-white/95 dark:bg-slate-800/95 text-slate-800 dark:text-slate-100 rounded-tl-sm border border-slate-200/50 dark:border-slate-700/50'
                  }`}>
                    <div className="flex items-center gap-2 mb-2 text-[10px] uppercase font-black opacity-60 tracking-widest">
                      {msg.sender === 'user' ? <><User size={12} /> You</> : <><Bot size={12} /> Ballot Buddy</>}
                    </div>
                    {msg.sender === 'bot' ? (
                      <div 
                        className="prose prose-sm dark:prose-invert max-w-none leading-relaxed font-medium"
                        dangerouslySetInnerHTML={{ __html: sanitizeHTML(msg.text) }} 
                      />
                    ) : (
                      <p className="leading-relaxed font-semibold">{msg.text}</p>
                    )}
                  </div>
                </m.div>
              ))}
              {isLoading && (
                <m.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="flex justify-start"
                >
                  <div className="glass-panel bg-white/80 dark:bg-slate-800/80 px-5 py-4 rounded-2xl rounded-tl-sm shadow-sm border border-slate-200/50 dark:border-slate-700/50">
                    <div className="flex gap-1.5 items-center">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" />
                    </div>
                  </div>
                </m.div>
              )}
            </div>

            {/* Input Area */}
            <form 
              onSubmit={handleSubmit}
              className="p-5 bg-white/90 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-700/50 flex gap-2.5 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]"
            >
              <input
                type="text"
                id="chat-input"
                value={input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                placeholder="Ask about propositions..."
                className="flex-1 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-slate-900 dark:text-white transition-all placeholder:text-slate-400 font-medium"
                aria-label="Type your message"
                disabled={isLoading}
              />
              <m.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.05, rotate: 5 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95, rotate: -5 }}
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-12 h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 dark:disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-2xl transition-all flex items-center justify-center shadow-lg active:scale-95"
                aria-label="Send Message"
              >
                <Send size={20} className={input.trim() && !isLoading ? 'ml-0.5' : ''} />
              </m.button>
            </form>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chat;
