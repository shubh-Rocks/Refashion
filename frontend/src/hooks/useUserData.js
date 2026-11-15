import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";

export const useUsersData = (filters) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["adminUsers", filters],
    queryFn: () =>
      adminService.getUsers(filters.currentPage, filters.limit, filters),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 1,
    gcTime: 1000 * 60 * 10,
  });

  const toggleBlockMutation = useMutation({
    mutationFn: async ({ id, isBlocked }) => {
      if (isBlocked) {
        return await adminService.unBlockUser(id);
      } else {
        return await adminService.blockUser(id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    },
  });

  return { ...query, toggleBlockMutation };
};
