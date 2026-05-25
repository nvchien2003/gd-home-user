import { Skeleton } from "antd";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSubscription } from "../context/subscription.context";
import UpgradePrompt from "./UpgradePrompt";

export default function RequireSubscription() {
  const { hasSubscription, loading, openSubscriptionModal } = useSubscription();

  useEffect(() => {
    if (!loading && !hasSubscription) {
      openSubscriptionModal();
    }
  }, [hasSubscription, loading, openSubscriptionModal]);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12">
        <Skeleton active paragraph={{ rows: 8 }} />
      </div>
    );
  }

  if (!hasSubscription) {
    return <UpgradePrompt />;
  }

  return <Outlet />;
}
