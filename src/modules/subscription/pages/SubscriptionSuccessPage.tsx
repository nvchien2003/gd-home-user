import { Button, Result, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSubscription } from "../context/subscription.context";

export default function SubscriptionSuccessPage() {
  const navigate = useNavigate();
  const { hasSubscription, loading, refreshSubscription } = useSubscription();
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    const refresh = async () => {
      try {
        await refreshSubscription();
      } finally {
        setRefreshing(false);
      }
    };

    void refresh();
  }, [refreshSubscription]);

  useEffect(() => {
    if (!refreshing && hasSubscription) {
      const timeout = window.setTimeout(() => navigate("/create-rental", { replace: true }), 1200);
      return () => window.clearTimeout(timeout);
    }

    return undefined;
  }, [hasSubscription, navigate, refreshing]);

  if (refreshing || loading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <Skeleton active paragraph={{ rows: 5 }} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <Result
        status={hasSubscription ? "success" : "warning"}
        title={hasSubscription ? "Subscription activated" : "Payment received, verifying subscription"}
        subTitle={
          hasSubscription
            ? "Your creator access is active. Redirecting you to create your rental post."
            : "We could not confirm your subscription yet. Please refresh your account status."
        }
        extra={[
          <Button key="refresh" onClick={() => void refreshSubscription()}>
            Refresh status
          </Button>,
          <Link key="create" to="/create-rental">
            <Button type="primary">Create rental post</Button>
          </Link>,
        ]}
      />
    </div>
  );
}
