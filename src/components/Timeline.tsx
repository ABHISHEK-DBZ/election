'use client';

import React from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { TimelineStepProps, TimelineProps, Variants } from '@/types';

/**
 * Animated voting journey timeline.
 * Refactored to use LazyMotion (m) and respect user reduced motion preferences.
 * 
 * @component
 * @param {TimelineProps} props - Component properties.
 * @returns {JSX.Element} The rendered Timeline.
 */
const Timeline: React.FC<TimelineProps> = ({ steps }) => {
  const shouldReduceMotion = useReducedMotion();

  /**
   * Container variants for staggered reveals.
   */
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  /**
   * Item variants that adapt to reduced motion.
   */
  const item: Variants = {
    hidden: { 
      opacity: 0, 
      x: shouldReduceMotion ? 0 : -30 
    },
    show: { 
      opacity: 1, 
      x: 0,
      transition: { type: 'spring', damping: 20 }
    },
  };

  return (
    <m.div 
      variants={container} 
      initial="hidden" 
      whileInView="show" 
      viewport={{ once: true, margin: "-100px" }}
      className="max-w-4xl mx-auto px-6 py-12"
    >
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-[27px] top-4 bottom-4 w-1 bg-slate-100 dark:bg-slate-800 rounded-full" aria-hidden="true" />
        
        <div className="space-y-12">
          {steps.map((step: TimelineStepProps, idx: number) => (
            <m.div key={idx} variants={item} className="relative flex items-start gap-8 group">
              {/* Icon / Status */}
              <div className={`relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform ${
                step.completed ? 'bg-blue-600 text-white' : 
                step.current ? 'bg-white dark:bg-slate-900 border-2 border-blue-600 text-blue-600' : 
                'bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-300'
              }`}>
                {step.completed ? <CheckCircle2 size={28} /> : <Circle size={28} />}
              </div>

              {/* Content Card */}
              <div className="flex-1 pt-2">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 opacity-60">Phase 0{idx + 1}</span>
                  {step.current && (
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">Current</span>
                  )}
                </div>
                <h3 className={`text-2xl font-black mb-3 tracking-tight ${step.current ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                  {step.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {step.description}
                </p>
                {step.current && (
                  <m.button 
                    whileHover={shouldReduceMotion ? {} : { x: 5 }}
                    className="mt-6 flex items-center gap-2 text-blue-600 font-bold text-sm group"
                  >
                    Get Started <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </m.button>
                )}
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </m.div>
  );
};

export default Timeline;
