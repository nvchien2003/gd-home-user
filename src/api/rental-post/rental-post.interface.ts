export type RoomType = "apartment" | "house" | "villa" | "studio" | "shared_room";

export interface CreateRentalPostPayload {
  title: string;
  description: string;
  pricePerMonth: number;
  address: string;
  location: string;
  roomType: RoomType;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  amenities: string[];
  images: string[];
}

export interface RentalPost extends CreateRentalPostPayload {
  id: string;
  status?: "draft" | "published" | "pending";
  createdAt?: string;
}
