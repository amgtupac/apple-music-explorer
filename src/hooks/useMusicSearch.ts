import { useState, useCallback } from 'react';
import { Track, SearchResult } from '@/types/music';

export const useMusicSearch = () => {
  const [results, setResults] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (term: string, entity: string = 'song') => {
    if (!term.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=${entity}&limit=25`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch results');
      }

      const data: SearchResult = await response.json();
      setResults(data.results.filter(track => track.previewUrl));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return { results, isLoading, error, search, clearResults };
};
