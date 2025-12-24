import { Music, Trash2, Download, X } from 'lucide-react';
import { PlaylistTrack, Track } from '@/types/music';
import { Button } from '@/components/ui/button';
import { TrackCard } from './TrackCard';
import { cn } from '@/lib/utils';

interface PlaylistProps {
  playlist: PlaylistTrack[];
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlay: (track: Track) => void;
  onRemove: (trackId: number) => void;
  onClear: () => void;
  onExport: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Playlist = ({
  playlist,
  currentTrack,
  isPlaying,
  onPlay,
  onRemove,
  onClear,
  onExport,
  isOpen,
  onClose,
}: PlaylistProps) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 right-0 bottom-24 w-full max-w-md bg-card border-l border-border z-50",
          "transform transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Music className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold">My Playlist</h2>
                <p className="text-sm text-muted-foreground">
                  {playlist.length} {playlist.length === 1 ? 'song' : 'songs'}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {playlist.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="p-4 rounded-full bg-muted mb-4">
                  <Music className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-1">Your playlist is empty</h3>
                <p className="text-sm text-muted-foreground">
                  Add songs from search results or trending charts
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {playlist.map((track, index) => (
                  <div key={track.id} className="group relative">
                    <TrackCard
                      track={track}
                      index={index + 1}
                      isPlaying={isPlaying}
                      isCurrentTrack={currentTrack?.id === track.id}
                      isInPlaylist={true}
                      onPlay={() => onPlay(track)}
                      onAddToPlaylist={() => onRemove(track.id)}
                      showIndex={true}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {playlist.length > 0 && (
            <div className="p-4 border-t border-border flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={onClear}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
              <Button
                variant="coral"
                className="flex-1"
                onClick={onExport}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
