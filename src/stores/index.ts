import type { UploadSlice } from './uploadSlice';
import { createUploadSlice } from './uploadSlice';
import { create } from 'zustand';

export type StoreState = UploadSlice;

export const useStore = create<StoreState>(set => ({
  ...createUploadSlice(set),
}));
