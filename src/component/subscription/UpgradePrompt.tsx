import { Link } from "react-router-dom";
import { Crown, CheckCircle2 } from "lucide-react";

const PLAN_BENEFITS = [
  "Publish rental posts",
  "Upload property photos",
  "Receive renter inquiries",
];

export default function UpgradePrompt() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-8 text-center">
        <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-5">
          <Crown className="h-7 w-7" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Upgrade required
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto mb-6">
          Creating rental posts is available for users with an active plan.
          Choose a subscription to start listing your properties.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {PLAN_BENEFITS.map((benefit) => (
            <div
              key={benefit}
              className="flex items-center justify-center gap-2 rounded-lg bg-gray-50 px-3 py-3 text-sm text-gray-700"
            >
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link
            to="/"
            className="px-5 py-3 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
          >
            Back home
          </Link>
          <Link
            to="/profile"
            className="px-5 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
          >
            View account
          </Link>
        </div>
      </div>
    </div>
  );
}
