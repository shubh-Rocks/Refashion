import { create } from "zustand";

export const usePendingItemsStore = create((set) => ({
  searchQuery: "",
  selectedCategory: "all",
  selectedCondition: "all",
  startDate: "",
  endDate: "",
  sortOrder: "Newest",
  currentPage: 1,
  selectedItems: [],

  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
  setSelectedCategory: (category) =>
    set({ selectedCategory: category, currentPage: 1 }),
  setSelectedCondition: (condition) =>
    set({ selectedCondition: condition, currentPage: 1 }),
  setDateRange: (start, end) =>
    set({ startDate: start, endDate: end, currentPage: 1 }),
  setSortOrder: (sort) => set({ sortOrder: sort }),
  setCurrentPage: (page) => set({ currentPage: page }),

  toggleSelectItem: (id) =>
    set((state) => ({
      selectedItems: state.selectedItems.includes(id)
        ? state.selectedItems.filter((item) => item !== id)
        : [...state.selectedItems, id],
    })),

  toggleSelectAll: (allIds) =>
    set((state) => ({
      selectedItems: state.selectedItems.length === allIds.length ? [] : allIds,
    })),

  clearSelection: () => set({ selectedItems: [] }),
}));
