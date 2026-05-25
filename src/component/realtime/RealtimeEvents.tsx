import { useBookingEvents, useChatEvents } from "../../hook/api.hooks";
import { useAuth } from "../../provider/auth.context";

export default function RealtimeEvents() {
  const { isAuthenticated } = useAuth();

  useChatEvents(isAuthenticated);
  useBookingEvents(isAuthenticated);

  return null;
}
