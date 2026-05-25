import axiosClient from "../axios";
import type { PaginationParams } from "../api.types";
import { unwrapData, unwrapPaginated } from "../api.types";
import { normalizeProperty } from "../properties/properties.api";
import type { ApiBooking, Booking, CreateBookingPayload } from "./bookings.interface";

export const normalizeBooking = (booking: ApiBooking): Booking => ({
  id: booking.id,
  property: booking.property ? normalizeProperty(booking.property) : undefined,
  propertyId: booking.propertyId ?? booking.property?.id,
  status: booking.status ?? "pending",
  startDate: booking.startDate ?? booking.checkIn,
  endDate: booking.endDate,
  durationMonths: booking.durationMonths,
  totalPrice: Number(booking.totalPrice ?? booking.amount ?? 0),
  message: booking.message,
});

export const BookingsApi = {
  getBookings: async (params?: PaginationParams) => {
    const response = await axiosClient.get("/bookings", { params });
    const payload = unwrapPaginated<ApiBooking>(response);
    return {
      data: payload.data.map(normalizeBooking),
      meta: payload.meta,
    };
  },

  getBooking: async (id: string | number) => {
    const response = await axiosClient.get(`/bookings/${id}`);
    return normalizeBooking(unwrapData<ApiBooking>(response));
  },

  createBooking: async (payload: CreateBookingPayload) => {
    const response = await axiosClient.post("/bookings", payload);
    return normalizeBooking(unwrapData<ApiBooking>(response));
  },
};
