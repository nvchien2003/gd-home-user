import { SUBSCRIPTION_STATUS } from "../constants/subscription.constants";
import type { Subscription } from "../types/subscription.types";

const activeStatuses = new Set<string>([
  SUBSCRIPTION_STATUS.ACTIVE,
  SUBSCRIPTION_STATUS.TRIALING,
]);

const isFutureDate = (value?: string | null) => {
  if (!value) return true;
  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) || timestamp > Date.now();
};

export const hasActiveSubscription = (subscription: Subscription | null) => {
  if (!subscription) return false;

  const expiration =
    subscription.currentPeriodEnd ??
    subscription.expiresAt ??
    subscription.endDate;

  return activeStatuses.has(subscription.status ?? "") && isFutureDate(expiration);
};

export const formatPlanPrice = (price: number, currency: string) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
