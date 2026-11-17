import { create } from "zustand";

export const useUsersStore = create((set) => ({
  searchQuery: "",
  selectedRole: "all",
  selectedStatus: "all",
  currentPage: 1,

  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
  setSelectedRole: (role) => set({ selectedRole: role, currentPage: 1 }),
  setSelectedStatus: (status) =>
    set({ selectedStatus: status, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),
}));
