'use client';

import React, { useState, useCallback } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { Send, Bot, User, Loader2, Info } from 'lucide-react';
import { sanitizeHTML } from '@/utils/sanitize';
import { ChatMessage, Variants } from '@/types';
import { useGeminiChat } from '@/hooks/useGeminiChat';

/**
 * Educational AI assistant interface — "Ballot Buddy".
 * Refactored to use useGeminiChat hook and LazyMotion for efficiency.
 * Accessibility: Respects user preference for reduced motion.
 * 
 * @component
 * @returns {JSX.Element} The rendered in-page AI assistant hub.
 */
const AskAnything: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const shouldReduceMotion = useReducedMotion();

  const { messages, isLoading, sendMessage } = useGeminiChat([
    { text: "Ask me any election-related question and I'll neutrally explain it for you.", sender: 'bot' }
  ]);

  /**
   * Animation variants.
   */
  const messageVariants: Variants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -20 },
    visible: { opacity: 1, x: 0 }
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
    <div className="space-y-8">
      {/* Informational Header */}
      <div className="p-6 bg-amber-50/50 dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-800/30 rounded-3xl flex gap-4">
        <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-amber-600 flex-shrink-0">
          <Info size={20} />
        </div>
        <div>
          <h4 className="font-black text-sm uppercase tracking-widest text-amber-800 dark:text-amber-300 mb-1">Neutrality Guarantee</h4>
          <p className="text-sm font-medium text-amber-700/80 dark:text-amber-400/70 leading-relaxed italic">
            &quot;I am programmed to be non-partisan. I provide factual, non-biased information to help you form your own conclusions.&quot;
          </p>
        </div>
      </div>

      {/* Chat Display Area */}
      <div className="space-y-6 min-h-[300px]">
        {messages.map((msg: ChatMessage, idx: number) => (
          <m.div 
            key={idx}
            variants={messageVariants}
            initial="hidden"
            animate="visible"
            className={`flex items-start gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              msg.sender === 'bot' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700'
            }`}>
              {msg.sender === 'bot' ? <Bot size={20} /> : <User size={20} />}
            </div>
            <div className={`max-w-[80%] p-6 rounded-3xl shadow-xl ${
              msg.sender === 'bot' 
                ? 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800' 
                : 'bg-blue-600 text-white'
            }`}>
              {msg.sender === 'bot' ? (
                <div 
                  className="prose prose-sm dark:prose-invert max-w-none leading-relaxed font-medium"
                  dangerouslySetInnerHTML={{ __html: sanitizeHTML(msg.text) }} 
                />
              ) : (
                <p className="font-semibold leading-relaxed">{msg.text}</p>
              )}
            </div>
          </m.div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-4 text-blue-600">
            <Loader2 className="animate-spin" size={24} />
            <span className="font-black uppercase tracking-widest text-[10px]">Ballot Buddy is thinking...</span>
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="relative group">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question (e.g., What is a caucus?)..."
          className="w-full pl-6 pr-20 py-6 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl focus:ring-4 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all font-medium text-lg"
          aria-label="Ask a question"
          disabled={isLoading}
        />
        <button 
          type="submit"
          disabled={!input.trim() || isLoading}
          className="absolute right-3 top-3 bottom-3 w-14 bg-blue-600 text-white rounded-3xl flex items-center justify-center hover:bg-blue-700 transition-all disabled:bg-slate-400 shadow-xl active:scale-95"
          aria-label="Send"
        >
          <Send size={24} />
        </button>
      </form>
    </div>
  );
};

export default AskAnything;
