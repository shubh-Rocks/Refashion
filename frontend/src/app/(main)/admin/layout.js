"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import Sidebar from "@/components/main/admin/Sidebar";
import Header from "@/components/main/admin/dashboard/Header";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (user?.role !== "ADMIN") {
      router.replace("/dashboard");
    }
  }, [user, isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFBFA]">
        <p className="text-sm font-medium text-gray-500 animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-[#FBFBFA] overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-[#FBFBFA]">
          {children}
          <ReactQueryDevtools />
        </main>
      </div>
    </div>
  );
}
