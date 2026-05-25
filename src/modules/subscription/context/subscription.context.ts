import { createContext, useContext } from "react";
import type { SubscriptionContextValue } from "../types/subscription.types";

export const SubscriptionContext =
  createContext<SubscriptionContextValue | undefined>(undefined);

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);

  if (!context) {
    throw new Error("useSubscription must be used within SubscriptionProvider");
  }

  return context;
};
