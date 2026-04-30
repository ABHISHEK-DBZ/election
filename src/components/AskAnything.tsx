'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, Bot, Sparkles } from 'lucide-react';
import { sanitizeHTML } from '@/utils/sanitize';

/**
 * Predefined quick questions for the AI assistant to guide users.
 */
const QUICK_QUESTIONS: string[] = [
  'How does the Electoral College work?',
  'What is voter suppression?',
  'How are results certified?',
  'What is ranked choice voting?',
  'How do I register to vote in India?',
  'What if there is a tie?',
];

/**
 * Interface for AI Chat responses.
 * 
 * @interface ChatResponse
 */
interface ChatResponse {
  /** The natural language response from the AI. */
  response: string;
  /** Error message if the request failed. */
  error?: string;
}

/**
 * AI-powered "Ballot Buddy" component.
 * Allows users to ask natural language questions about the election process.
 * Optimized with useCallback for efficient event handling and strict TypeScript typing.
 * 
 * @component
 * @returns {JSX.Element} The rendered AskAnything UI.
 */
const AskAnything: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Sends a question to the AI backend and processes the response.
   * 
   * @param {string} question - The user's question.
   */
  const handleAsk = useCallback(async (question: string): Promise<void> => {
    if (!question.trim() || isLoading) return;
    
    setIsLoading(true);
    setAnswer(null);
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question }),
      });
      
      const data: ChatResponse = await response.json();
      setAnswer(data.response || 'No response received.');
    } catch (error) {
      console.error('Chat Error:', error);
      setAnswer('Unable to connect to Ballot Buddy. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <section aria-label="Ask any question about elections">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
        Ask any question about elections
      </p>

      {/* --- Input Interface --- */}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleAsk(input)}
          placeholder="e.g. What is gerrymandering?"
          className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm"
          aria-label="Type your election question"
          disabled={isLoading}
        />
        <button
          onClick={() => handleAsk(input)}
          disabled={!input.trim() || isLoading}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 dark:disabled:bg-slate-700 text-white font-bold rounded-xl transition-all text-sm flex items-center gap-1.5 shadow-lg shadow-blue-500/20 active:scale-95"
        >
          {isLoading ? <Loader2 size={16} className="animate-spin" /> : <><Send size={14} /> Ask</>}
        </button>
      </div>

      {/* --- Quick Question Suggester --- */}
      <div className="flex flex-wrap gap-2 mb-5">
        {QUICK_QUESTIONS.map((q: string, i: number) => (
          <button
            key={i}
            onClick={() => { setInput(q); handleAsk(q); }}
            disabled={isLoading}
            className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-full text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 transition-all disabled:opacity-50"
          >
            {q} ↗
          </button>
        ))}
      </div>

      {/* --- Response Display --- */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm"
          >
            <Loader2 size={20} className="animate-spin text-blue-500" />
            <span className="text-sm text-slate-500 dark:text-slate-400">Thinking…</span>
          </motion.div>
        )}

        {!isLoading && answer && (
          <motion.div
            key="answer"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 bg-white dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-3 text-[11px] uppercase font-bold text-blue-500 tracking-widest">
              <Bot size={14} /> Ballot Buddy
            </div>
            <div
              className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed prose prose-sm dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: sanitizeHTML(answer) }}
            />
          </motion.div>
        )}

        {!isLoading && !answer && (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-white dark:bg-slate-800/40 rounded-xl text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed flex items-start gap-2 border border-dashed border-slate-200 dark:border-slate-700"
          >
            <Sparkles size={16} className="flex-shrink-0 mt-0.5 text-amber-500" />
            This assistant can help explain any part of the election process — from voter registration deadlines to how votes are counted and certified. Click a question above or type your own.
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AskAnything;
