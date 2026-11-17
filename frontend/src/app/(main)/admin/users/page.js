"use client";

import Header from "@/components/main/admin/users/Header";
import FilterBar from "@/components/main/admin/users/FilterBar";
import UsersTable from "@/components/main/admin/users/UserTable";
import Pagination from "@/components/main/admin/users/Pagination";
import { useUsersData } from "@/hooks/useUserData";
import { useUsersStore } from "@/store/useUsersStore";
import TopProgress from "@/components/main/admin/TopProgress";

export default function UsersAdminPage() {
  const {
    searchQuery,
    selectedRole,
    selectedStatus,
    currentPage,
    limit,
  } = useUsersStore();

  const { data, isLoading, toggleBlockMutation } = useUsersData({
    searchQuery,
    selectedRole,
    selectedStatus,
    currentPage,
    limit,
  });

  const handleToggleBlock = (id, isBlocked) => {
    toggleBlockMutation.mutate({ id, isBlocked });
  };

  return (
    <div className="p-8 relative">
      <TopProgress />

      <div className="mx-auto max-w-7xl">
        <Header />

        <div className="rounded-xl border border-gray-200 bg-white shadow-xs overflow-hidden">
          <div className="px-6 pt-6 pb-2">
            <h2 className="text-lg font-bold text-gray-900">Users</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {data?.pagination?.total || 0} results · System Users
            </p>
          </div>

          <FilterBar />

          <UsersTable
            isLoading={isLoading}
            users={data?.users}
            onToggleBlock={handleToggleBlock}
          />

          <Pagination paginationData={data?.pagination} />
        </div>
      </div>
    </div>
  );
}
