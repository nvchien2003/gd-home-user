export const queryKeys = {
  profile: ["me"] as const,
  properties: (params?: unknown) => ["properties", params ?? {}] as const,
  property: (id?: string | number) => ["properties", id] as const,
  favorites: ["favorites"] as const,
  bookings: (params?: unknown) => ["bookings", params ?? {}] as const,
  dashboardOverview: ["dashboard", "overview"] as const,
  chatConversations: ["chat", "conversations"] as const,
  chatMessages: (conversationId?: string | number) => ["chat", "conversations", conversationId, "messages"] as const,
  rentals: (params?: unknown) => ["rentals", params ?? {}] as const,
  subscription: ["subscriptions", "me"] as const,
};
