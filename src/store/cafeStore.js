import { create } from 'zustand';

export const useCafeStore = create((set) => ({
  cafeName: 'Smart Cafe', // Default name
  setCafeName: (name) => set({ cafeName: name }),
}));
