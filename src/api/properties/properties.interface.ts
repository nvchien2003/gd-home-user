import type { PaginationMeta } from "../api.types";

export interface ApiPropertyOwner {
  id?: string | number;
  firstName?: string;
  lastName?: string;
  name?: string;
  avatar?: string;
  image?: string;
}

export interface ApiProperty {
  id: string | number;
  title?: string;
  name?: string;
  description?: string;
  address?: string;
  location?: string;
  city?: string;
  price?: number;
  pricePerMonth?: number;
  monthlyPrice?: number;
  rentPrice?: number;
  beds?: number;
  bedrooms?: number;
  baths?: number;
  bathrooms?: number;
  sqft?: number;
  area?: number;
  type?: string;
  roomType?: string;
  rating?: number;
  reviews?: number;
  reviewCount?: number;
  image?: string;
  thumbnail?: string;
  images?: Array<string | { url?: string }>;
  amenities?: string[];
  owner?: ApiPropertyOwner;
  user?: ApiPropertyOwner;
  contactName?: string;
}

export interface Property {
  id: string | number;
  title: string;
  location: string;
  price: number;
  pricePerMonth: number;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  amenities: string[];
  description: string;
  owner: {
    name: string;
    image: string;
  };
}

export interface PropertyListResult {
  data: Property[];
  meta?: PaginationMeta;
}
