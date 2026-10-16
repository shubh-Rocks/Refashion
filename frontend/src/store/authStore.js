import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isloading: true,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),
  setloading: (isloading) => set({ isloading }),

  logout: () => set({ user: null, isAuthenticated: false }),
}));
