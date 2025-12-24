import { useState, useEffect } from 'react';
import { Track } from '@/types/music';

// Popular search terms to simulate trending (since iTunes doesn't have a direct charts API)
const TRENDING_SEARCHES = [
  'Taylor Swift',
  'Drake',
  'The Weeknd',
  'Billie Eilish',
  'Bad Bunny',
  'Ed Sheeran',
  'Dua Lipa',
  'Post Malone',
];

export const useTrendingCharts = () => {
  const [trending, setTrending] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrending = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch top songs from multiple popular artists
        const randomArtists = TRENDING_SEARCHES
          .sort(() => Math.random() - 0.5)
          .slice(0, 4);

        const promises = randomArtists.map(artist =>
          fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(artist)}&entity=song&limit=5`)
            .then(res => res.json())
        );

        const results = await Promise.all(promises);
        const allTracks = results.flatMap(r => r.results || []);
        
        // Filter tracks with preview URLs and shuffle
        const validTracks = allTracks
          .filter((track: Track) => track.previewUrl)
          .sort(() => Math.random() - 0.5)
          .slice(0, 20);

        setTrending(validTracks);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load trending');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return { trending, isLoading, error };
};
