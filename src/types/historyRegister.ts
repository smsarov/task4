import type { Highlight } from './highlight';

export type HistoryRegister = {
  fileName: string;
  date: number;
  success: boolean;
  highlight: Highlight | null;
};
