'use client';

import React, { useEffect } from 'react';
import { RotateCcw, Home, AlertTriangle } from 'lucide-react';

/**
 * Interface for Error component props.
 */
interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Global error handler for the application.
 * Provides a graceful UI for runtime failures.
 * 
 * @component
 * @param {ErrorProps} props - The component props.
 * @returns {JSX.Element} The rendered error UI.
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Runtime Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] flex items-center justify-center p-6">
      <div className="max-w-md w-full glass-panel p-8 rounded-3xl text-center shadow-xl border-red-100 dark:border-red-900/30">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Something went wrong</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
          We encountered an unexpected error. Don't worry, your civic data is safe. Try refreshing or going back home.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => reset()}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20"
          >
            <RotateCcw size={18} />
            Try again
          </button>
          <a
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
          >
            <Home size={18} />
            Return home
          </a>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-left">
            <p className="text-xs font-mono text-red-500 overflow-auto max-h-32 p-2 bg-red-50 dark:bg-red-900/10 rounded">
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
