'use client';

import React from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { Search, MapPin, Users, Globe, ExternalLink, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useCivicLookup } from '@/hooks/useCivicLookup';

import { Variants } from '@/types';

/**
 * Premium interface for discovering local, state, and federal representatives.
 * Refactored to use useCivicLookup hook and LazyMotion for efficiency.
 * Accessibility: Respects user preference for reduced motion.
 * 
 * @component
 * @returns {JSX.Element} The rendered Civic Lookup module.
 */
const CivicLookup: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { 
    address, 
    setAddress, 
    isLoading, 
    error, 
    mappedData, 
    performLookup 
  } = useCivicLookup();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performLookup(address);
  };

  /**
   * Animation variants that respect reduced motion preferences.
   */
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="reps" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
        <div className="max-w-2xl">
          <m.div 
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-4 text-blue-600 font-black tracking-widest uppercase text-sm"
          >
            <MapPin size={18} /> Know Your Government
          </m.div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight">
            Find Your <br/> <span className="text-blue-600">Representatives.</span>
          </h2>
        </div>

        <form onSubmit={handleSearch} className="w-full md:w-auto relative flex-1 max-w-md">
          <input 
            type="text" 
            placeholder="Enter your street address..." 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full pl-6 pr-16 py-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl focus:ring-4 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-lg font-medium"
            aria-label="Address for representative lookup"
          />
          <button 
            type="submit"
            disabled={isLoading}
            className="absolute right-2 top-2 bottom-2 w-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:bg-blue-700 transition-colors disabled:bg-slate-400"
            aria-label="Search"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
          </button>
        </form>
      </div>

      {error && (
        <m.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="p-6 rounded-3xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 font-bold text-center mb-10"
        >
          ⚠️ {error}
        </m.div>
      )}

      {mappedData.length > 0 ? (
        <m.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {mappedData.map((item, idx) => (
            <m.div 
              key={`${item.official.name}-${idx}`}
              variants={itemVariants}
              className="group glass-panel bg-white/40 dark:bg-slate-800/40 rounded-[2.5rem] p-8 border border-white/40 dark:border-slate-700/40 hover:bg-white dark:hover:bg-slate-800 transition-all hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)]"
            >
              <div className="flex items-start gap-6">
                <div className="relative w-20 h-20 rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-700">
                  <Image 
                    src={item.official.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.official.name)}&background=2563eb&color=fff`} 
                    alt={item.official.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-blue-600 font-black text-[10px] uppercase tracking-widest mb-1">{item.office.name}</p>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight mb-2">{item.official.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                      item.official.party?.includes('Democrat') ? 'bg-blue-100 text-blue-700' : 
                      item.official.party?.includes('Republican') ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {item.official.party || 'Non-Partisan'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-700/50 grid grid-cols-2 gap-4">
                {item.official.urls && (
                  <a href={item.official.urls[0]} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-50 dark:bg-slate-900 rounded-2xl text-xs font-bold hover:bg-blue-600 hover:text-white transition-all group/link">
                    <Globe size={14} /> Website <ExternalLink size={10} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                  </a>
                )}
                {item.official.channels && (
                  <div className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-50 dark:bg-slate-900 rounded-2xl text-xs font-bold text-slate-400">
                    <Users size={14} /> {item.official.channels.length} Socials
                  </div>
                )}
              </div>
            </m.div>
          ))}
        </m.div>
      ) : !isLoading && !error && (
        <m.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="text-center py-20 bg-slate-50/50 dark:bg-slate-800/20 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-700"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white dark:bg-slate-800 rounded-3xl shadow-xl mb-6 text-slate-300">
            <Search size={32} />
          </div>
          <h3 className="text-2xl font-black text-slate-400 dark:text-slate-600">Enter your address above to see <br/> your local representatives.</h3>
        </m.div>
      )}
    </section>
  );
};

export default CivicLookup;
