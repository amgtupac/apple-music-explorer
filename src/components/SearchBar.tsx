import { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (term: string, entity: string) => void;
  isLoading: boolean;
}

export const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'song' | 'album' | 'musicArtist'>('song');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm, searchType);
    }
  }, [searchTerm, searchType, onSearch]);

  const handleClear = useCallback(() => {
    setSearchTerm('');
  }, []);

  const searchTypes = [
    { value: 'song', label: 'Songs' },
    { value: 'album', label: 'Albums' },
    { value: 'musicArtist', label: 'Artists' },
  ] as const;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for songs, albums, or artists..."
            className="pl-12 pr-12 h-14 text-lg bg-secondary border-0 rounded-2xl focus:ring-2 focus:ring-primary placeholder:text-muted-foreground/60"
          />
          {searchTerm && (
            <Button
              type="button"
              variant="ghost"
              size="iconSm"
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </form>

      <div className="flex items-center justify-center gap-2">
        {searchTypes.map((type) => (
          <Button
            key={type.value}
            variant={searchType === type.value ? 'coral' : 'ghost'}
            size="sm"
            onClick={() => setSearchType(type.value)}
            className="rounded-full px-4"
          >
            {type.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
