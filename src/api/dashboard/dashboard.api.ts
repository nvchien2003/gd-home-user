import axiosClient from "../axios";
import { unwrapData } from "../api.types";
import { normalizeBooking } from "../bookings/bookings.api";
import type { ApiBooking, Booking } from "../bookings/bookings.interface";
import { normalizeProperty } from "../properties/properties.api";
import type { ApiProperty, Property } from "../properties/properties.interface";

export interface DashboardOverviewData {
  greetingName?: string;
  upcomingCount?: number;
  unreadMessages?: number;
  upcomingViewings?: Booking[];
  recentFavorites?: Property[];
}

interface ApiDashboardOverviewData extends Omit<DashboardOverviewData, "upcomingViewings" | "recentFavorites"> {
  upcomingViewings?: ApiBooking[];
  recentFavorites?: ApiProperty[];
}

export const DashboardApi = {
  getOverview: async (): Promise<DashboardOverviewData> => {
    const response = await axiosClient.get("/dashboard/overview");
    const data = unwrapData<ApiDashboardOverviewData>(response);
    return {
      ...data,
      upcomingViewings: data.upcomingViewings?.map(normalizeBooking),
      recentFavorites: data.recentFavorites?.map(normalizeProperty),
    };
  },
};
