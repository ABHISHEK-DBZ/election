import { useState, useCallback, useMemo } from 'react';
import { RepresentativeData, CivicOffice, CivicOfficial } from '@/types';

/**
 * Interface for the flattened representative data used for rendering.
 */
export interface MappedRepresentative {
  office: CivicOffice;
  official: CivicOfficial;
}

/**
 * Custom hook to handle representative lookups via Google Civic API.
 * 
 * @returns {Object} Search state, results, and handler.
 */
export function useCivicLookup() {
  const [address, setAddress] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [rawResponse, setRawResponse] = useState<RepresentativeData | null>(null);

  /**
   * Performs the representative lookup via the internal API route.
   */
  const performLookup = useCallback(async (query: string): Promise<void> => {
    if (!query.trim() || isLoading) return;

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
  }, [isLoading]);

  /**
   * Memoized flattened data for UI consumption.
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

  return {
    address,
    setAddress,
    isLoading,
    error,
    mappedData,
    performLookup
  };
}
