'use client';

/**
 * @fileoverview Main Education Hub page for CivicFlow 2.0.
 * Integrates interactive timelines, quizzes, glossaries, and AI assistants.
 * Optimized with Suspense, LazyMotion, and custom hooks for peak performance.
 */

import React, { useState, useCallback, Suspense } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Clock, Brain, BookOpen, MessageCircle, Flag, Loader2 } from 'lucide-react';
import { GLOSSARY } from '@/data/electionData';
import { useElectionData } from '@/hooks/useElectionData';
import { CountryKey } from '@/types';

// --- Loading Skeletons for Suspense ---
const TabSkeleton = () => (
  <div className="h-64 w-full animate-pulse bg-white/5 dark:bg-slate-800/30 rounded-3xl flex items-center justify-center border border-white/5">
    <Loader2 className="animate-spin text-blue-500/30" size={32} />
  </div>
);

// --- Dynamic Imports for Efficiency (Lazy Loading) ---
const EducationTimeline = dynamic(() => import('@/components/EducationTimeline'), {
  loading: () => <TabSkeleton />,
  ssr: false
});

const Quiz = dynamic(() => import('@/components/Quiz'), {
  loading: () => <TabSkeleton />,
  ssr: false
});

const Glossary = dynamic(() => import('@/components/Glossary'), {
  loading: () => <TabSkeleton />,
  ssr: false
});

const AskAnything = dynamic(() => import('@/components/AskAnything'), {
  loading: () => <TabSkeleton />,
  ssr: false
});

/**
 * Valid tab keys for the education hub.
 */
type TabKey = 'timeline' | 'quiz' | 'glossary' | 'ask';

interface CountryOption {
  key: CountryKey;
  label: string;
  emoji: string;
}

interface TabItem {
  key: TabKey;
  label: string;
  icon: React.ElementType;
}

const COUNTRIES: CountryOption[] = [
  { key: 'us', label: 'United States', emoji: '🇺🇸' },
  { key: 'in', label: 'India', emoji: '🇮🇳' },
  { key: 'uk', label: 'United Kingdom', emoji: '🇬🇧' },
  { key: 'generic', label: 'How elections work', emoji: '🌍' },
];

const TABS: TabItem[] = [
  { key: 'timeline', label: 'Timeline', icon: Clock },
  { key: 'quiz', label: 'Quiz yourself', icon: Brain },
  { key: 'glossary', label: 'Glossary', icon: BookOpen },
  { key: 'ask', label: 'Ask anything', icon: MessageCircle },
];

/**
 * The Education Hub page component.
 * 
 * @component
 * @returns {JSX.Element} The rendered Education Hub.
 */
export default function EducationPage() {
  const [tab, setTab] = useState<TabKey>('timeline');
  const shouldReduceMotion = useReducedMotion();

  // Custom hook for state management
  const { 
    country, 
    electionData, 
    quizData, 
    quizKey, 
    selectCountry 
  } = useElectionData('us');

  const handleTabChange = useCallback((t: TabKey): void => {
    setTab(t);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A]">
      {/* --- Full-width Hero Header --- */}
      <div className="bg-gradient-to-b from-blue-900 via-[#0A192F] to-[#0F172A] text-white py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <m.div 
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/10">
              <Flag className="w-7 h-7 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">Education Hub</h1>
              <p className="text-blue-200/70 text-sm mt-1 max-w-md">
                Interactive civics education — explore timelines, quiz yourself, and understand democracy.
              </p>
            </div>
          </m.div>

          {/* --- Country Selector --- */}
          <div className="flex flex-wrap gap-2 mb-8">
            {COUNTRIES.map(c => (
              <button 
                key={c.key} 
                onClick={() => selectCountry(c.key)} 
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                  country === c.key 
                    ? 'bg-white text-slate-900 shadow-lg scale-105' 
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
                aria-pressed={country === c.key}
              >
                <span className="mr-2" role="img" aria-label={c.label}>{c.emoji}</span>
                {c.label}
              </button>
            ))}
          </div>

          {/* --- Main Navigation Tabs --- */}
          <nav className="flex gap-1 p-1 bg-white/10 backdrop-blur rounded-2xl border border-white/5" role="tablist">
            {TABS.map(t => {
              const Icon = t.icon;
              const isActive = tab === t.key;
              return (
                <button 
                  key={t.key} 
                  onClick={() => handleTabChange(t.key)} 
                  role="tab"
                  aria-selected={isActive}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                    isActive 
                      ? 'bg-white text-slate-900 shadow-xl' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">{t.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* --- Content Area --- */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          <m.div 
            key={`${tab}-${country}`} 
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }} 
            transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1] }}
          >
            <Suspense fallback={<TabSkeleton />}>
              {tab === 'timeline' && <EducationTimeline stages={electionData.stages} label={electionData.label} />}
              {tab === 'quiz' && <Quiz key={quizKey} questions={quizData} countryLabel={electionData.label} />}
              {tab === 'glossary' && <Glossary items={GLOSSARY} />}
              {tab === 'ask' && <AskAnything />}
            </Suspense>
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
