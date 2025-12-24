import { Play, Pause, Plus, Check, Heart } from 'lucide-react';
import { Track } from '@/types/music';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TrackCardProps {
  track: Track;
  index?: number;
  isPlaying: boolean;
  isCurrentTrack: boolean;
  isInPlaylist: boolean;
  onPlay: () => void;
  onAddToPlaylist: () => void;
  showIndex?: boolean;
}

export const TrackCard = ({
  track,
  index,
  isPlaying,
  isCurrentTrack,
  isInPlaylist,
  onPlay,
  onAddToPlaylist,
  showIndex = false,
}: TrackCardProps) => {
  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getHighResArtwork = (url: string) => {
    return url.replace('100x100', '400x400');
  };

  return (
    <div
      className={cn(
        "group flex items-center gap-4 p-3 rounded-xl transition-all duration-200",
        "hover:bg-secondary/60",
        isCurrentTrack && "bg-secondary"
      )}
    >
      {showIndex && (
        <span className="w-6 text-center text-muted-foreground font-medium">
          {index}
        </span>
      )}

      <div className="relative flex-shrink-0">
        <img
          src={getHighResArtwork(track.artworkUrl100)}
          alt={track.collectionName}
          className="w-14 h-14 rounded-lg object-cover shadow-lg"
        />
        <Button
          variant="coral"
          size="iconSm"
          onClick={onPlay}
          className={cn(
            "absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity",
            isCurrentTrack && isPlaying && "opacity-100"
          )}
        >
          {isCurrentTrack && isPlaying ? (
            <Pause className="h-4 w-4 fill-current" />
          ) : (
            <Play className="h-4 w-4 fill-current ml-0.5" />
          )}
        </Button>
      </div>

      <div className="flex-1 min-w-0">
        <h4 className={cn(
          "font-medium truncate transition-colors",
          isCurrentTrack && "text-primary"
        )}>
          {track.trackName}
        </h4>
        <p className="text-sm text-muted-foreground truncate">
          {track.artistName} • {track.collectionName}
        </p>
      </div>

      <div className="hidden sm:block text-sm text-muted-foreground">
        {track.primaryGenreName}
      </div>

      <div className="text-sm text-muted-foreground tabular-nums">
        {formatDuration(track.trackTimeMillis)}
      </div>

      <Button
        variant="ghost"
        size="iconSm"
        onClick={onAddToPlaylist}
        className={cn(
          "transition-all",
          isInPlaylist ? "text-primary" : "text-muted-foreground hover:text-foreground"
        )}
      >
        {isInPlaylist ? (
          <Check className="h-4 w-4" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};
