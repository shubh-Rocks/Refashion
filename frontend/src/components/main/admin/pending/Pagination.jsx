import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePendingItemsStore } from "@/store/usePendingItemsStore";

export default function Pagination({ pagination }) {
  const { currentPage, setCurrentPage } = usePendingItemsStore();

  const totalPages = pagination?.totalPages || 1;
  const totalItems = pagination?.total || 0;
  const limit = pagination?.limit || 10;

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalItems);

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-white text-xs text-gray-500">
      <span>
        Showing {startItem}-{endItem} of {totalItems}
      </span>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1 || totalItems === 0}
          className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        </button>

        <span className="font-medium text-gray-800">
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage >= totalPages || totalItems === 0}
          className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <ChevronRight className="h-4 w-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
