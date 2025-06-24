// Centralized API client for backend integration
import { apiRequest } from "@/lib/queryClient";

// User API
export const userApi = {
  getUser: (id: number) => apiRequest("GET", `/api/users/${id}`),
  updateUser: (id: number, data: any) => apiRequest("PUT", `/api/users/${id}`, data),
  getAiCash: (userId: number) => apiRequest("GET", `/api/users/${userId}/ai-cash`),
  chargeAiCash: (userId: number, amount: number, paymentMethod: string) => 
    apiRequest("POST", `/api/users/${userId}/ai-cash/charge`, { amount, paymentMethod }),
  spendAiCash: (userId: number, amount: number, description: string) =>
    apiRequest("POST", `/api/users/${userId}/ai-cash/spend`, { amount, description }),
};

// Store Information API
export const storeInfoApi = {
  getUserStoreInfos: (userId: number) => apiRequest("GET", `/api/users/${userId}/store-info`),
  createStoreInfo: (data: any) => apiRequest("POST", "/api/store-info", data),
  updateStoreInfo: (id: number, data: any) => apiRequest("PUT", `/api/store-info/${id}`, data),
  deleteStoreInfo: (id: number) => apiRequest("DELETE", `/api/store-info/${id}`),
};

// Community/Posts API
export const postsApi = {
  getPosts: (params?: { category?: string; limit?: number; offset?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append("category", params.category);
    if (params?.limit) searchParams.append("limit", params.limit.toString());
    if (params?.offset) searchParams.append("offset", params.offset.toString());
    
    return apiRequest("GET", `/api/posts?${searchParams.toString()}`);
  },
  createPost: (data: any) => apiRequest("POST", "/api/posts", data),
  updatePost: (id: number, data: any) => apiRequest("PUT", `/api/posts/${id}`, data),
  deletePost: (id: number) => apiRequest("DELETE", `/api/posts/${id}`),
};

// Tools API
export const toolsApi = {
  getAllTools: () => apiRequest("GET", "/api/tools"),
  getToolsByCategory: (category: string) => apiRequest("GET", `/api/tools?category=${category}`),
  getTool: (id: number) => apiRequest("GET", `/api/tools/${id}`),
  updateToolUsage: (id: number) => apiRequest("PATCH", `/api/tools/${id}/usage`),
};

// Templates API
export const templatesApi = {
  getAllTemplates: () => apiRequest("GET", "/api/templates"),
  getTemplatesByCategory: (category: string) => apiRequest("GET", `/api/templates?category=${category}`),
  getTemplate: (id: number) => apiRequest("GET", `/api/templates/${id}`),
  updateTemplateUsage: (id: number) => apiRequest("PATCH", `/api/templates/${id}/usage`),
};

// Favorites API
export const favoritesApi = {
  getUserFavorites: (userId: number) => apiRequest("GET", `/api/users/${userId}/favorites`),
  addFavorite: (userId: number, toolId: number) => apiRequest("POST", "/api/favorites", { userId, toolId }),
  removeFavorite: (userId: number, toolId: number) => apiRequest("DELETE", "/api/favorites", { userId, toolId }),
};

// Chat API
export const chatApi = {
  getChatHistory: (userId: number) => apiRequest("GET", `/api/chat/${userId}`),
  sendMessage: (userId: number, message: string) => apiRequest("POST", "/api/chat", { userId, message }),
};

// Automation Progress API
export const automationApi = {
  getProgress: (toolId: number, userId: number) => apiRequest("GET", `/api/automation/${toolId}/progress/${userId}`),
  updateProgress: (toolId: number, userId: number, stage: number, completed: boolean) =>
    apiRequest("POST", `/api/automation/${toolId}/progress/${userId}`, { stage, completed }),
};

// Challenger Missions API
export const missionsApi = {
  getUserMissions: (userId: number) => apiRequest("GET", `/api/missions/${userId}`),
  completeMission: (userId: number, missionId: number, day: number) =>
    apiRequest("POST", `/api/missions/${userId}/complete`, { missionId, day }),
};

// Admin/Stats API
export const adminApi = {
  getStats: () => apiRequest("GET", "/api/stats"),
};

// Data transformation utilities
export const transformers = {
  // Convert frontend store info to backend format
  storeInfoToBackend: (storeInfo: any, userId: number) => ({
    userId,
    storeName: storeInfo.storeName,
    productName: storeInfo.productName,
    address: storeInfo.address,
    website: storeInfo.website || "",
    description: storeInfo.description,
    mainKeyword: storeInfo.mainKeyword,
    hashtags: storeInfo.hashtags || "",
  }),

  // Convert frontend post to backend format
  postToBackend: (post: any, userId: number) => ({
    userId,
    title: post.title,
    content: post.content,
    category: post.category,
  }),

  // Convert backend user data to frontend format
  userFromBackend: (user: any) => ({
    id: user.id,
    username: user.username,
    email: user.email,
    profileImage: user.profileImage,
    level: user.level || "Bronze",
    aiCash: user.aiCash || 0,
    role: user.role || "user",
    isActive: user.isActive ?? true,
  }),
};

// Error handling utilities
export const handleApiError = (error: any) => {
  console.error("API Error:", error);
  
  if (error?.response?.status === 401) {
    // Handle authentication error
    window.location.href = "/login";
    return;
  }
  
  if (error?.response?.status === 403) {
    // Handle authorization error
    return { error: "권한이 없습니다." };
  }
  
  if (error?.response?.status >= 500) {
    // Handle server error
    return { error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." };
  }
  
  // Handle client error
  return { error: error?.message || "오류가 발생했습니다." };
};

// Cache keys for React Query
export const queryKeys = {
  users: (id?: number) => id ? ["users", id] : ["users"],
  userAiCash: (userId: number) => ["users", userId, "ai-cash"],
  storeInfos: (userId: number) => ["store-infos", userId],
  posts: (params?: any) => ["posts", params],
  tools: (category?: string) => category ? ["tools", category] : ["tools"],
  templates: (category?: string) => category ? ["templates", category] : ["templates"],
  favorites: (userId: number) => ["favorites", userId],
  chatHistory: (userId: number) => ["chat", userId],
  automationProgress: (toolId: number, userId: number) => ["automation", toolId, userId],
  missions: (userId: number) => ["missions", userId],
  stats: () => ["stats"],
};