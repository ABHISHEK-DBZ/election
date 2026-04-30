'use client';

import React, { useState, useMemo } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Search, Book, Sparkles } from 'lucide-react';
import { GlossaryProps, GlossaryItem, Variants } from '@/types';

/**
 * Searchable glossary of election terms.
 * Refactored to use LazyMotion (m) and respect user reduced motion preferences.
 * Uses useMemo for high-efficiency filtering.
 * 
 * @component
 * @param {GlossaryProps} props - Component properties.
 * @returns {JSX.Element} The rendered Glossary.
 */
const Glossary: React.FC<GlossaryProps> = ({ items }) => {
  const [search, setSearch] = useState<string>('');
  const shouldReduceMotion = useReducedMotion();

  /**
   * Optimized filtering using useMemo.
   */
  const filteredItems = useMemo((): GlossaryItem[] => {
    const query = search.toLowerCase().trim();
    if (!query) return items;
    return items.filter(item => 
      item.term.toLowerCase().includes(query) || 
      item.definition.toLowerCase().includes(query)
    );
  }, [search, items]);

  /**
   * Animation variants for the container.
   */
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  /**
   * Animation variants for glossary cards.
   */
  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: shouldReduceMotion ? 1 : 0.95 
    },
    show: { 
      opacity: 1, 
      scale: 1 
    },
  };

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
          <Search size={20} />
        </div>
        <input 
          type="text" 
          placeholder="Search glossary (e.g., Gerrymandering, Ballot)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-14 pr-6 py-5 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-2xl focus:ring-4 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all font-medium"
          aria-label="Search election terms"
        />
      </div>

      {/* Grid */}
      <m.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="show" 
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => (
            <m.div 
              key={item.term} 
              variants={itemVariants}
              layout={!shouldReduceMotion}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-panel p-6 bg-white dark:bg-slate-900/60 border border-white/20 dark:border-slate-800/50 rounded-3xl hover:border-blue-600/30 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                  <Book size={20} />
                </div>
                <h3 className="font-black text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{item.term}</h3>
              </div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.definition}
              </p>
            </m.div>
          ))}
        </AnimatePresence>
      </m.div>

      {filteredItems.length === 0 && (
        <m.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="text-center py-20 bg-slate-50 dark:bg-slate-900/20 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800"
        >
          <Sparkles className="mx-auto mb-4 text-slate-300" size={48} />
          <h3 className="text-xl font-black text-slate-400">No terms found matching &quot;{search}&quot;</h3>
        </m.div>
      )}
    </div>
  );
};

export default Glossary;
