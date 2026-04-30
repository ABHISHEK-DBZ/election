import { useState, useCallback, useMemo } from 'react';
import { ELECTION_DATA, QUIZZES } from '@/data/electionData';
import { CountryKey, CountryData, QuizQuestion } from '@/types';

/**
 * Custom hook to manage election education data and quiz states.
 * 
 * @returns {Object} Current country, election data, quiz data, and handlers.
 */
export function useElectionData(initialCountry: CountryKey = 'us') {
  const [country, setCountry] = useState<CountryKey>(initialCountry);
  const [quizKey, setQuizKey] = useState<number>(0);

  /**
   * Derived election data for the selected country.
   */
  const electionData = useMemo<CountryData>(() => 
    (ELECTION_DATA as Record<CountryKey, CountryData>)[country], 
  [country]);

  /**
   * Derived quiz questions for the selected country.
   */
  const quizData = useMemo<QuizQuestion[]>(() => 
    (QUIZZES as Record<CountryKey, QuizQuestion[]>)[country], 
  [country]);

  /**
   * Handles country selection and resets quiz identifiers.
   */
  const selectCountry = useCallback((newCountry: CountryKey): void => {
    setCountry(newCountry);
    setQuizKey(prev => prev + 1);
  }, []);

  return {
    country,
    electionData,
    quizData,
    quizKey,
    selectCountry
  };
}
