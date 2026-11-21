import { useAuthStore } from "@/store/authStore";
import { Bell } from "lucide-react";

export default function Header() {
  const { user } = useAuthStore();
  const getinitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split("");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  };
  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4">
      <div>
        <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
          Admin Workspace
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-white"></span>
        </button>
        <div className="flex items-center space-x-3 border-l border-gray-200 pl-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-700 font-medium text-white text-sm">
            {getinitials(
              user?.fullname || user?.name || user?.username || "Guest User",
            )}
          </div>
          <div className="hidden text-left md:block">
            <p className="text-sm font-semibold text-gray-900">
              {user?.fullname || user?.name || user?.username || "Guest User"}
            </p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}
