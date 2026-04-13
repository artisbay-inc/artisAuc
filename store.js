import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      user: null,
      bids: [],
      membership: false,
      favorites: [],
      comparisonList: [],

      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
      addBid: (bid) => set((state) => ({ bids: [...state.bids, bid] })),
      updateBid: (lotId, updates) => set((state) => ({
        bids: state.bids.map(b => b.lotId === lotId ? { ...b, ...updates } : b)
      })),
      deleteBid: (lotId) => set((state) => ({
        bids: state.bids.filter(b => b.lotId !== lotId)
      })),
      setMembership: (value) => set({ membership: value }),
      
      toggleFavorite: (lotId) => set((state) => ({
        favorites: state.favorites.includes(lotId)
          ? state.favorites.filter(id => id !== lotId)
          : [...state.favorites, lotId]
      })),
      
      addToComparison: (lot) => set((state) => {
        if (state.comparisonList.find(item => item.lotId === lot.lotId)) return state;
        if (state.comparisonList.length >= 4) return state; // Limit to 4 items
        return { comparisonList: [...state.comparisonList, lot] };
      }),
      
      removeFromComparison: (lotId) => set((state) => ({
        comparisonList: state.comparisonList.filter(item => item.lotId !== lotId)
      })),
      
      clearComparison: () => set({ comparisonList: [] }),
    }),
    {
      name: 'artisauc-storage',
    }
  )
);

export default useStore;

