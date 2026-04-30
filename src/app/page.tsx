'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Timeline from '@/components/Timeline';
import CivicLookup from '@/components/CivicLookup';
import { TimelineStepProps } from '@/types';

const Chat = dynamic(() => import('@/components/Chat'), { ssr: false });

export default function Home() {
  const steps: TimelineStepProps[] = useMemo(() => [
    { title: "Voter Registration", description: "Ensure your voice is heard by registering to vote before the deadline in your state.", completed: true, current: false },
    { title: "Research & Preparation", description: "Understand the propositions and candidate platforms. Use Ballot Buddy if you need help!", completed: false, current: true },
    { title: "Cast Your Ballot", description: "Vote early, by mail, or on Election Day. Make a plan and stick to it.", completed: false, current: false },
    { title: "Certification", description: "Votes are counted and results are officially certified.", completed: false, current: false }
  ], []);

  return (
    <div className="flex flex-col gap-0 pb-0">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-[#0A192F] to-[#050B14] text-white">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-tight">The Future is in <br className="hidden md:block"/> Your Hands.</h2>
          <p className="text-xl md:text-2xl text-blue-200/80 mb-10 font-light max-w-2xl mx-auto leading-relaxed">A premium, high-trust guide to understanding your local elections, representatives, and propositions.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/education" className="inline-block px-10 py-5 bg-white text-[#0A192F] font-bold rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-shadow text-lg">🗳️ Election Guide</motion.a>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#reps" className="inline-block px-10 py-5 bg-transparent text-white font-bold rounded-full border-2 border-white/30 hover:border-white/60 transition-all text-lg">Find Your Representatives</motion.a>
          </div>
        </motion.div>
        <motion.div animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
        <motion.div animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity, delay: 1 }} className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      </section>

      {/* Civic Lookup */}
      <div id="reps" className="bg-slate-50 dark:bg-[#0A192F]"><CivicLookup /></div>

      {/* Timeline */}
      <div id="timeline" className="bg-white dark:bg-[#050B14] py-10">
        <div className="text-center mb-4 px-6 pt-10">
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-slate-900 dark:text-white">Your Voting Journey</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Follow the steps to ensure you&apos;re ready for Election Day.</p>
        </div>
        <Timeline steps={steps} />
      </div>

      <Chat />
    </div>
  );
}
