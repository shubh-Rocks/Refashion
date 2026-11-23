import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";

export const useReportsData = (filters) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["adminReports", filters],
    queryFn: () =>
      adminService.getReports({
        page: filters.CurrentPage,
        limit: 10,
        search: filters.searchQuery,
        sort: filters.sortOrder,
        startDate: filters.startDate,
        endDate: filters.endDate,
      }),
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 5,
  });

  const reportActionMutation = useMutation({
    mutationFn: async ({ id, action }) => {
      if (action === "resolve") {
        return await adminService.resolveReport(id);
      } else {
        return await adminService.dismissReport(id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminReports"] });
    },
  });

  return { ...query, reportActionMutation };
};
