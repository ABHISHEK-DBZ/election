import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CivicFlow 2.0: Premium Election Guide',
  description: 'A highly secure, accessible, and premium guide to the election process.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script src="https://accounts.google.com/gsi/client" async defer></script>
      </head>
      <body className={`${inter.className} min-h-screen selection:bg-blue-600 selection:text-white`}>
        {/* Google Identity Services - One Tap Integration */}
        <div id="g_id_onload"
             data-client_id="YOUR_GOOGLE_CLIENT_ID"
             data-context="signin"
             data-ux_mode="popup"
             data-auto_prompt="false">
        </div>
        <nav className="sticky top-0 z-40 bg-white/80 dark:bg-[#0A192F]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <h1 className="text-2xl font-black tracking-tighter text-blue-600 dark:text-blue-400">
              CIVICFLOW <span className="text-slate-900 dark:text-white font-light">2.0</span>
            </h1>
            <div className="flex gap-6">
              <a href="/education" className="text-sm font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded px-2 py-1">Education</a>
              <a href="/#reps" className="text-sm font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded px-2 py-1">Representatives</a>
              <a href="/#timeline" className="text-sm font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded px-2 py-1">Journey</a>
            </div>
          </div>
        </nav>
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <footer className="py-12 border-t border-slate-200 dark:border-slate-800 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} CivicFlow 2.0. A premium, non-partisan educational tool.</p>
        </footer>
      </body>
    </html>
  );
}
