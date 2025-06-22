import type { Highlight } from '../../types/highlight';

export type UploadState = {
  file: File | null;
  status: 'idle' | 'error' | 'ready' | 'streaming' | 'done';
  highlights: Highlight | null;
};

export type UploadActions = {
  setFile: (file: File) => void;
  setHighlights: (highlights: Highlight) => void;
  clear: () => void;
  sendFile: () => void;
};

export type UploadSlice = UploadState & UploadActions;
