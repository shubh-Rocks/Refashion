"use client";

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

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Pending Items", icon: FileText, badge: 6 },
  { name: "All Items", icon: Users },
  { name: "Users", icon: Users },
  { name: "Reports", icon: BarChart3 },
  { name: "Swaps", icon: ArrowRightLeft },
  { name: "Settings", icon: Settings },
];

export default function Sidebar() {
  const { activeTab, setActiveTab, isSidebarOpen, toggleSidebar } =
    useAdminStore();

  return (
    <aside
      className={`bg-[#2d694f] text-white flex flex-col justify-between p-6 select-none h-screen transition-all duration-300 relative ${
        isSidebarOpen ? "w-64" : "w-24 items-center"
      }`}
    >
      <div>
        {/* Top Header & Toggle Button */}
        <div
          className={`flex items-center ${isSidebarOpen ? "justify-between" : "justify-center"} mb-10`}
        >
          {isSidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#82C91E] flex items-center justify-center text-[#14452F]">
                <Leaf size={18} />
              </div>
              <span className="text-xl font-bold tracking-wider">
                REWEAR{" "}
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

        {/* Navigation Links */}
        <nav className="space-y-2 w-full">
          {navItems.main
            ? null
            : navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.name;

                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveTab(item.name)}
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
                  </button>
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
        <button
          className={`flex items-center gap-2 text-sm text-emerald-100 hover:text-white transition-colors ${!isSidebarOpen && "justify-center w-full"}`}
          title="Back to storefront"
        >
          <LogOut size={16} className="flex-shrink-0" />
          {isSidebarOpen && <span>Back to storefront</span>}
        </button>
      </div>
    </aside>
  );
}
