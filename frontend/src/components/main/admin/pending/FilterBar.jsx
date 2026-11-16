import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { usePendingItemsStore } from "@/store/usePendingItemsStore";

export default function FilterBar() {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedCondition,
    setSelectedCondition,
    startDate,
    endDate,
    setDateRange,
    sortOrder,
    setSortOrder,
  } = usePendingItemsStore();

  return (
    <div className="p-6 border-b border-gray-200 space-y-4 bg-white">
      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search items or people"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
        />
      </div>

      {/* Filter Dropdowns & Date Range */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Category Dropdown */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 px-4 text-sm text-gray-700 outline-none focus:border-emerald-700"
          >
            <option value="all">All category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Bottoms">Bottoms</option>
            <option value="Outerwear">Outerwear</option>
            <option value="Accessories">Accessories</option>
            <option value="Knitwear">Knitwear</option>
          </select>
          <ChevronDown className="absolute right-3.5 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Condition Dropdown */}
        <div className="relative">
          <select
            value={selectedCondition}
            onChange={(e) => setSelectedCondition(e.target.value)}
            className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 px-4 text-sm text-gray-700 outline-none focus:border-emerald-700"
          >
            <option value="all">All condition</option>
            <option value="Like new">Like new</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
          </select>
          <ChevronDown className="absolute right-3.5 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Date Inputs & Sort */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="date"
              placeholder="dd-mm-yyyy"
              value={startDate}
              onChange={(e) => setDateRange(e.target.value, endDate)}
              className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-1 pr-1 text-sm text-gray-700 outline-none focus:border-emerald-700"
            />
          </div>
          <span className="text-gray-400 text-xs">to</span>
          <div className="relative flex-1">
            <input
              type="date"
              placeholder="dd-mm-yyyy"
              value={endDate}
              onChange={(e) => setDateRange(startDate, e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-1 pr-1 text-sm text-gray-700 outline-none focus:border-emerald-700"
            />
          </div>

          <button
            onClick={() =>
              setSortOrder(sortOrder === "Newest" ? "Oldest" : "Newest")
            }
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 shrink-0"
          >
            <SlidersHorizontal className="h-4 w-4 text-gray-500" />
            <span>{sortOrder}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
