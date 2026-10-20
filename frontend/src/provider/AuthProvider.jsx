"use client";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

export default function AuthProvider({ children }) {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        const res = await authService.getme();
        setUser(res.data.user ?? null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [setUser, setLoading]);
  return children;
}
