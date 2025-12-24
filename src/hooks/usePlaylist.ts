import { useState, useCallback } from 'react';
import { Track, PlaylistTrack } from '@/types/music';
import { toast } from '@/hooks/use-toast';

export const usePlaylist = () => {
  const [playlist, setPlaylist] = useState<PlaylistTrack[]>([]);

  const addToPlaylist = useCallback((track: Track) => {
    setPlaylist(prev => {
      const exists = prev.some(t => t.id === track.id);
      if (exists) {
        toast({
          title: "Already in playlist",
          description: `"${track.trackName}" is already in your playlist.`,
        });
        return prev;
      }
      
      toast({
        title: "Added to playlist",
        description: `"${track.trackName}" has been added to your playlist.`,
      });
      
      return [...prev, { ...track, addedAt: new Date() }];
    });
  }, []);

  const removeFromPlaylist = useCallback((trackId: number) => {
    setPlaylist(prev => {
      const track = prev.find(t => t.id === trackId);
      if (track) {
        toast({
          title: "Removed from playlist",
          description: `"${track.trackName}" has been removed from your playlist.`,
        });
      }
      return prev.filter(t => t.id !== trackId);
    });
  }, []);

  const clearPlaylist = useCallback(() => {
    setPlaylist([]);
    toast({
      title: "Playlist cleared",
      description: "All songs have been removed from your playlist.",
    });
  }, []);

  const isInPlaylist = useCallback((trackId: number) => {
    return playlist.some(t => t.id === trackId);
  }, [playlist]);

  const exportPlaylist = useCallback(() => {
    const data = playlist.map(t => ({
      name: t.trackName,
      artist: t.artistName,
      album: t.collectionName,
      genre: t.primaryGenreName,
    }));
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-playlist.json';
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Playlist exported",
      description: "Your playlist has been downloaded as JSON.",
    });
  }, [playlist]);

  return {
    playlist,
    addToPlaylist,
    removeFromPlaylist,
    clearPlaylist,
    isInPlaylist,
    exportPlaylist,
  };
};
