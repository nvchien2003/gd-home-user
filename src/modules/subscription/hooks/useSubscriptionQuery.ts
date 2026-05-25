import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../api/queryKeys";
import { subscriptionApi } from "../api/subscription.api";
import type { CheckoutSessionPayload } from "../types/subscription.types";

export const useSubscriptionQuery = (enabled: boolean) =>
  useQuery({
    queryKey: queryKeys.subscription,
    queryFn: subscriptionApi.getCurrentSubscription,
    enabled,
    retry: false,
  });

export const useCheckoutSessionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CheckoutSessionPayload) =>
      subscriptionApi.createCheckoutSession(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subscription });
    },
  });
};
