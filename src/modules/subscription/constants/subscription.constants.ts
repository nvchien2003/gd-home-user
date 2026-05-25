export const SUBSCRIPTION_PLAN_IDS = {
  BASIC_CREATOR: "basic_creator",
} as const;

export const SUBSCRIPTION_PLANS = [
  {
    id: SUBSCRIPTION_PLAN_IDS.BASIC_CREATOR,
    name: "Basic Creator Plan",
    price: 2000,
    currency: "VND",
    benefits: [
      "Create rental posts and properties",
      "Upload property photos",
      "Receive renter inquiries",
      "Manage listings from your account",
    ],
  },
] as const;

export const SUBSCRIPTION_STATUS = {
  ACTIVE: "active",
  TRIALING: "trialing",
  EXPIRED: "expired",
  CANCELED: "canceled",
  INACTIVE: "inactive",
} as const;

export const SUBSCRIPTION_RETURN_PARAMS = [
  "subscription",
  "checkout",
  "payment",
  "session_id",
] as const;
