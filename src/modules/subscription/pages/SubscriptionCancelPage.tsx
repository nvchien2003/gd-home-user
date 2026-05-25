import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import { useSubscription } from "../context/subscription.context";

export default function SubscriptionCancelPage() {
  const { openSubscriptionModal, checkoutLoading } = useSubscription();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <Result
        status="info"
        title="Subscription checkout was cancelled"
        subTitle="Your payment was not completed. You can retry checkout when you are ready to create rental posts."
        extra={[
          <Link key="home" to="/">
            <Button>Back home</Button>
          </Link>,
          <Button key="retry" type="primary" loading={checkoutLoading} onClick={openSubscriptionModal}>
            Retry payment
          </Button>,
        ]}
      />
    </div>
  );
}
