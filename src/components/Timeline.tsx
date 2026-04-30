'use client';

import React from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';
import { TimelineStepProps } from '@/types';

/**
 * Props for the Timeline component.
 * 
 * @interface TimelineProps
 */
interface TimelineProps {
  /** The sequence of steps to display in the voting journey. */
  steps: TimelineStepProps[];
}

/**
 * Interactive, animated Voting Journey Timeline using Framer Motion.
 * Uses staggered reveals and progress line animations to visualize electoral stages.
 * 
 * @component
 * @param {TimelineProps} props - The component props.
 * @returns {JSX.Element} The rendered animated timeline.
 */
const Timeline: React.FC<TimelineProps> = ({ steps }) => {
  const shouldReduceMotion = useReducedMotion();

  /**
   * Animation variants for the container to stagger child animations.
   */
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  /**
   * Animation variants for individual timeline items.
   */
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] } },
  };

  /**
   * Animation variants for the vertical progress line.
   */
  const lineVariants: Variants = {
    hidden: { height: 0 },
    visible: { height: '100%', transition: { duration: 1.5, ease: [0.42, 0, 0.58, 1] } },
  };

  return (
    <section 
      aria-label="Voting Journey Timeline" 
      className="w-full max-w-2xl mx-auto py-16 px-6"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
        className="relative"
      >
        {/* Background Line */}
        <div className="absolute left-[19px] top-4 bottom-0 w-1 bg-slate-200 dark:bg-slate-800 rounded-full" />
        
        {/* Animated Progress Line */}
        <motion.div 
          variants={lineVariants}
          className="absolute left-[19px] top-4 w-1 bg-blue-600 rounded-full origin-top"
          aria-hidden="true"
        />

        <div className="space-y-16">
          {steps.map((step, index) => (
            <motion.article 
              key={index} 
              variants={itemVariants}
              className="relative pl-14"
              aria-current={step.current ? 'step' : undefined}
            >
              <div 
                className={`absolute left-0 top-1 p-1 rounded-full bg-white dark:bg-slate-900 border-2 z-10 transition-colors duration-300 ${
                  step.completed ? 'border-green-600 text-green-600' : 
                  step.current ? 'border-blue-600 text-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'border-slate-300 text-slate-300 dark:border-slate-700 dark:text-slate-700'
                }`}
              >
                {step.completed ? (
                  <CheckCircle2 size={28} aria-hidden="true" className="bg-white dark:bg-slate-900 rounded-full" />
                ) : (
                  <Circle size={28} aria-hidden="true" className="bg-white dark:bg-slate-900 rounded-full" />
                )}
              </div>
              <div className="flex flex-col glass-panel p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h3 
                  className={`text-2xl font-bold mb-2 tracking-tight ${
                    step.current ? 'text-blue-700 dark:text-blue-400' : 'text-slate-800 dark:text-slate-100'
                  }`}
                >
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                  {step.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Timeline;
