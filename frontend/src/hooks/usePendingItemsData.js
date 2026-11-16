import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";

export const usePendingItemsData = (filters) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["adminPendingItems", filters],
    queryFn: () =>
      adminService.getPendingItems({
        page: filters.currentPage,
        limit: 10,
        category: filters.selectedCategory,
        condition: filters.selectedCondition,
        search: filters.searchQuery,
        sort: filters.sortOrder,
        startDate: filters.startDate,
        endDate: filters.endDate,
      }),
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 10,
  });

  const approveMutation = useMutation({
    mutationFn: (id) => adminService.approveItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminPendingItems"] });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id) => adminService.rejectItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminPendingItems"] });
    },
  });

  const reviewMutation = useMutation({
    mutationFn: ({ id, action }) => {
      if (action === "approve") return adminService.approveItem(id);
      return adminService.rejectItem(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminPendingItems"] });
    },
  });

  return {
    ...query,
    approveItem: approveMutation.mutate,
    rejectItem: rejectMutation.mutate,
    reviewMutation,
    isActionLoading:
      approveMutation.isPending ||
      rejectMutation.isPending ||
      reviewMutation.isPending,
  };
};
