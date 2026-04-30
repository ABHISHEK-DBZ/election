'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw, ArrowRight, Trophy } from 'lucide-react';
import { QuizQuestion } from '@/data/electionData';

/**
 * Props for the Quiz component.
 * 
 * @interface QuizProps
 */
interface QuizProps {
  /** The list of quiz questions to display. */
  questions: QuizQuestion[];
  /** The label of the country for the current quiz context. */
  countryLabel: string;
}

/**
 * Interactive Quiz component that tests user knowledge on election processes.
 * Features score tracking, immediate feedback, and a summary results screen.
 * 
 * @component
 * @param {QuizProps} props - The component props.
 * @returns {JSX.Element} The rendered Quiz UI.
 */
const Quiz: React.FC<QuizProps> = ({ questions, countryLabel }) => {
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [chosenAnswer, setChosenAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQ = questions[idx];

  const handleAnswer = useCallback((chosen: number) => {
    if (answered) return;
    setAnswered(true);
    setChosenAnswer(chosen);
    if (chosen === currentQ.ans) {
      setScore(prev => prev + 1);
    }
  }, [answered, currentQ]);

  const nextQuestion = useCallback(() => {
    if (idx + 1 >= questions.length) {
      setFinished(true);
    } else {
      setIdx(prev => prev + 1);
      setAnswered(false);
      setChosenAnswer(null);
    }
  }, [idx, questions.length]);

  const restartQuiz = useCallback(() => {
    setIdx(0);
    setAnswered(false);
    setChosenAnswer(null);
    setScore(0);
    setFinished(false);
  }, []);

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    const msgs = [
      'Keep studying! Every civics lesson counts.',
      'Good effort — review the timeline for more context.',
      'Solid knowledge! You know your election process.',
      'Excellent! You are a civic education champion.'
    ];
    const msg = pct < 40 ? msgs[0] : pct < 60 ? msgs[1] : pct < 80 ? msgs[2] : msgs[3];

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 text-center"
      >
        <Trophy size={48} className="mx-auto mb-4 text-amber-500" />
        <div className="text-5xl font-black text-slate-900 dark:text-white mb-1">
          {score}/{questions.length}
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Your score — {pct}%</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed max-w-sm mx-auto">{msg}</p>
        <button
          onClick={restartQuiz}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors text-sm"
        >
          <RotateCcw size={16} /> Try again
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-6">
      <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mb-1">
        Question {idx + 1} of {questions.length}
      </p>
      <h3 className="text-[15px] font-semibold text-slate-800 dark:text-slate-100 mb-5 leading-snug">
        {currentQ.q}
      </h3>

      <div className="space-y-2">
        {currentQ.opts.map((opt, i) => {
          let optClass = 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600';
          if (answered) {
            if (i === currentQ.ans) {
              optClass = 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300';
            } else if (i === chosenAnswer && chosenAnswer !== currentQ.ans) {
              optClass = 'bg-red-50 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300';
            }
          }
          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={answered}
              className={`w-full text-left px-4 py-3 border rounded-xl text-sm transition-all disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${optClass}`}
            >
              <div className="flex items-center gap-2">
                {answered && i === currentQ.ans && <CheckCircle size={16} className="text-emerald-600 flex-shrink-0" />}
                {answered && i === chosenAnswer && chosenAnswer !== currentQ.ans && <XCircle size={16} className="text-red-600 flex-shrink-0" />}
                <span>{opt}</span>
              </div>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-4 p-3 rounded-xl text-[13px] leading-relaxed ${
              chosenAnswer === currentQ.ans
                ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300'
                : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
            }`}
          >
            <strong>{chosenAnswer === currentQ.ans ? 'Correct!' : 'Not quite.'}</strong> {currentQ.exp}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mt-5">
        <span className="text-xs text-slate-400 dark:text-slate-500">Score: {score} correct</span>
        {answered && (
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={nextQuestion}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors text-sm"
          >
            {idx + 1 >= questions.length ? 'See Results' : 'Next question'} <ArrowRight size={14} />
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
