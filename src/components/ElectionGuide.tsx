'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Brain, BookOpen, MessageCircle, Flag } from 'lucide-react';
import { ELECTION_DATA, QUIZZES, GLOSSARY, COUNTRY_LABELS, CountryKey } from '@/data/electionData';
import EducationTimeline from '@/components/EducationTimeline';
import Quiz from '@/components/Quiz';
import Glossary from '@/components/Glossary';
import AskAnything from '@/components/AskAnything';

type TabKey = 'timeline' | 'quiz' | 'glossary' | 'ask';

const TABS: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: 'timeline', label: 'Timeline', icon: Clock },
  { key: 'quiz', label: 'Quiz yourself', icon: Brain },
  { key: 'glossary', label: 'Glossary', icon: BookOpen },
  { key: 'ask', label: 'Ask anything', icon: MessageCircle },
];

const COUNTRIES: { key: CountryKey; label: string; emoji: string }[] = [
  { key: 'us', label: 'United States', emoji: '🇺🇸' },
  { key: 'in', label: 'India', emoji: '🇮🇳' },
  { key: 'uk', label: 'United Kingdom', emoji: '🇬🇧' },
  { key: 'generic', label: 'How elections work', emoji: '🌍' },
];

/**
 * ElectionGuide — The main Education Hub component.
 * Contains tabbed navigation for Timeline, Quiz, Glossary, and Ask Anything,
 * with a country selector to switch between US, India, UK, and General election data.
 */
const ElectionGuide: React.FC = () => {
  const [activeCountry, setActiveCountry] = useState<CountryKey>('us');
  const [activeTab, setActiveTab] = useState<TabKey>('timeline');
  const [quizKey, setQuizKey] = useState(0); // Forces quiz remount on country change

  const countryData = useMemo(() => ELECTION_DATA[activeCountry], [activeCountry]);
  const quizData = useMemo(() => QUIZZES[activeCountry], [activeCountry]);

  const handleCountryChange = (country: CountryKey) => {
    setActiveCountry(country);
    setQuizKey(prev => prev + 1); // Reset quiz state on country change
  };

  return (
    <section className="w-full max-w-3xl mx-auto py-12 px-4" aria-label="Election Process Education Assistant">
      {/* Header */}
      <div className="flex items-start gap-4 mb-8 pb-5 border-b border-slate-200 dark:border-slate-700">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
          <Flag className="w-7 h-7 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
            Election Process Guide
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            Interactive civics education — explore timelines, quiz yourself, and understand how democracy works step by step.
          </p>
        </div>
      </div>

      {/* Country Selector */}
      <div className="mb-5">
        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
          Choose a system to explore
        </p>
        <div className="flex flex-wrap gap-2">
          {COUNTRIES.map(c => (
            <button
              key={c.key}
              onClick={() => handleCountryChange(c.key)}
              className={`px-4 py-1.5 rounded-full text-[13px] font-medium border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                activeCountry === c.key
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-transparent'
                  : 'bg-white dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
              aria-pressed={activeCountry === c.key}
            >
              <span className="mr-1.5">{c.emoji}</span> {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800/60 rounded-xl mb-6">
        {TABS.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                activeTab === tab.key
                  ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm border border-slate-200 dark:border-slate-600'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
              role="tab"
              aria-selected={activeTab === tab.key}
            >
              <Icon size={14} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeTab}-${activeCountry}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'timeline' && (
            <EducationTimeline stages={countryData.stages} label={countryData.label} />
          )}
          {activeTab === 'quiz' && (
            <Quiz key={quizKey} questions={quizData} countryLabel={COUNTRY_LABELS[activeCountry]} />
          )}
          {activeTab === 'glossary' && (
            <Glossary items={GLOSSARY} />
          )}
          {activeTab === 'ask' && (
            <AskAnything />
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default ElectionGuide;
