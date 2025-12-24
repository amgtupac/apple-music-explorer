import { useState, useCallback } from 'react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { SearchResults } from '@/components/SearchResults';
import { TrendingSection } from '@/components/TrendingSection';
import { Player } from '@/components/Player';
import { Playlist } from '@/components/Playlist';
import { useMusicSearch } from '@/hooks/useMusicSearch';
import { usePlayer } from '@/hooks/usePlayer';
import { usePlaylist } from '@/hooks/usePlaylist';
import { useTrendingCharts } from '@/hooks/useTrendingCharts';

const Index = () => {
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');

  const { results, isLoading, error, search, clearResults } = useMusicSearch();
  const { currentTrack, isPlaying, progress, duration, play, togglePlay, seek } = usePlayer();
  const { playlist, addToPlaylist, removeFromPlaylist, clearPlaylist, isInPlaylist, exportPlaylist } = usePlaylist();
  const { trending, isLoading: trendingLoading, error: trendingError } = useTrendingCharts();

  const handleSearch = useCallback((term: string, entity: string) => {
    setCurrentSearchTerm(term);
    search(term, entity);
  }, [search]);

  return (
    <div className="min-h-screen bg-background pb-32">
      <Header
        playlistCount={playlist.length}
        onOpenPlaylist={() => setIsPlaylistOpen(true)}
      />

      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section with Search */}
        <section className="text-center space-y-8 py-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Discover Your Next
              <span className="text-gradient block">Favorite Song</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Search millions of songs, preview tracks, and build your perfect playlist.
            </p>
          </div>
          
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </section>

        {/* Search Results */}
        {(results.length > 0 || isLoading || error) && (
          <section className="animate-fade-in">
            <SearchResults
              results={results}
              isLoading={isLoading}
              error={error}
              searchTerm={currentSearchTerm}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              onPlay={play}
              onAddToPlaylist={addToPlaylist}
              isInPlaylist={isInPlaylist}
            />
          </section>
        )}

        {/* Trending Section */}
        <section>
          <TrendingSection
            tracks={trending}
            isLoading={trendingLoading}
            error={trendingError}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onPlay={play}
            onAddToPlaylist={addToPlaylist}
            isInPlaylist={isInPlaylist}
          />
        </section>
      </main>

      {/* Player */}
      <Player
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        progress={progress}
        duration={duration}
        onTogglePlay={togglePlay}
        onSeek={seek}
      />

      {/* Playlist Sidebar */}
      <Playlist
        playlist={playlist}
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlay={play}
        onRemove={removeFromPlaylist}
        onClear={clearPlaylist}
        onExport={exportPlaylist}
        isOpen={isPlaylistOpen}
        onClose={() => setIsPlaylistOpen(false)}
      />
    </div>
  );
};

export default Index;
