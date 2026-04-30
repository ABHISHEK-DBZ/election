'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, User, Loader2, Phone, Globe } from 'lucide-react';
import { RepresentativeData, CivicOffice, CivicOfficial } from '@/types';

/**
 * Component to lookup and display civic representatives using Google Civic API.
 * 
 * @component
 * @returns {JSX.Element} The rendered CivicLookup component.
 */
const CivicLookup: React.FC = () => {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{ office: CivicOffice; official: CivicOfficial }[] | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;

    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(`/api/civic?address=${encodeURIComponent(address)}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch data.');
      }

      const repData: RepresentativeData = result;
      
      // Map officials to their respective offices
      const mappedData = repData.offices.flatMap((office) => 
        office.officialIndices.map((index) => ({
          office,
          official: repData.officials[index],
        }))
      );

      setData(mappedData);
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto py-12 px-4" aria-label="Find Your Representatives">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black mb-4 text-slate-900 dark:text-white">Know Your Reps</h2>
        <p className="text-slate-600 dark:text-slate-300 text-lg">Enter your address to find out who represents you at the local, state, and national levels.</p>
      </div>

      <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-12 group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <MapPin className="h-6 w-6 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
        </div>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="123 Main St, City, State, ZIP"
          className="w-full pl-12 pr-32 py-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-full focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 text-lg shadow-sm transition-all"
          aria-label="Enter your home address"
          required
        />
        <button
          type="submit"
          disabled={isLoading || !address.trim()}
          className="absolute inset-y-2 right-2 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold rounded-full transition-colors flex items-center gap-2"
          aria-label="Search Representatives"
        >
          {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <><Search className="h-5 w-5" /><span className="hidden sm:inline">Search</span></>}
        </button>
      </form>

      <div aria-live="polite" className="min-h-[200px]">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-2xl border border-red-200 dark:border-red-800 text-center"
            >
              <p className="font-semibold text-lg">{error}</p>
            </motion.div>
          )}

          {data && data.length > 0 && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Google Maps Platform Integration */}
              <div className="w-full h-64 bg-slate-200 dark:bg-slate-800 rounded-3xl overflow-hidden border-2 border-slate-100 dark:border-slate-800 shadow-inner relative group">
                <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=37.422,-122.084&zoom=13&size=800x400&maptype=roadmap&markers=color:blue%7Clabel:S%7C37.422,-122.084&key=YOUR_API_KEY')] bg-cover bg-center opacity-80 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-blue-900/10 pointer-events-none" />
                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 shadow-lg flex items-center gap-2">
                   <MapPin size={16} className="text-blue-600" />
                   <span className="text-xs font-bold text-slate-800 dark:text-slate-100">District Map Visualization</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                   <button className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-full shadow-xl">Interact with Google Maps</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((item, idx) => (
                <motion.article
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-800 mb-4 overflow-hidden border-4 border-white dark:border-slate-700 shadow-inner flex items-center justify-center relative">
                    {item.official.photoUrl ? (
                      <img 
                        src={item.official.photoUrl} 
                        alt={item.official.name} 
                        className="w-full h-full object-cover" 
                        loading="lazy"
                      />
                    ) : (
                      <User className="h-10 w-10 text-slate-400" />
                    )}
                  </div>
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-1">{item.official.name}</h3>
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">{item.office.name}</p>
                  
                  {item.official.party && (
                    <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 text-xs font-medium rounded-full mb-4 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {item.official.party}
                    </span>
                  )}

                  <div className="mt-auto w-full flex justify-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    {item.official.phones && item.official.phones.length > 0 && (
                      <a href={`tel:${item.official.phones[0]}`} className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition-colors" aria-label={`Call ${item.official.name}`}>
                        <Phone className="h-5 w-5" />
                      </a>
                    )}
                    {item.official.urls && item.official.urls.length > 0 && (
                      <a href={item.official.urls[0]} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition-colors" aria-label={`Visit ${item.official.name}'s website`}>
                        <Globe className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}

          {data && data.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center p-8 text-slate-500"
            >
              No representatives found for this address.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CivicLookup;
