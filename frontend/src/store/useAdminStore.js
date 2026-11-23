import { create } from "zustand";

export const useAdminStore = create((set) => ({
  activeTab: "overview",
  searchQuery: "",
  selectedFilter: "all",
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedFilter: (filter) => set({ selectedFilter: filter }),
}));
