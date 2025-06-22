import type { HistoryRegister } from '../types/historyRegister';
import type { Highlight } from '../types/highlight';

const ACCESS_KEY = 'history';

export const historyService = {
  getAll() {
    const rawRegisters = localStorage.getItem(ACCESS_KEY);
    if (!rawRegisters) return [] as HistoryRegister[];

    return JSON.parse(rawRegisters) as HistoryRegister[];
  },

  removeAll() {
    localStorage.removeItem(ACCESS_KEY);
  },

  add(fileName: string, success: boolean, highlight: Highlight | null) {
    const register: HistoryRegister = {
      fileName,
      success,
      highlight,
      date: Date.now(),
    };

    const current = this.getAll();
    current.push(register);
    localStorage.setItem(ACCESS_KEY, JSON.stringify(current));
  },

  remove(index: number) {
    const current = this.getAll();
    current.splice(index, 1);
    localStorage.setItem(ACCESS_KEY, JSON.stringify(current));

    return current;
  },
};
