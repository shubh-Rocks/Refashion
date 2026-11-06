"use client";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AuthProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading, setUser, setLoading } =
    useAuthStore();

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

  useEffect(() => {
    if (pathname !== "/" || isLoading || !isAuthenticated || !user) return;

    router.replace(user.role === "ADMIN" ? "/admin" : "/user");
  }, [pathname, isLoading, isAuthenticated, user, router]);

  return children;
}


