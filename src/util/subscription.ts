import type { User } from "../api/user/user.interface";

const isFutureDate = (value?: string | null) => {
  if (!value) return true;
  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) || timestamp > Date.now();
};

export const hasActivePlan = (user: User | null) => {
  if (!user) return false;
  if (user.role === "admin") return true;

  const subscription = user.subscription;
  if (
    subscription &&
    ["active", "trialing"].includes(subscription.status ?? "") &&
    isFutureDate(subscription.expiresAt ?? subscription.endDate)
  ) {
    return true;
  }

  const plan = user.activePlan ?? user.plan;
  return Boolean(
    plan &&
      (plan.isActive ?? plan.active) &&
      isFutureDate(plan.expiresAt)
  );
};
