import { Outlet } from "react-router-dom";
import { useAuth } from "../provider/auth.context";
import { hasActivePlan } from "../util/subscription";
import UpgradePrompt from "../component/subscription/UpgradePrompt";

export default function SubscriptionRoute() {
  const { user } = useAuth();

  if (!hasActivePlan(user)) {
    return <UpgradePrompt />;
  }

  return <Outlet />;
}
