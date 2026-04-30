'use client';

/**
 * @fileoverview Main Landing Page for CivicFlow 2.0.
 * Features a high-impact hero section, dynamic representative lookup, 
 * and an interactive voting journey timeline.
 * Optimized for performance with dynamic imports and memoized data.
 */

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { TimelineStepProps } from '@/types';

// --- Dynamic Imports for Client-Side Performance ---
const Timeline = dynamic(() => import('@/components/Timeline'), {
  loading: () => <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-500" /></div>,
  ssr: false
});

const CivicLookup = dynamic(() => import('@/components/CivicLookup'), {
  loading: () => <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-500" /></div>,
  ssr: false
});

const Chat = dynamic(() => import('@/components/Chat'), { 
  ssr: false 
});

/**
 * The Root Landing Page component.
 * 
 * @component
 * @returns {JSX.Element} The rendered Home page.
 */
export default function Home() {
  /**
   * Memoized voting journey steps to prevent unnecessary re-renders.
   */
  const steps: TimelineStepProps[] = useMemo((): TimelineStepProps[] => [
    { 
      title: "Voter Registration", 
      description: "Ensure your voice is heard by registering to vote before the deadline in your state.", 
      completed: true, 
      current: false 
    },
    { 
      title: "Research & Preparation", 
      description: "Understand the propositions and candidate platforms. Use Ballot Buddy if you need help!", 
      completed: false, 
      current: true 
    },
    { 
      title: "Cast Your Ballot", 
      description: "Vote early, by mail, or on Election Day. Make a plan and stick to it.", 
      completed: false, 
      current: false 
    },
    { 
      title: "Certification", 
      description: "Votes are counted and results are officially certified.", 
      completed: false, 
      current: false 
    }
  ], []);

  return (
    <div className="flex flex-col gap-0 pb-0">
      {/* --- High-Impact Hero Section --- */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-[#0A192F] to-[#050B14] text-white">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }} 
          className="relative z-10 max-w-4xl"
        >
          <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
            The Future is <br className="hidden md:block"/> In Your Hands.
          </h2>
          <p className="text-xl md:text-2xl text-blue-200/80 mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
            A premium, non-partisan guide to understanding your elections, representatives, and the democratic process.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <motion.a 
              whileHover={{ scale: 1.05, y: -2 }} 
              whileTap={{ scale: 0.95 }} 
              href="/education" 
              className="inline-flex items-center px-10 py-5 bg-white text-[#0A192F] font-black rounded-full shadow-[0_20px_50px_rgba(255,255,255,0.2)] hover:shadow-[0_20px_80px_rgba(255,255,255,0.4)] transition-all text-lg"
            >
              🗳️ Education Hub
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05, y: -2 }} 
              whileTap={{ scale: 0.95 }} 
              href="#reps" 
              className="inline-flex items-center px-10 py-5 bg-transparent text-white font-black rounded-full border-2 border-white/30 hover:border-white/60 hover:bg-white/5 transition-all text-lg"
            >
              Find Your Reps
            </motion.a>
          </div>
        </motion.div>

        {/* --- Background Ambient Effects --- */}
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" 
        />
        <motion.div 
          animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.2, 1] }} 
          transition={{ duration: 10, repeat: Infinity, delay: 1, ease: "easeInOut" }} 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" 
        />
      </section>

      {/* --- Representative Lookup Module --- */}
      <div id="reps" className="bg-slate-50 dark:bg-[#0A192F] py-10">
        <CivicLookup />
      </div>

      {/* --- Interactive Voting Journey Timeline --- */}
      <div id="timeline" className="bg-white dark:bg-[#050B14] py-20">
        <div className="text-center mb-12 px-6">
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white tracking-tight">Your Voting Journey</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto font-medium">
            Follow these essential milestones to ensure your vote is counted and your voice is heard.
          </p>
        </div>
        <Timeline steps={steps} />
      </div>

      {/* --- Floating AI Assistant --- */}
      <Chat />
    </div>
  );
}
