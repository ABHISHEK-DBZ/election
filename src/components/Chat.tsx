'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { sanitizeHTML } from '@/utils/sanitize';
import { ChatMessage } from '@/types';

/**
 * Floating glassmorphism Chatbot UI.
 * Integrates with the secure /api/chat route.
 * 
 * @component
 * @returns {JSX.Element} The rendered Chat component.
 */
const Chat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { text: "Hello! I'm Ballot Buddy. I can neutrally explain election propositions or concepts. What's on your mind?", sender: 'bot' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { text: userText, sender: 'user' }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch response');
      }

      setMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: "I'm currently unable to connect. Please try again later.", 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center z-40 transition-transform ${isOpen ? 'hidden' : ''}`}
        aria-label="Open Ballot Buddy Chat"
        aria-expanded={isOpen}
      >
        <MessageCircle size={32} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 w-[90vw] max-w-[400px] h-[600px] max-h-[80vh] z-50 flex flex-col glass-panel rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-slate-700/50"
            role="dialog"
            aria-label="Ballot Buddy Chat Window"
          >
            {/* Header */}
            <div className="bg-blue-600/90 backdrop-blur-md p-4 flex items-center justify-between text-white border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <Bot size={24} />
                </div>
                <div>
                  <h2 className="font-bold text-lg leading-tight">Ballot Buddy</h2>
                  <p className="text-xs text-blue-100/80">AI Election Guide</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close Chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-900/50"
              aria-live="polite"
            >
              {messages.map((msg, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-sm' 
                      : 'glass-panel bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 rounded-tl-sm border border-slate-200/50 dark:border-slate-700/50'
                  }`}>
                    <div className="flex items-center gap-2 mb-1 text-[10px] uppercase font-bold opacity-70 tracking-wider">
                      {msg.sender === 'user' ? <><User size={12} /> You</> : <><Bot size={12} /> Ballot Buddy</>}
                    </div>
                    {msg.sender === 'bot' ? (
                      <div 
                        className="prose prose-sm dark:prose-invert max-w-none leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: sanitizeHTML(msg.text) }} 
                      />
                    ) : (
                      <p className="leading-relaxed">{msg.text}</p>
                    )}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="flex justify-start"
                >
                  <div className="glass-panel bg-white/80 dark:bg-slate-800/80 p-4 rounded-2xl rounded-tl-sm shadow-sm border border-slate-200/50 dark:border-slate-700/50">
                    <Loader2 size={20} className="animate-spin text-blue-600" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <form 
              onSubmit={handleSend}
              className="p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200/50 dark:border-slate-700/50 flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about propositions..."
                className="flex-1 bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-900 dark:text-white transition-all"
                aria-label="Type your message"
                disabled={isLoading}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 dark:disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-full transition-colors flex items-center justify-center"
                aria-label="Send Message"
              >
                <Send size={20} className={input.trim() && !isLoading ? 'ml-1' : ''} />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chat;
