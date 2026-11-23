import { create } from "zustand";

export const useReportsStore = create((set) => ({
  searchQuery: "",
  selectedStatus: "all",
  sortOrder: "Newest",
  currentPage: 1,
  limit: 5,

  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
  setSelectedStatus: (status) =>
    set({ selectedStatus: status, currentPage: 1 }),
  setSortOrder: (sort) => set({ sortOrder: sort }),
  setCurrentPage: (page) => set({ currentPage: page }),
}));
