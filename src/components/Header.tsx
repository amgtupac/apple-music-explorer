import { Music, ListMusic } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  playlistCount: number;
  onOpenPlaylist: () => void;
}

export const Header = ({ playlistCount, onOpenPlaylist }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-30 glass border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary glow-coral">
            <Music className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold">
              <span className="text-gradient">Music</span> MVP
            </h1>
          </div>
        </div>

        <Button
          variant="glass"
          onClick={onOpenPlaylist}
          className="relative"
        >
          <ListMusic className="h-5 w-5 mr-2" />
          My Playlist
          {playlistCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
              {playlistCount}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
};
