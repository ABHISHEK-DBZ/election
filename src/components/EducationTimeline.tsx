'use client';

import React, { useState } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown, Info, Calendar, Sparkles } from 'lucide-react';
import { EducationTimelineProps, TimelineStage, Variants } from '@/types';
import { logTimelineEvent } from '@/lib/firebase';

/**
 * Country-specific detailed election timeline.
 * Refactored to use LazyMotion (m) and respect user reduced motion preferences.
 * Includes Firebase telemetry for interaction tracking.
 * 
 * @component
 * @param {EducationTimelineProps} props - Component properties.
 * @returns {JSX.Element} The rendered detailed timeline.
 */
const EducationTimeline: React.FC<EducationTimelineProps> = ({ stages, label }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  /**
   * Handles expansion and logs telemetry to Firebase.
   */
  const handleToggle = (idx: number, title: string) => {
    const isExpanding = expandedIndex !== idx;
    setExpandedIndex(isExpanding ? idx : null);
    
    if (isExpanding) {
      logTimelineEvent({
        country: label,
        stepTitle: title,
        timestamp: Date.now(),
        action: 'expand'
      });
    }
  };

  /**
   * Animation variants for the container.
   */
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  /**
   * Animation variants for stage cards.
   */
  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 20 
    },
    show: { 
      opacity: 1, 
      y: 0 
    },
  };

  return (
    <m.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="show" 
      className="space-y-4"
    >
      <div className="flex items-center gap-2 mb-8 text-blue-600">
        <Sparkles size={20} />
        <h2 className="text-xl font-black uppercase tracking-widest">{label} Timeline</h2>
      </div>

      {stages.map((stage: TimelineStage, idx: number) => {
        const isExpanded = expandedIndex === idx;
        
        return (
          <m.div 
            key={idx} 
            variants={itemVariants}
            className={`glass-panel overflow-hidden transition-all duration-500 border border-white/20 dark:border-slate-800/50 ${
              isExpanded 
                ? 'bg-white dark:bg-slate-800/90 shadow-2xl scale-[1.02]' 
                : 'bg-white/40 dark:bg-slate-900/40 hover:bg-white/60 dark:hover:bg-slate-900/60'
            }`}
          >
            <button 
              onClick={() => handleToggle(idx, stage.title)}
              className="w-full text-left p-6 flex items-center justify-between group focus:outline-none"
              aria-expanded={isExpanded}
            >
              <div className="flex items-center gap-6">
                <span className="text-3xl font-black text-blue-600/20 group-hover:text-blue-600 transition-colors">0{idx + 1}</span>
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{stage.title}</h3>
                  <p className="text-sm font-bold text-blue-600/60 uppercase tracking-widest mt-0.5">{stage.period}</p>
                </div>
              </div>
              <ChevronDown 
                className={`transition-transform duration-500 ${isExpanded ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} 
                size={24} 
              />
            </button>

            <AnimatePresence>
              {isExpanded && (
                <m.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  <div className="px-6 pb-8 border-t border-slate-100 dark:border-slate-700/50 pt-6">
                    <div className="grid md:grid-cols-1 gap-6">
                      <div className="bg-blue-50/50 dark:bg-blue-900/10 p-6 rounded-3xl border border-blue-100/50 dark:border-blue-800/30">
                        <div className="flex items-center gap-2 mb-4 text-blue-600">
                          <Info size={18} />
                          <h4 className="font-black uppercase tracking-tighter text-sm">Deep Dive</h4>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                          {stage.description}
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        {stage.tips.map((tip, tIdx) => (
                          <div key={tIdx} className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                            <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-blue-600 flex-shrink-0">
                              <Calendar size={16} />
                            </div>
                            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </m.div>
        );
      })}
    </m.div>
  );
};

export default EducationTimeline;
