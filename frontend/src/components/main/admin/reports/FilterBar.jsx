import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useReportsStore } from "@/store/useReportsStore";
import { useEffect, useState } from "react";

export default function FilterBar() {
  const {
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    sortOrder,
    setSortOrder,
  } = useReportsStore();
  const [text, setText] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(text);
    }, 400);

    return () => clearTimeout(timer);
  }, [text, setSearchQuery]);

  return (
    <div className="p-6 border-b border-gray-200 space-y-4 bg-white">
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search items or people"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 px-4 text-sm text-gray-700 outline-none focus:border-emerald-700"
          >
            <option value="all">All status</option>
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
            <option value="Dismissed">Dismissed</option>
          </select>
          <ChevronDown className="absolute right-3.5 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>

        <button
          onClick={() =>
            setSortOrder(sortOrder === "Newest" ? "Oldest" : "Newest")
          }
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 self-end sm:self-auto"
        >
          <SlidersHorizontal className="h-4 w-4 text-gray-500" />
          <span>{sortOrder}</span>
        </button>
      </div>
    </div>
  );
}
