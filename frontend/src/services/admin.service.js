import apiClient from "@/lib/apiClient";

export const adminService = {
  //   User data fetching routes

  getUsers: async (page = 1, limit = 10) => {
    const response = await apiClient.get(
      `admin/users?page=${page}&limit${limit}`,
    );
    return response.data;
  },

  blockUser: async (id) => {
    const response = await apiClient.patch(`admin/users/${id}/block`);
    return response.data;
  },

  unBlockUser: async (id) => {
    const response = await apiClient.patch(`admin/users/${id}/unblock`);
    response.data;
  },

  //  Items data fetching routes

  getPendingItems: async (filters) => {
    const params = new URLSearchParams(filters);
    const response = await apiClient.get(
      `/admin/items/pending?${params.toString()}`,
    );
    response.data;
    return response.data || { items: [], count: 0 };
  },

  approveItem: async (id) => {
    const response = await apiClient.patch(`admin/items/${id}/approve`);
    return response.data;
  },

  rejectItem: async (id) => {
    const response = await apiClient.patch(`admin/items/${id}/reject`);
    return response.data;
  },

  // reports data fetching routes

  getReports: async (page = 1, limit = 10) => {
    const response = await apiClient.get(
      `/admin/reports?page=${page}&limit=${limit}`,
    );
    return response.data;
  },

  resolveReport: async (id) => {
    const response = await apiClient.patch(`admin/reports/${id}/resolve`);
    return response.data;
  },

  dismissReport: async (id) => {
    const response = await apiClient.patch(`admin/reports/${id}/dismiss`);
    return response.data;
  },
};
