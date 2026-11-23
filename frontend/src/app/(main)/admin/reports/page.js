"use client";

import Header from "@/components/main/admin/reports/Header";
import FilterBar from "@/components/main/admin/reports/FilterBar";
import ReportsTable from "@/components/main/admin/reports/ReportsTable";
import Pagination from "@/components/main/admin/reports/Pagination";
import { useReportsData } from "@/hooks/userReportsData";
import { useReportsStore } from "@/store/useReportsStore";

export default function ReportsAdminPage() {
  const { searchQuery, selectedStatus, sortOrder, currentPage, limit } =
    useReportsStore();

  const { data, isLoading, isFetching, reportActionMutation } = useReportsData({
    searchQuery,
    selectedStatus,
    sortOrder,
    currentPage,
    limit,
  });

  const handleReportAction = (id, action) => {
    reportActionMutation.mutate({ id, action });
  };

  return (
    <div className="p-8">
      <div className="mx-auto max-w-7xl">
        <Header />

        <div className="rounded-xl border border-gray-200 bg-white shadow-xs overflow-hidden">
          <div className="px-6 pt-6 pb-2 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Reports</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {data?.pagination?.total ?? 0} results
              </p>
            </div>
            {isFetching && (
              <span className="text-xs text-gray-400">Updating...</span>
            )}
          </div>

          <FilterBar />

          {isLoading ? (
            <div className="p-12 text-center text-sm font-medium text-gray-500 animate-pulse">
              Loading reports...
            </div>
          ) : (
            <>
              <ReportsTable
                reports={data?.reports}
                onReportAction={handleReportAction}
              />
              <Pagination paginationData={data?.pagination} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
