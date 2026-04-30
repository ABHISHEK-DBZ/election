'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, User, Loader2, Phone, Globe } from 'lucide-react';
import Image from 'next/image';
import { RepresentativeData, CivicOffice, CivicOfficial } from '@/types';

/**
 * Interface for the flattened representative data used for rendering.
 */
interface MappedRepresentative {
  /** The office details. */
  office: CivicOffice;
  /** The official details. */
  official: CivicOfficial;
}

/**
 * Component to lookup and display civic representatives using the Google Civic Information API.
 * Integrates Google Maps Static API for spatial visualization and optimizes image delivery.
 * 
 * @component
 * @returns {JSX.Element} The rendered CivicLookup UI.
 */
const CivicLookup: React.FC = () => {
  const [address, setAddress] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [rawResponse, setRawResponse] = useState<RepresentativeData | null>(null);

  /**
   * Performs the representative lookup via the internal API route.
   * memoized to prevent unnecessary re-creations.
   * 
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSearch = useCallback(async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const query = address.trim();
    if (!query || isLoading) return;

    setIsLoading(true);
    setError(null);
    setRawResponse(null);

    try {
      const response = await fetch(`/api/civic?address=${encodeURIComponent(query)}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch civic data.');
      }

      setRawResponse(result as RepresentativeData);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [address, isLoading]);

  /**
   * Flattens the nested Google Civic API response into a renderable list of representatives.
   * memoized to ensure re-mapping only occurs when the raw data changes.
   */
  const mappedData = useMemo((): MappedRepresentative[] => {
    if (!rawResponse) return [];
    
    return rawResponse.offices.flatMap((office) => 
      office.officialIndices.map((index) => ({
        office,
        official: rawResponse.officials[index],
      }))
    );
  }, [rawResponse]);

  return (
    <section className="w-full max-w-4xl mx-auto py-16 px-6" aria-label="Find Your Representatives">
      {/* --- Section Header --- */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white tracking-tight">Know Your Reps</h2>
        <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto">
          Enter your address to identify your representatives at local, state, and national levels.
        </p>
      </div>

      {/* --- Search Interface --- */}
      <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-16 group">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <MapPin className="h-6 w-6 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
        </div>
        <input
          type="text"
          value={address}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
          placeholder="123 Main St, City, State, ZIP"
          className="w-full pl-14 pr-36 py-4.5 bg-white dark:bg-[#0A192F] border-2 border-slate-200 dark:border-slate-800 rounded-full focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-lg shadow-xl transition-all dark:text-white"
          aria-label="Enter your home address"
          required
        />
        <button
          type="submit"
          disabled={isLoading || !address.trim()}
          className="absolute inset-y-2 right-2 px-8 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-black rounded-full transition-all flex items-center gap-2 shadow-lg active:scale-95"
        >
          {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <><Search className="h-5 w-5" /><span className="hidden sm:inline">Lookup</span></>}
        </button>
      </form>

      <div aria-live="polite">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-400 rounded-3xl border border-red-100 dark:border-red-900/30 text-center shadow-sm"
            >
              <p className="font-bold text-lg">{error}</p>
            </motion.div>
          )}

          {mappedData.length > 0 && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              {/* --- Google Maps Platform Visualization --- */}
              <div className="w-full h-80 bg-slate-200 dark:bg-slate-800 rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl relative group">
                <Image 
                  src={`https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(address)}&zoom=13&size=1000x500&maptype=roadmap&markers=color:blue%7Clabel:V%7C${encodeURIComponent(address)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSy_demo_key"}`}
                  alt="District boundary map visualization"
                  fill
                  className="object-cover opacity-90 group-hover:scale-110 transition-transform duration-[2000ms]"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
                <div className="absolute inset-0 bg-blue-900/5 mix-blend-overlay pointer-events-none" />
                <div className="absolute bottom-6 left-6 bg-white/95 dark:bg-[#0A192F]/95 backdrop-blur-xl px-5 py-2.5 rounded-2xl border border-white/20 shadow-2xl flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                     <MapPin size={14} className="text-white" />
                   </div>
                   <div>
                     <span className="text-[10px] uppercase font-black text-blue-600 block leading-none mb-1">Live Context</span>
                     <span className="text-xs font-bold text-slate-900 dark:text-white">Active Voting District Map</span>
                   </div>
                </div>
              </div>

              {/* --- Representatives Grid --- */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {mappedData.map((item, idx) => (
                <motion.article
                  key={`${item.official.name}-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.5, ease: "easeOut" }}
                  className="glass-panel p-8 rounded-3xl flex flex-col items-center text-center shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all border border-slate-100 dark:border-slate-800"
                >
                  <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 mb-6 overflow-hidden border-4 border-white dark:border-slate-700 shadow-inner flex items-center justify-center relative group/img">
                    {item.official.photoUrl ? (
                      <img 
                        src={item.official.photoUrl} 
                        alt={`${item.official.name} photo`} 
                        className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" 
                        loading="lazy"
                      />
                    ) : (
                      <User className="h-10 w-10 text-slate-300" />
                    )}
                  </div>
                  
                  <h3 className="font-black text-xl text-slate-900 dark:text-white mb-1 leading-tight">{item.official.name}</h3>
                  <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-4 px-4 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                    {item.office.name}
                  </p>
                  
                  {item.official.party && (
                    <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-6 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${item.official.party.includes('Dem') ? 'bg-blue-500' : item.official.party.includes('Rep') ? 'bg-red-500' : 'bg-slate-400'}`} />
                      {item.official.party}
                    </div>
                  )}

                  {/* --- Contact Actions --- */}
                  <div className="mt-auto w-full flex justify-center gap-4 pt-6 border-t border-slate-100 dark:border-slate-800/50">
                    {item.official.phones?.[0] && (
                      <a href={`tel:${item.official.phones[0]}`} className="w-10 h-10 flex items-center justify-center bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white rounded-full transition-all shadow-sm" aria-label={`Call ${item.official.name}`}>
                        <Phone size={18} />
                      </a>
                    )}
                    {item.official.urls?.[0] && (
                      <a href={item.official.urls[0]} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white rounded-full transition-all shadow-sm" aria-label={`Visit website of ${item.official.name}`}>
                        <Globe size={18} />
                      </a>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
          )}

          {rawResponse && mappedData.length === 0 && !isLoading && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center p-16 bg-white dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800"
            >
              <p className="text-slate-500 font-bold text-lg">No representatives found for this specific address.</p>
              <p className="text-sm text-slate-400 mt-2">Try including your house number and full zip code.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CivicLookup;
