import { message } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../api/queryKeys";
import { useAuth } from "../../../provider/auth.context";
import {
  SUBSCRIPTION_PLAN_IDS,
  SUBSCRIPTION_RETURN_PARAMS,
} from "../constants/subscription.constants";
import {
  useCheckoutSessionMutation,
  useSubscriptionQuery,
} from "../hooks/useSubscriptionQuery";
import type { SubscriptionContextValue } from "../types/subscription.types";
import { hasActiveSubscription } from "../utils/subscription.utils";
import SubscriptionModal from "../components/SubscriptionModal";
import { SubscriptionContext } from "./subscription.context";

const sessionKey = (userId?: string) =>
  `gdhome.subscriptionModalShown.${userId ?? "anonymous"}`;

const buildCheckoutPayload = () => ({
  planId: SUBSCRIPTION_PLAN_IDS.BASIC_CREATOR,
  successUrl: `${window.location.origin}/subscription/success?subscription=success`,
  cancelUrl: `${window.location.origin}/subscription/cancel?subscription=cancelled`,
});

const hasCheckoutReturnParam = () => {
  const params = new URLSearchParams(window.location.search);
  return SUBSCRIPTION_RETURN_PARAMS.some((param) => params.has(param));
};

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);

  const {
    data: subscription = null,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useSubscriptionQuery(isAuthenticated);

  const checkoutMutation = useCheckoutSessionMutation();
  const hasSubscription =
    user?.role === "admin" || hasActiveSubscription(subscription);
  const loading = isAuthenticated && (isLoading || isFetching);

  const refreshSubscription = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: queryKeys.subscription });
    await queryClient.invalidateQueries({ queryKey: queryKeys.profile });
    await refetch();
  }, [queryClient, refetch]);

  const openSubscriptionModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const closeSubscriptionModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setModalOpen(false);
      return;
    }

    if (loading || hasSubscription) return;

    const key = sessionKey(user?.id);
    if (sessionStorage.getItem(key)) return;

    sessionStorage.setItem(key, "true");
    setModalOpen(true);
  }, [hasSubscription, isAuthenticated, loading, user?.id]);

  useEffect(() => {
    if (hasSubscription) {
      setModalOpen(false);
    }
  }, [hasSubscription]);

  useEffect(() => {
    if (!isAuthenticated || !hasCheckoutReturnParam()) return;

    void refreshSubscription();

    const url = new URL(window.location.href);
    SUBSCRIPTION_RETURN_PARAMS.forEach((param) => {
      url.searchParams.delete(param);
    });
    window.history.replaceState({}, document.title, `${url.pathname}${url.search}${url.hash}`);
  }, [isAuthenticated, refreshSubscription]);

  const handleSubscribe = useCallback(async () => {
    try {
      const checkout = await checkoutMutation.mutateAsync(buildCheckoutPayload());
      if (!checkout.checkoutUrl) {
        throw new Error("Missing checkout URL");
      }
      window.location.href = checkout.checkoutUrl;
    } catch {
      message.error("Unable to start Stripe checkout. Please try again.");
    }
  }, [checkoutMutation]);

  const value = useMemo<SubscriptionContextValue>(
    () => ({
      subscription,
      hasSubscription,
      loading,
      error: error instanceof Error ? error : null,
      checkoutLoading: checkoutMutation.isPending,
      refreshSubscription,
      openSubscriptionModal,
      closeSubscriptionModal,
    }),
    [
      checkoutMutation.isPending,
      closeSubscriptionModal,
      error,
      hasSubscription,
      loading,
      openSubscriptionModal,
      refreshSubscription,
      subscription,
    ],
  );

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
      <SubscriptionModal
        open={modalOpen}
        loading={loading}
        checkoutLoading={checkoutMutation.isPending}
        error={error instanceof Error ? error : null}
        onClose={closeSubscriptionModal}
        onSubscribe={handleSubscribe}
      />
    </SubscriptionContext.Provider>
  );
}
