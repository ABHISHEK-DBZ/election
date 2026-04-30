'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Info } from 'lucide-react';
import { ElectionStage } from '@/data/electionData';

interface EducationTimelineProps {
  stages: ElectionStage[];
  label: string;
}

const EducationTimeline: React.FC<EducationTimelineProps> = ({ stages, label }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <section aria-label={label}>
      <p className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
        {label}
      </p>
      <div className="relative pl-8">
        {/* Vertical connector line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-slate-200 dark:bg-slate-700 rounded-full" aria-hidden="true" />

        <div className="space-y-4">
          {stages.map((stage, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="relative">
                {/* Dot */}
                <div
                  className="absolute -left-8 top-[14px] w-[14px] h-[14px] rounded-full border-2 border-white dark:border-slate-900 z-10 transition-transform hover:scale-125"
                  style={{ backgroundColor: stage.color }}
                  aria-hidden="true"
                />

                {/* Card */}
                <button
                  onClick={() => toggle(idx)}
                  className={`w-full text-left bg-white dark:bg-slate-800/60 border rounded-xl px-4 py-3 transition-all hover:border-slate-300 dark:hover:border-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    isOpen ? 'border-slate-300 dark:border-slate-600 shadow-sm' : 'border-slate-200 dark:border-slate-700'
                  }`}
                  aria-expanded={isOpen}
                  aria-controls={`stage-body-${idx}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500 min-w-[24px]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[15px] font-medium text-slate-800 dark:text-slate-100 flex-1">
                      {stage.title}
                    </span>
                    <span
                      className="text-[11px] font-medium px-2 py-[2px] rounded-full"
                      style={{ backgroundColor: stage.badgeBg, color: stage.badgeColor }}
                    >
                      {stage.badge}
                    </span>
                    <ChevronDown
                      size={14}
                      className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 ml-9">
                    {stage.timing}
                  </p>
                </button>

                {/* Expandable body */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`stage-body-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1] } as any}
                      className="overflow-hidden"
                    >
                      <div className="bg-white dark:bg-slate-800/40 border border-t-0 border-slate-200 dark:border-slate-700 rounded-b-xl px-4 pb-4 pt-3 -mt-1">
                        <div className="border-t border-slate-100 dark:border-slate-700 pt-3">
                          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {stage.desc}
                          </p>
                          <div className="mt-3 space-y-2">
                            {stage.tips.map((tip, tipIdx) => (
                              <div key={tipIdx} className="flex items-start gap-2 text-[13px] text-slate-500 dark:text-slate-400">
                                <Info size={14} className="flex-shrink-0 mt-[2px]" style={{ color: stage.color }} />
                                <span>{tip}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EducationTimeline;
