"use client";

import { usePendingItemsStore } from "@/store/usePendingItemsStore";
import { usePendingItemsData } from "@/hooks/usePendingItemsData";
import FilterBar from "@/components/main/admin/pending/FilterBar";
import PendingTable from "@/components/main/admin/pending/PendingTable";
import Pagination from "@/components/main/admin/pending/Pagination";
import Header from "@/components/main/admin/pending/Header";
import TopProgress from "@/components/main/admin/TopProgress";

export default function PendingItemsPage() {
  const {
    searchQuery,
    selectedCategory,
    selectedCondition,
    startDate,
    endDate,
    sortOrder,
    currentPage,
  } = usePendingItemsStore();

  const { data, isLoading, reviewMutation } = usePendingItemsData({
    searchQuery,
    selectedCategory,
    selectedCondition,
    startDate,
    endDate,
    sortOrder,
    currentPage,
  });

  const handleReview = (id, action) => {
    reviewMutation.mutate({ id, action });
  };

  return (
    <div className="p-8 relative">
      <TopProgress />
      <div className="mx-auto max-w-7xl">
        <Header />

        <div className="rounded-xl border border-gray-200 bg-white shadow-xs overflow-hidden">
          {/* Card Header Info */}
          <div className="px-6 pt-6 pb-2">
            <h2 className="text-lg font-bold text-gray-900">Approval queue</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {data?.total || data?.count || 0} results · Approval Queue
            </p>
          </div>

          <FilterBar />

          <PendingTable items={data?.items || []} onReview={handleReview} />
          <Pagination paginationData={data?.pagination} />
        </div>
      </div>
    </div>
  );
}
