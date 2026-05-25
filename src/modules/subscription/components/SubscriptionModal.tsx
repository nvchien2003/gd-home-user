import { Alert, Button, Modal, Skeleton } from "antd";
import { CheckCircle2, Crown, X } from "lucide-react";
import { SUBSCRIPTION_PLANS } from "../constants/subscription.constants";
import { formatPlanPrice } from "../utils/subscription.utils";

interface SubscriptionModalProps {
  open: boolean;
  loading: boolean;
  checkoutLoading: boolean;
  error?: Error | null;
  onClose: () => void;
  onSubscribe: () => void;
}

export default function SubscriptionModal({
  open,
  loading,
  checkoutLoading,
  error,
  onClose,
  onSubscribe,
}: SubscriptionModalProps) {
  const plan = SUBSCRIPTION_PLANS[0];

  return (
    <Modal
      open={open}
      centered
      footer={null}
      width={520}
      onCancel={onClose}
      closeIcon={<X className="h-5 w-5" />}
      styles={{ body: { padding: 0 } }}
      title={null}
    >
      <div className="overflow-hidden rounded-lg bg-white">
        <div className="bg-gray-950 px-6 py-6 text-white sm:px-8">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-200">
            <Crown className="h-6 w-6" />
          </div>
          <p className="text-sm font-medium text-indigo-200">Creator access</p>
          <h2 className="mt-1 text-2xl font-bold">{plan.name}</h2>
          <p className="mt-3 text-sm leading-6 text-gray-300">
            Activate listing access to publish rental posts and manage creator
            workflows.
          </p>
        </div>

        <div className="px-6 py-6 sm:px-8">
          {loading ? (
            <Skeleton active paragraph={{ rows: 5 }} />
          ) : (
            <>
              {error && (
                <Alert
                  type="error"
                  showIcon
                  className="mb-4"
                  message="Unable to load subscription status"
                  description="Please try again before starting checkout."
                />
              )}

              <div className="mb-5 flex items-end gap-2">
                <span className="text-4xl font-bold text-gray-900">
                  {formatPlanPrice(plan.price, plan.currency)}
                </span>
                <span className="pb-1 text-sm font-medium text-gray-500">
                  / month
                </span>
              </div>

              <div className="space-y-3">
                {plan.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button size="large" onClick={onClose}>
                  Not now
                </Button>
                <Button
                  type="primary"
                  size="large"
                  loading={checkoutLoading}
                  onClick={onSubscribe}
                >
                  Subscribe with Stripe
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
