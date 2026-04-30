'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Check, X, RefreshCcw, Brain, Trophy, ArrowRight } from 'lucide-react';
import { QuizProps, QuizQuestion, Variants } from '@/types';

/**
 * Interactive civic knowledge quiz.
 * Refactored to use LazyMotion (m) and respect user reduced motion preferences.
 * 
 * @component
 * @param {QuizProps} props - Component properties.
 * @returns {JSX.Element} The rendered Quiz.
 */
const Quiz: React.FC<QuizProps> = ({ questions, countryLabel }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();

  const currentQuestion = questions[currentIdx];

  /**
   * Handles answer selection.
   */
  const handleAnswer = useCallback((idx: number) => {
    if (isAnswered) return;
    setSelectedIdx(idx);
    setIsAnswered(true);
    if (idx === currentQuestion.correctIdx) {
      setScore(prev => prev + 1);
    }
  }, [isAnswered, currentQuestion]);

  /**
   * Proceeds to the next question or shows the final score.
   */
  const handleNext = useCallback(() => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedIdx(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  }, [currentIdx, questions.length]);

  /**
   * Resets the quiz state.
   */
  const handleReset = useCallback(() => {
    setCurrentIdx(0);
    setScore(0);
    setShowResult(false);
    setSelectedIdx(null);
    setIsAnswered(false);
  }, []);

  /**
   * Animation variants.
   */
  const cardVariants: Variants = {
    initial: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.95, y: shouldReduceMotion ? 0 : 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.95, y: shouldReduceMotion ? 0 : -20 }
  };

  if (showResult) {
    return (
      <m.div 
        variants={cardVariants}
        initial="initial"
        animate="animate"
        className="glass-panel p-12 text-center bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/30 rounded-[3rem] shadow-2xl"
      >
        <div className="w-24 h-24 bg-blue-600 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl">
          <Trophy size={48} />
        </div>
        <h2 className="text-4xl font-black mb-4 tracking-tight text-slate-900 dark:text-white">Quiz Complete!</h2>
        <p className="text-xl font-bold text-blue-600 mb-8 uppercase tracking-widest">{countryLabel} Challenge</p>
        <div className="text-6xl font-black mb-10 text-slate-900 dark:text-white">
          {score} <span className="text-slate-300 dark:text-slate-700 text-3xl">/ {questions.length}</span>
        </div>
        <button 
          onClick={handleReset}
          className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl active:scale-95"
        >
          <RefreshCcw size={20} /> Try Again
        </button>
      </m.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Progress */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2 text-blue-600">
          <Brain size={20} />
          <span className="font-black uppercase tracking-widest text-sm">{countryLabel} Quiz</span>
        </div>
        <span className="font-black text-slate-400">0{currentIdx + 1} / 0{questions.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <m.div 
          key={currentIdx}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="glass-panel p-8 md:p-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] shadow-2xl"
        >
          <h3 className="text-2xl md:text-3xl font-black mb-10 tracking-tight text-slate-900 dark:text-white leading-tight">
            {currentQuestion.question}
          </h3>

          <div className="space-y-4">
            {currentQuestion.options.map((option, idx) => {
              const isCorrect = idx === currentQuestion.correctIdx;
              const isSelected = idx === selectedIdx;
              
              let statusClass = 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-blue-600/30';
              if (isAnswered) {
                if (isCorrect) statusClass = 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-700 dark:text-emerald-400';
                else if (isSelected) statusClass = 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-700 dark:text-red-400';
              }

              return (
                <button 
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-6 rounded-2xl border-2 font-bold transition-all flex items-center justify-between group ${statusClass}`}
                >
                  <span>{option}</span>
                  {isAnswered && isCorrect && <Check size={20} />}
                  {isAnswered && !isCorrect && isSelected && <X size={20} />}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {isAnswered && (
              <m.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-10 p-6 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-800/30"
              >
                <p className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-2 uppercase tracking-widest">Educational Insight</p>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic">
                  &quot;{currentQuestion.explanation}&quot;
                </p>
                <button 
                  onClick={handleNext}
                  className="mt-6 w-full flex items-center justify-center gap-2 py-4 bg-slate-900 dark:bg-blue-600 text-white rounded-xl font-black text-sm hover:opacity-90 transition-opacity"
                >
                  {currentIdx < questions.length - 1 ? 'Next Question' : 'See Results'} <ArrowRight size={18} />
                </button>
              </m.div>
            )}
          </AnimatePresence>
        </m.div>
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
