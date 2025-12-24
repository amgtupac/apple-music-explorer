import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Track } from '@/types/music';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface PlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
}

export const Player = ({
  currentTrack,
  isPlaying,
  progress,
  duration,
  onTogglePlay,
  onSeek,
}: PlayerProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getHighResArtwork = (url: string) => {
    return url.replace('100x100', '400x400');
  };

  if (!currentTrack) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-24 glass border-t border-border/50 flex items-center justify-center">
        <p className="text-muted-foreground">Select a song to start playing</p>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 glass border-t border-border/50 animate-slide-up">
      {/* Progress bar - thin line at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-100"
          style={{ width: `${(progress / duration) * 100}%` }}
        />
      </div>

      <div className="container mx-auto px-4 h-24 flex items-center gap-4">
        {/* Track Info */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="relative">
            <img
              src={getHighResArtwork(currentTrack.artworkUrl100)}
              alt={currentTrack.collectionName}
              className={cn(
                "w-16 h-16 rounded-lg object-cover shadow-lg",
                isPlaying && "animate-pulse-slow"
              )}
            />
            {isPlaying && (
              <div className="absolute inset-0 rounded-lg bg-primary/20 animate-pulse" />
            )}
          </div>
          <div className="min-w-0">
            <h4 className="font-semibold truncate">{currentTrack.trackName}</h4>
            <p className="text-sm text-muted-foreground truncate">
              {currentTrack.artistName}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button
              variant="coral"
              size="iconLg"
              onClick={onTogglePlay}
              className="rounded-full"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6 fill-current" />
              ) : (
                <Play className="h-6 w-6 fill-current ml-1" />
              )}
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>

          {/* Progress with time */}
          <div className="flex items-center gap-3 w-full max-w-md">
            <span className="text-xs text-muted-foreground tabular-nums w-10 text-right">
              {formatTime(progress)}
            </span>
            <Slider
              value={[progress]}
              max={duration || 30}
              step={0.1}
              onValueChange={(value) => onSeek(value[0])}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground tabular-nums w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume - hidden on mobile */}
        <div className="hidden md:flex items-center gap-2 flex-1 justify-end">
          <Volume2 className="h-5 w-5 text-muted-foreground" />
          <Slider
            defaultValue={[80]}
            max={100}
            step={1}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
};
