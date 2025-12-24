export interface Track {
  id: number;
  trackName: string;
  artistName: string;
  collectionName: string;
  artworkUrl100: string;
  artworkUrl60: string;
  previewUrl: string;
  releaseDate: string;
  primaryGenreName: string;
  trackTimeMillis: number;
  collectionId: number;
}

export interface SearchResult {
  resultCount: number;
  results: Track[];
}

export interface PlaylistTrack extends Track {
  addedAt: Date;
}
