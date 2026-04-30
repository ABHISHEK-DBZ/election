'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, Bot, Sparkles } from 'lucide-react';
import { sanitizeHTML } from '@/utils/sanitize';

const QUICK_QUESTIONS = [
  'How does the Electoral College work?',
  'What is voter suppression?',
  'How are results certified?',
  'What is ranked choice voting?',
  'How do I register to vote in India?',
  'What if there is a tie?',
];

const AskAnything: React.FC = () => {
  const [input, setInput] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async (question: string) => {
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
      const data = await response.json();
      setAnswer(data.response || 'No response received.');
    } catch {
      setAnswer('Unable to connect. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section aria-label="Ask any question about elections">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
        Ask any question about elections
      </p>

      {/* Input bar */}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAsk(input)}
          placeholder="e.g. What is gerrymandering?"
          className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
          aria-label="Type your election question"
          disabled={isLoading}
        />
        <button
          onClick={() => handleAsk(input)}
          disabled={!input.trim() || isLoading}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 dark:disabled:bg-slate-700 text-white font-semibold rounded-xl transition-colors text-sm flex items-center gap-1.5"
        >
          {isLoading ? <Loader2 size={16} className="animate-spin" /> : <><Send size={14} /> Ask</>}
        </button>
      </div>

      {/* Quick questions */}
      <div className="flex flex-wrap gap-2 mb-5">
        {QUICK_QUESTIONS.map((q, i) => (
          <button
            key={i}
            onClick={() => { setInput(q); handleAsk(q); }}
            disabled={isLoading}
            className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-full text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 transition-all disabled:opacity-50"
          >
            {q} ↗
          </button>
        ))}
      </div>

      {/* Answer display */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700"
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
            className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center gap-2 mb-2 text-[11px] uppercase font-bold text-blue-500 tracking-wider">
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
            className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed flex items-start gap-2"
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
