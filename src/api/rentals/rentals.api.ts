import axiosClient from "../axios";
import type { PaginationParams } from "../api.types";
import { unwrapPaginated } from "../api.types";
import type { ApiBooking } from "../bookings/bookings.interface";
import { normalizeBooking } from "../bookings/bookings.api";

export const RentalsApi = {
  getRentals: async (params?: PaginationParams) => {
    const response = await axiosClient.get("/rentals", { params });
    const payload = unwrapPaginated<ApiBooking>(response);
    return {
      data: payload.data.map(normalizeBooking),
      meta: payload.meta,
    };
  },
};
