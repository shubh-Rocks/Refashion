import apiClient from "@/lib/apiClient";

export const authService = {
  login: (data) => apiClient.post("/auth/login", data),
  register: (data) => apiClient.post("/auth/register", data),
  verifyOtp: (data) => apiClient.post("/auth/verify-otp", data),
  resendOtp: (data) => apiClient.post("/auth/resend-otp", data),
  logout: (data) => apiClient.post("/auth/logout", data),
  getme: (data) => apiClient.get("/auth/me", data),
};
