import { Search, Loader2 } from 'lucide-react';
import { Track } from '@/types/music';
import { TrackCard } from './TrackCard';

interface SearchResultsProps {
  results: Track[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlay: (track: Track) => void;
  onAddToPlaylist: (track: Track) => void;
  isInPlaylist: (trackId: number) => boolean;
}

export const SearchResults = ({
  results,
  isLoading,
  error,
  searchTerm,
  currentTrack,
  isPlaying,
  onPlay,
  onAddToPlaylist,
  isInPlaylist,
}: SearchResultsProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Searching for "{searchTerm}"...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  if (results.length === 0 && searchTerm) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="p-4 rounded-full bg-muted mb-4">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-medium mb-1">No results found</h3>
        <p className="text-sm text-muted-foreground">
          Try searching for a different term
        </p>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Search className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Search Results</h2>
          <p className="text-muted-foreground">
            {results.length} results for "{searchTerm}"
          </p>
        </div>
      </div>

      <div className="space-y-1">
        {results.map((track, index) => (
          <TrackCard
            key={track.id}
            track={track}
            index={index + 1}
            isPlaying={isPlaying}
            isCurrentTrack={currentTrack?.id === track.id}
            isInPlaylist={isInPlaylist(track.id)}
            onPlay={() => onPlay(track)}
            onAddToPlaylist={() => onAddToPlaylist(track)}
            showIndex={true}
          />
        ))}
      </div>
    </div>
  );
};
