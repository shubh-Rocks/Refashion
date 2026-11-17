import { Search, ChevronDown } from "lucide-react";
import { useUsersStore } from "@/store/useUsersStore";
import { useEffect, useState } from "react";

export default function FilterBar() {
  const {
    searchQuery,
    setSearchQuery,
    selectedRole,
    setSelectedRole,
    selectedStatus,
    setSelectedStatus,
  } = useUsersStore();

  const [text, setText] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(text);
    }, 400);

    return () => clearTimeout(timer);
  }, [text, setSearchQuery]);

  return (
    <div className="p-6 border-b border-gray-200 space-y-4 bg-white">
      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search name or email"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
        />
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Role Dropdown */}
        <div className="relative">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 px-4 text-sm text-gray-700 outline-none focus:border-emerald-700"
          >
            <option value="all">All role</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          <ChevronDown className="absolute right-3.5 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Status Dropdown */}
        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 px-4 text-sm text-gray-700 outline-none focus:border-emerald-700"
          >
            <option value="all">All status</option>
            <option value="Active">Active</option>
            <option value="Blocked">Blocked</option>
          </select>
          <ChevronDown className="absolute right-3.5 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
