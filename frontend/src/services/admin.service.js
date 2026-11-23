import apiClient from "@/lib/apiClient";

export const adminService = {
  //   User data fetching routes

  getUsers: async (filters) => {
    const params = new URLSearchParams(filters);
    const response = await apiClient.get(`admin/users?${params.toString()}`);
    return response.data || { items: [], count: 0 };
  },

  blockUser: async (id) => {
    const response = await apiClient.patch(`admin/users/${id}/block`);
    return response.data;
  },

  unBlockUser: async (id) => {
    const response = await apiClient.patch(`admin/users/${id}/unblock`);
    return response.data;
  },

  //  Items data fetching routes

  getPendingItems: async (filters) => {
    const params = new URLSearchParams(filters);
    const response = await apiClient.get(
      `/admin/items/pending?${params.toString()}`,
    );
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

  getReports: async (filters) => {
    const params = new URLSearchParams(filters);
    const response = await apiClient.get(
      `/admin/reports?page?${params.toString()}`,
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
