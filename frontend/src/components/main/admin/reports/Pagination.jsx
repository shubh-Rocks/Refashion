import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReportsStore } from "@/store/useReportsStore";

export default function Pagination({ paginationData }) {
  const { currentPage, setCurrentPage } = useReportsStore();
  const totalPages = paginationData?.totalPages || 1;
  const totalRecords = paginationData?.total || 5;

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-white text-xs text-gray-500">
      <span>
        Showing 1 {Math.min(5, totalRecords)} of {totalRecords}
      </span>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        </button>
        <span className="font-medium text-gray-800">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage >= totalPages}
          className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronRight className="h-4 w-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
