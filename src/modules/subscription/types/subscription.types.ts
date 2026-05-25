import type {
  SUBSCRIPTION_PLAN_IDS,
  SUBSCRIPTION_PLANS,
  SUBSCRIPTION_STATUS,
} from "../constants/subscription.constants";

export type SubscriptionPlanId =
  (typeof SUBSCRIPTION_PLAN_IDS)[keyof typeof SUBSCRIPTION_PLAN_IDS];

export type SubscriptionStatus =
  (typeof SUBSCRIPTION_STATUS)[keyof typeof SUBSCRIPTION_STATUS];

export type SubscriptionPlan = (typeof SUBSCRIPTION_PLANS)[number];

export interface Subscription {
  id?: string;
  planId?: SubscriptionPlanId | string;
  planName?: string;
  status?: SubscriptionStatus | string;
  currentPeriodEnd?: string | null;
  expiresAt?: string | null;
  endDate?: string | null;
  cancelAtPeriodEnd?: boolean;
}

export interface CheckoutSessionPayload {
  planId: SubscriptionPlanId;
  successUrl?: string;
  cancelUrl?: string;
}

export interface CheckoutSessionResponse {
  checkoutUrl: string;
}

export interface SubscriptionContextValue {
  subscription: Subscription | null;
  hasSubscription: boolean;
  loading: boolean;
  error: Error | null;
  checkoutLoading: boolean;
  refreshSubscription: () => Promise<void>;
  openSubscriptionModal: () => void;
  closeSubscriptionModal: () => void;
}
