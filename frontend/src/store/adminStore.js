import { create } from "zustand";

export const useAdminStore = create((set) => ({
  activeTab: "Dashboard",
  setActiveTab: (tab) => set({ activeTab: tab }),

  isSidebarOpen: true,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  previewMode: false,
  togglePreviewMode: () =>
    set((state) => ({ previewMode: !state.previewMode })),
}));
