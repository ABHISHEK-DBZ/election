'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { GlossaryItem } from '@/data/electionData';

interface GlossaryProps {
  items: GlossaryItem[];
}

const Glossary: React.FC<GlossaryProps> = ({ items }) => {
  const [search, setSearch] = useState('');

  const filteredItems = items.filter(item =>
    item.term.toLowerCase().includes(search.toLowerCase()) ||
    item.def.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section aria-label="Election Glossary">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
        Essential election vocabulary
      </p>

      {/* Search bar */}
      <div className="relative mb-5">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search terms…"
          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
          aria-label="Search glossary terms"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.term}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.02 }}
            className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-3.5 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors"
          >
            <h4 className="text-[13px] font-semibold text-slate-800 dark:text-slate-100 mb-1">
              {item.term}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {item.def}
            </p>
          </motion.div>
        ))}
        {filteredItems.length === 0 && (
          <p className="col-span-2 text-center text-sm text-slate-400 dark:text-slate-500 py-8">
            No terms match your search.
          </p>
        )}
      </div>
    </section>
  );
};

export default Glossary;
