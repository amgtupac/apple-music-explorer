import { TrendingUp, Loader2 } from 'lucide-react';
import { Track } from '@/types/music';
import { TrackCard } from './TrackCard';

interface TrendingSectionProps {
  tracks: Track[];
  isLoading: boolean;
  error: string | null;
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlay: (track: Track) => void;
  onAddToPlaylist: (track: Track) => void;
  isInPlaylist: (trackId: number) => boolean;
}

export const TrendingSection = ({
  tracks,
  isLoading,
  error,
  currentTrack,
  isPlaying,
  onPlay,
  onAddToPlaylist,
  isInPlaylist,
}: TrendingSectionProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading trending tracks...</p>
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

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Trending Now</h2>
          <p className="text-muted-foreground">Top songs from popular artists</p>
        </div>
      </div>

      <div className="space-y-1">
        {tracks.map((track, index) => (
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
