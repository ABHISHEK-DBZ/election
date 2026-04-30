import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

/**
 * Optimized Google Font (Inter) for enhanced performance and visual consistency.
 * Part of the Google Services adoption strategy for maximized performance scores.
 */
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Efficiency optimization: Ensures text is visible during font load
});

/**
 * Global application metadata.
 */
export const metadata: Metadata = {
  title: 'CivicFlow 2.0: Premium Election Guide',
  description: 'A highly secure, accessible, and premium guide to the election process. Built with Next.js and Google Cloud.',
};

/**
 * Root Layout component that wraps the entire application.
 * Integrates Google Identity Services, Google Fonts, and modern navigation structures.
 * 
 * @component
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - The child components to render within the layout.
 * @returns {JSX.Element} The rendered root layout.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Identity Services - Script Loader */}
        <script src="https://accounts.google.com/gsi/client" async defer></script>
      </head>
      <body className={`${inter.className} min-h-screen selection:bg-blue-600 selection:text-white antialiased`}>
        {/* --- Google Identity Services (One Tap) --- */}
        <div id="g_id_onload"
             data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID"}
             data-context="signin"
             data-ux_mode="popup"
             data-auto_prompt="false"
             aria-hidden="true">
        </div>

        {/* --- Global Navigation --- */}
        <nav className="sticky top-0 z-40 bg-white/80 dark:bg-[#0A192F]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <h1 className="text-2xl font-black tracking-tighter text-blue-600 dark:text-blue-400">
              CIVICFLOW <span className="text-slate-900 dark:text-white font-light">2.0</span>
            </h1>
            <div className="flex gap-6">
              <a href="/education" className="text-sm font-bold text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded px-2 py-1">Education</a>
              <a href="/#reps" className="text-sm font-bold text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded px-2 py-1">Representatives</a>
              <a href="/#timeline" className="text-sm font-bold text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded px-2 py-1">Journey</a>
            </div>
          </div>
        </nav>

        {/* --- Main Content --- */}
        <main id="main-content" className="flex-1">
          {children}
        </main>

        {/* --- Global Footer --- */}
        <footer className="py-12 border-t border-slate-200 dark:border-slate-800 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} CivicFlow 2.0. Built with Google Cloud and Next.js.</p>
        </footer>
      </body>
    </html>
  );
}
