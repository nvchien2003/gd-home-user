import type { ApiProperty, Property } from "../properties/properties.interface";

export interface ApiBooking {
  id: string | number;
  property?: ApiProperty;
  propertyId?: string | number;
  status?: string;
  startDate?: string;
  endDate?: string;
  checkIn?: string;
  durationMonths?: number;
  totalPrice?: number;
  amount?: number;
  message?: string;
  createdAt?: string;
}

export interface Booking {
  id: string | number;
  property?: Property;
  propertyId?: string | number;
  status: string;
  startDate?: string;
  endDate?: string;
  durationMonths?: number;
  totalPrice: number;
  message?: string;
}

export interface CreateBookingPayload {
  propertyId?: string | number;
  startDate?: string;
  durationMonths?: number;
  message?: string;
}
