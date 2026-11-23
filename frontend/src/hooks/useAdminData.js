"use client";

import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";

export const ADMIN_QUERY_KEYS = {
  usersStats: ["admin", "users", "stats"],
  pendingItems: ["admin", "pending-items"],
  blockUsers: ["admin", "block-users"],
  dashboard: ["admin", "dashboard"],
};

export function useAdminData() {
  const dashboardQuery = useQuery({
    queryKey: ADMIN_QUERY_KEYS.dashboard,
    queryFn: async () => {
      const [usersRes, pendingRes, pendingRep] = await Promise.all([
        adminService.getUsers({
          page: 1,
          limit: 1,
          search: "",
          status: "all",
        }),
        adminService.getPendingItems({ page: 1, limit: 5 }),
        adminService.getReports({ page: 1, limit: 5 }),
      ]);

      const totalUsers =
        usersRes?.pagination?.total ?? usersRes?.data?.pagination?.total ?? 0;

      const blockUsers =
        usersRes?.totalBlockUser ?? usersRes?.data?.totalBlockUser ?? 0;

      const pendingList =
        pendingRes?.items ??
        pendingRes?.data?.items ??
        (Array.isArray(pendingRes) ? pendingRes : []);

      const pendingCount =
        pendingRes?.pagination?.total ??
        pendingRes?.data?.pagination?.total ??
        pendingList.length ??
        0;

      const pendingReport =
        pendingRep?.reports ??
        pendingRep?.data?.reports ??
        (Array.isArray(pendingRep) ? pendingRep : []);

      return {
        totalUsers,
        pendingCount,
        blockUsers,
        pendingItems: pendingList,
        reports: pendingReport,
      };
    },
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 10,
    retry: 1,
  });

  return {
    data: dashboardQuery.data,
    totalUsers: dashboardQuery.data?.totalUsers ?? 0,
    blockUsers: dashboardQuery.data?.blockUsers ?? 0,
    pendingCount: dashboardQuery.data?.pendingCount ?? 0,
    isLoading: dashboardQuery.isLoading,
    isError: dashboardQuery.isError,
    error: dashboardQuery.error,
  };
}
