"use client";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart3,
  ArrowRightLeft,
  Settings,
  LogOut,
  Leaf,
  Menu,
  ChevronLeft,
} from "lucide-react";
import { useAdminStore } from "@/store/adminStore";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  {
    name: "Pending Items",
    icon: FileText,
    badge: 6,
    path: "/admin/pendingItems",
  },
  { name: "Users", icon: Users, path: "/admin/users" },
  { name: "Reports", icon: BarChart3, path: "/admin/reports" },
  { name: "Swaps", icon: ArrowRightLeft, path: "/admin/swaps" },
  { name: "Settings", icon: Settings, path: "/admin/settings" },
];

export default function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useAdminStore();
  const pathname = usePathname;

  return (
    <aside
      className={`bg-[#2d694f] text-white flex flex-col justify-between p-3 select-none h-screen transition-all duration-300 relative ${
        isSidebarOpen ? "w-64" : "w-24 items-center"
      }`}
    >
      <div>
        {/* Top Header & Toggle Button */}
        <div
          className={`flex items-center ${isSidebarOpen ? "justify-between" : "justify-center"} mb-10`}
        >
          {isSidebarOpen && (
            <div className="flex items-center">
              <Image
                src="/logo2.png"
                alt="Company Logo"
                width={70}
                height={50}
              />
              <span className="font-bold">
                Refashion
                <span className="text-xs font-normal text-emerald-300">
                  / ADMIN
                </span>
              </span>
            </div>
          )}

          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg bg-[#1C5B3F] hover:bg-[#236E4D] text-emerald-200 transition"
            title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Workspace Label */}
        {isSidebarOpen && (
          <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-4">
            Workspace
          </p>
        )}

        <nav className="space-y-2 w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.name}
                href={item.path}
                title={!isSidebarOpen ? item.name : ""}
                className={`w-full flex items-center ${isSidebarOpen ? "justify-between px-4" : "justify-center px-0"} py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#C5E063] text-[#14452F] font-semibold"
                    : "text-emerald-100 hover:bg-[#1C5B3F]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className="flex-shrink-0" />
                  {isSidebarOpen && <span>{item.name}</span>}
                </div>
                {isSidebarOpen && item.badge && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      isActive
                        ? "bg-[#14452F] text-white"
                        : "bg-[#1C5B3F] text-emerald-200"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div
        className={`border-t border-emerald-800/60 pt-6 space-y-4 w-full ${!isSidebarOpen && "text-center"}`}
      >
        {isSidebarOpen && (
          <div className="text-xs text-emerald-300/80 space-y-1">
            <p>Clothes in circulation.</p>
            <p>Community in good hands.</p>
          </div>
        )}
        {/* 4. Back to Storefront Link */}
        <Link
          href="/"
          className={`flex items-center gap-2 text-sm text-emerald-100 hover:text-white transition-colors ${!isSidebarOpen && "justify-center w-full"}`}
          title="Back to storefront"
        >
          <LogOut size={16} className="flex-shrink-0" />
          {isSidebarOpen && <span>Back to storefront</span>}
        </Link>
      </div>
    </aside>
  );
}
