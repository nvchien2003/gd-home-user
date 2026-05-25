import { Button } from "antd";
import { CheckCircle2, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { SUBSCRIPTION_PLANS } from "../constants/subscription.constants";
import { formatPlanPrice } from "../utils/subscription.utils";
import { useSubscription } from "../context/subscription.context";

export default function UpgradePrompt() {
  const { openSubscriptionModal, checkoutLoading } = useSubscription();
  const plan = SUBSCRIPTION_PLANS[0];

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
          <Crown className="h-7 w-7" />
        </div>
        <h1 className="mb-3 text-2xl font-bold text-gray-900">
          Subscription required
        </h1>
        <p className="mx-auto mb-6 max-w-xl text-gray-500">
          Creating rental posts is available with the {plan.name}.
        </p>

        <div className="mb-6 text-3xl font-bold text-gray-900">
          {formatPlanPrice(plan.price, plan.currency)}
          <span className="ml-1 text-sm font-medium text-gray-500">/ month</span>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {plan.benefits.map((benefit) => (
            <div
              key={benefit}
              className="flex items-center justify-center gap-2 rounded-lg bg-gray-50 px-3 py-3 text-sm text-gray-700"
            >
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="rounded-lg border border-gray-200 px-5 py-3 font-medium text-gray-700 hover:bg-gray-50"
          >
            Back home
          </Link>
          <Button
            type="primary"
            size="large"
            loading={checkoutLoading}
            onClick={openSubscriptionModal}
          >
            View plan
          </Button>
        </div>
      </div>
    </div>
  );
}
