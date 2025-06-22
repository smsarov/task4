import type { UploadState, UploadSlice } from './types';

import { uploadService } from '../../services/uploadService';
import { historyService } from '../../services/historyService';

import { aggregate } from '../../api/server/aggregate';
import type { Highlight } from '../../types/highlight';

const initialState: UploadState = {
  file: null,
  status: 'idle',
  highlights: null,
};

export const createUploadSlice = (
  set: (fn: (state: UploadSlice) => UploadSlice) => void,
): UploadSlice => ({
  ...initialState,
  setFile: file =>
    set(state => {
      const verified = uploadService.verify(file);
      if (!verified) return { ...state, file, status: 'error' };
      return { ...state, file, status: 'ready' };
    }),
  setHighlights: (highlights: Highlight) =>
    set(state => {
      return { ...state, highlights };
    }),
  clear: () =>
    set(state => {
      return { ...state, ...initialState };
    }),
  sendFile: () =>
    set(state => {
      if (!state.file) return { ...state, status: 'error' };
      let lastValidHighlight: Highlight | null = null;
      aggregate({
        file: state.file,
        rows: 10000,
        onChunk: chunk => {
          try {
            const parsed = uploadService.parseChunk(chunk);
            lastValidHighlight = parsed;
            set(s => ({ ...s, highlights: parsed }));
          } catch (e) {
            // Ignore invalid partial chunks for progress
          }
        },
        onFinish: () =>
          set(s => {
            if (lastValidHighlight) {
              historyService.add(state.file!.name, true, lastValidHighlight);
              return { ...s, highlights: lastValidHighlight, status: 'done' };
            } else {
              historyService.add(state.file!.name, false, null);
              return { ...s, status: 'error' };
            }
          }),
        onError: () =>
          set(s => {
            historyService.add(state.file!.name, false, null);
            return { ...s, status: 'error' };
          }),
      });
      return { ...state, status: 'streaming' };
    }),
});

export type { UploadSlice };
