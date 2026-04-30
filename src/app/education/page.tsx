'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Brain, BookOpen, MessageCircle, Flag, ChevronDown, Info, CheckCircle, XCircle, RotateCcw, ArrowRight, Trophy, Search, Send, Loader2, Bot, Sparkles } from 'lucide-react';
import { ELECTION_DATA, QUIZZES, GLOSSARY, CountryKey, ElectionStage, QuizQuestion } from '@/data/electionData';
import { sanitizeHTML } from '@/utils/sanitize';

type TabKey = 'timeline' | 'quiz' | 'glossary' | 'ask';

const COUNTRIES: { key: CountryKey; label: string; emoji: string }[] = [
  { key: 'us', label: 'United States', emoji: '🇺🇸' },
  { key: 'in', label: 'India', emoji: '🇮🇳' },
  { key: 'uk', label: 'United Kingdom', emoji: '🇬🇧' },
  { key: 'generic', label: 'How elections work', emoji: '🌍' },
];

const TABS: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: 'timeline', label: 'Timeline', icon: Clock },
  { key: 'quiz', label: 'Quiz yourself', icon: Brain },
  { key: 'glossary', label: 'Glossary', icon: BookOpen },
  { key: 'ask', label: 'Ask anything', icon: MessageCircle },
];

const QUICK_QUESTIONS = [
  'How does the Electoral College work?',
  'What is voter suppression?',
  'How are results certified?',
  'What is ranked choice voting?',
  'How do I register to vote in India?',
  'What if there is a tie?',
];

/* ─── Timeline Panel ─── */
function TimelinePanel({ stages, label }: { stages: ElectionStage[]; label: string }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-4">{label}</p>
      <div className="relative pl-8">
        <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-slate-200 dark:bg-slate-700 rounded-full" />
        <div className="space-y-3">
          {stages.map((s, i) => {
            const open = openIdx === i;
            return (
              <div key={i} className="relative">
                <div className="absolute -left-8 top-[14px] w-[14px] h-[14px] rounded-full border-2 border-white dark:border-slate-900 z-10 transition-transform hover:scale-125" style={{ backgroundColor: s.color }} />
                <button onClick={() => setOpenIdx(open ? null : i)} className={`w-full text-left bg-white dark:bg-slate-800/60 border rounded-xl px-4 py-3 transition-all hover:border-slate-300 dark:hover:border-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${open ? 'border-slate-300 dark:border-slate-600 shadow-sm' : 'border-slate-200 dark:border-slate-700'}`} aria-expanded={open}>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-slate-400 min-w-[24px]">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[15px] font-medium text-slate-800 dark:text-slate-100 flex-1">{s.title}</span>
                    <span className="text-[11px] font-medium px-2 py-[2px] rounded-full" style={{ backgroundColor: s.badgeBg, color: s.badgeColor }}>{s.badge}</span>
                    <ChevronDown size={14} className={`text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
                  </div>
                  <p className="text-xs text-slate-400 mt-1 ml-9">{s.timing}</p>
                </button>
                <AnimatePresence>
                  {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                      <div className="bg-white dark:bg-slate-800/40 border border-t-0 border-slate-200 dark:border-slate-700 rounded-b-xl px-4 pb-4 pt-3 -mt-1">
                        <div className="border-t border-slate-100 dark:border-slate-700 pt-3">
                          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{s.desc}</p>
                          <div className="mt-3 space-y-2">
                            {s.tips.map((tip, ti) => (
                              <div key={ti} className="flex items-start gap-2 text-[13px] text-slate-500 dark:text-slate-400">
                                <Info size={14} className="flex-shrink-0 mt-[2px]" style={{ color: s.color }} />
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
    </div>
  );
}

/* ─── Quiz Panel ─── */
function QuizPanel({ questions }: { questions: QuizQuestion[] }) {
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [chosen, setChosen] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const q = questions[idx];

  const answer = (i: number) => { if (answered) return; setAnswered(true); setChosen(i); if (i === q.ans) setScore(s => s + 1); };
  const next = () => { if (idx + 1 >= questions.length) { setFinished(true); } else { setIdx(i => i + 1); setAnswered(false); setChosen(null); } };
  const restart = () => { setIdx(0); setAnswered(false); setChosen(null); setScore(0); setFinished(false); };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    const msg = pct < 40 ? 'Keep studying! Every civics lesson counts.' : pct < 60 ? 'Good effort — review the timeline for more context.' : pct < 80 ? 'Solid knowledge!' : 'Excellent! Civic champion!';
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 text-center">
        <Trophy size={48} className="mx-auto mb-4 text-amber-500" />
        <div className="text-5xl font-black text-slate-900 dark:text-white mb-1">{score}/{questions.length}</div>
        <p className="text-sm text-slate-500 mb-2">Your score — {pct}%</p>
        <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">{msg}</p>
        <button onClick={restart} className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full text-sm"><RotateCcw size={16} /> Try again</button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-6">
      <p className="text-xs text-slate-400 font-medium mb-1">Question {idx + 1} of {questions.length}</p>
      <h3 className="text-[15px] font-semibold text-slate-800 dark:text-slate-100 mb-5 leading-snug">{q.q}</h3>
      <div className="space-y-2">
        {q.opts.map((opt, i) => {
          let cls = 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-300';
          if (answered && i === q.ans) cls = 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-300 text-emerald-700 dark:text-emerald-300';
          else if (answered && i === chosen && chosen !== q.ans) cls = 'bg-red-50 dark:bg-red-900/30 border-red-300 text-red-700 dark:text-red-300';
          return (
            <button key={i} onClick={() => answer(i)} disabled={answered} className={`w-full text-left px-4 py-3 border rounded-xl text-sm transition-all disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${cls}`}>
              <div className="flex items-center gap-2">
                {answered && i === q.ans && <CheckCircle size={16} className="text-emerald-600 flex-shrink-0" />}
                {answered && i === chosen && chosen !== q.ans && <XCircle size={16} className="text-red-600 flex-shrink-0" />}
                <span>{opt}</span>
              </div>
            </button>
          );
        })}
      </div>
      <AnimatePresence>
        {answered && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`mt-4 p-3 rounded-xl text-[13px] leading-relaxed ${chosen === q.ans ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'}`}>
            <strong>{chosen === q.ans ? 'Correct!' : 'Not quite.'}</strong> {q.exp}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex items-center justify-between mt-5">
        <span className="text-xs text-slate-400">Score: {score} correct</span>
        {answered && <motion.button initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} onClick={next} className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full text-sm">{idx + 1 >= questions.length ? 'See Results' : 'Next question'} <ArrowRight size={14} /></motion.button>}
      </div>
    </div>
  );
}

/* ─── Glossary Panel ─── */
function GlossaryPanel() {
  const [search, setSearch] = useState('');
  const filtered = GLOSSARY.filter(g => g.term.toLowerCase().includes(search.toLowerCase()) || g.def.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-4">Essential election vocabulary</p>
      <div className="relative mb-5">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search terms…" className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500" aria-label="Search glossary terms" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((g, i) => (
          <motion.div key={g.term} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }} className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-3.5 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
            <h4 className="text-[13px] font-semibold text-slate-800 dark:text-slate-100 mb-1">{g.term}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{g.def}</p>
          </motion.div>
        ))}
        {filtered.length === 0 && <p className="col-span-2 text-center text-sm text-slate-400 py-8">No terms match your search.</p>}
      </div>
    </div>
  );
}

/* ─── Ask Anything Panel ─── */
function AskPanel() {
  const [input, setInput] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const ask = async (question: string) => {
    if (!question.trim() || loading) return;
    setLoading(true); setAnswer(null); setInput('');
    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: question }) });
      const data = await res.json();
      setAnswer(data.response || 'No response received.');
    } catch { setAnswer('Unable to connect. Please try again later.'); }
    finally { setLoading(false); }
  };

  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-4">Ask any question about elections</p>
      <div className="flex gap-2 mb-3">
        <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && ask(input)} placeholder="e.g. What is gerrymandering?" className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500" aria-label="Type your election question" disabled={loading} />
        <button onClick={() => ask(input)} disabled={!input.trim() || loading} className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold rounded-xl text-sm flex items-center gap-1.5">
          {loading ? <Loader2 size={16} className="animate-spin" /> : <><Send size={14} /> Ask</>}
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-5">
        {QUICK_QUESTIONS.map((q, i) => (
          <button key={i} onClick={() => { setInput(q); ask(q); }} disabled={loading} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-full text-xs text-slate-500 hover:text-slate-800 hover:border-slate-300 transition-all disabled:opacity-50">{q} ↗</button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {loading && <motion.div key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700"><Loader2 size={20} className="animate-spin text-blue-500" /><span className="text-sm text-slate-500">Thinking…</span></motion.div>}
        {!loading && answer && <motion.div key="a" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700"><div className="flex items-center gap-2 mb-2 text-[11px] uppercase font-bold text-blue-500 tracking-wider"><Bot size={14} /> Ballot Buddy</div><div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: sanitizeHTML(answer) }} /></motion.div>}
        {!loading && !answer && <motion.div key="p" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-[13px] text-slate-500 leading-relaxed flex items-start gap-2"><Sparkles size={16} className="flex-shrink-0 mt-0.5 text-amber-500" />Click a question above or type your own. Ballot Buddy will answer neutrally.</motion.div>}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Page ─── */
export default function EducationPage() {
  const [country, setCountry] = useState<CountryKey>('us');
  const [tab, setTab] = useState<TabKey>('timeline');
  const [quizKey, setQuizKey] = useState(0);

  const data = useMemo(() => ELECTION_DATA[country], [country]);
  const quiz = useMemo(() => QUIZZES[country], [country]);

  const changeCountry = (c: CountryKey) => { setCountry(c); setQuizKey(k => k + 1); };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A]">
      {/* Full-width hero */}
      <div className="bg-gradient-to-b from-blue-900 via-[#0A192F] to-[#0F172A] text-white py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center"><Flag className="w-7 h-7" /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">Election Process Guide</h1>
              <p className="text-blue-200/70 text-sm mt-1">Interactive civics education — explore timelines, quiz yourself, and understand how democracy works.</p>
            </div>
          </div>

          {/* Country selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {COUNTRIES.map(c => (
              <button key={c.key} onClick={() => changeCountry(c.key)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${country === c.key ? 'bg-white text-slate-900 shadow-lg' : 'bg-white/10 text-white/80 hover:bg-white/20'}`} aria-pressed={country === c.key}>
                <span className="mr-1.5">{c.emoji}</span>{c.label}
              </button>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-white/10 backdrop-blur rounded-xl">
            {TABS.map(t => {
              const Icon = t.icon;
              return (
                <button key={t.key} onClick={() => setTab(t.key)} className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${tab === t.key ? 'bg-white text-slate-900 shadow' : 'text-white/70 hover:text-white hover:bg-white/10'}`} role="tab" aria-selected={tab === t.key}>
                  <Icon size={16} /><span className="hidden sm:inline">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div key={`${tab}-${country}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
            {tab === 'timeline' && <TimelinePanel stages={data.stages} label={data.label} />}
            {tab === 'quiz' && <QuizPanel key={quizKey} questions={quiz} />}
            {tab === 'glossary' && <GlossaryPanel />}
            {tab === 'ask' && <AskPanel />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
