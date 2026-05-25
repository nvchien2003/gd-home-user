import axiosClient from "../../../api/axios";
import { unwrapData } from "../../../api/api.types";
import type {
  CheckoutSessionPayload,
  CheckoutSessionResponse,
  Subscription,
} from "../types/subscription.types";

export const subscriptionApi = {
  getCurrentSubscription: async () => {
    const response = await axiosClient.get("/subscriptions/me");
    return unwrapData<Subscription | null>(response);
  },

  createCheckoutSession: async (payload: CheckoutSessionPayload) => {
    const response = await axiosClient.post(
      "/subscriptions/checkout-session",
      payload,
    );
    return unwrapData<CheckoutSessionResponse>(response);
  },
};
