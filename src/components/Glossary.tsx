'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { GlossaryItem } from '@/data/electionData';

/**
 * Props for the Glossary component.
 * 
 * @interface GlossaryProps
 */
interface GlossaryProps {
  /** The list of glossary items to display and filter. */
  items: GlossaryItem[];
}

/**
 * A searchable glossary component for election-related terminology.
 * Optimized with useMemo for efficient filtering of large term lists.
 * 
 * @component
 * @param {GlossaryProps} props - The component props.
 * @returns {JSX.Element} The rendered Glossary UI.
 */
const Glossary: React.FC<GlossaryProps> = ({ items }) => {
  const [search, setSearch] = useState<string>('');

  /**
   * Filtered list of glossary items based on current search input.
   * memoized to prevent re-filtering on unrelated re-renders.
   */
  const filteredItems = useMemo((): GlossaryItem[] => {
    const query = search.toLowerCase();
    return items.filter(item =>
      item.term.toLowerCase().includes(query) ||
      item.def.toLowerCase().includes(query)
    );
  }, [items, search]);

  return (
    <section aria-label="Election Glossary">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
        Essential election vocabulary
      </p>

      {/* --- Search Interface --- */}
      <div className="relative mb-5 group">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
        <input
          type="text"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          placeholder="Search terms…"
          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm"
          aria-label="Search glossary terms"
        />
      </div>

      {/* --- Terms Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredItems.map((item: GlossaryItem, idx: number) => (
          <motion.div
            key={item.term}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.02, ease: "easeOut" }}
            className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-3.5 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-sm transition-all"
          >
            <h4 className="text-[13px] font-bold text-slate-800 dark:text-slate-100 mb-1">
              {item.term}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {item.def}
            </p>
          </motion.div>
        ))}
        {filteredItems.length === 0 && (
          <div className="col-span-2 text-center p-12 bg-white/50 dark:bg-slate-800/20 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
             <p className="text-sm text-slate-400 dark:text-slate-500">
               No terms match your search. Try different keywords.
             </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Glossary;
