"use client";

import { useAdminData } from "@/hooks/useAdminData";
import { useAdminStore } from "@/store/useAdminStore";
import WelcomeBanner from "@/components/main/admin/dashboard/WelcomeBanner";
import MetricCards from "@/components/main/admin/dashboard/MetricCards";
import PendingItems from "@/components/main/admin/dashboard/PendingItems";
import CommunityReports from "@/components/main/admin/dashboard/CommunityReports";
import AuditTrail from "@/components/main/admin/dashboard/AuditTrail";
import { useAuthStore } from "@/store/authStore";

export default function AdminDashboardPage() {
  const { data, isLoading, reviewMutation } = useAdminData();
  const { setSelectedFilter } = useAdminStore();

  const handleReview = (id, action) => {
    reviewMutation.mutate({ id, action });
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center p-12">
        <div className="text-sm font-medium text-gray-500 animate-pulse">
          Loading admin dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#FBFBFA]">
      <div className="mx-auto max-w-7xl px-8 py-8">
        <WelcomeBanner />

        <MetricCards metrics={data?.metrics} />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <PendingItems items={data?.pendingItems} onReview={handleReview} />
          <CommunityReports reports={data?.reports} />
        </div>

        <AuditTrail activity={data?.activity} />
      </div>
    </div>
  );
}
