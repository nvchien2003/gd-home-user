import axiosClient from "../axios";
import type { PaginationParams } from "../api.types";
import { unwrapData, unwrapPaginated } from "../api.types";
import type { ApiProperty, Property, PropertyListResult } from "./properties.interface";

const fallbackImage = "/image/avatar.png";

const imageUrl = (value: string | { url?: string } | undefined) =>
  typeof value === "string" ? value : value?.url;

export const normalizeProperty = (property: ApiProperty): Property => {
  const images = (property.images ?? []).map(imageUrl).filter((url): url is string => Boolean(url));
  const owner = property.owner ?? property.user;
  const ownerName =
    owner?.name ??
    [owner?.firstName, owner?.lastName].filter(Boolean).join(" ") ??
    property.contactName ??
    "Host";

  return {
    id: property.id,
    title: property.title ?? property.name ?? "Untitled property",
    location: property.location ?? property.address ?? property.city ?? "Location unavailable",
    price: Number(property.price ?? property.pricePerMonth ?? property.monthlyPrice ?? property.rentPrice ?? 0),
    pricePerMonth: Number(property.pricePerMonth ?? property.monthlyPrice ?? property.rentPrice ?? property.price ?? 0),
    beds: Number(property.beds ?? property.bedrooms ?? 0),
    baths: Number(property.baths ?? property.bathrooms ?? 0),
    sqft: Number(property.sqft ?? property.area ?? 0),
    type: property.type ?? property.roomType ?? "Property",
    rating: Number(property.rating ?? 0),
    reviews: Number(property.reviews ?? property.reviewCount ?? 0),
    image: property.image ?? property.thumbnail ?? images[0] ?? fallbackImage,
    images,
    amenities: property.amenities ?? [],
    description: property.description ?? "",
    owner: {
      name: ownerName || "Host",
      image: owner?.avatar ?? owner?.image ?? fallbackImage,
    },
  };
};

export const PropertiesApi = {
  getProperties: async (params?: PaginationParams): Promise<PropertyListResult> => {
    const response = await axiosClient.get("/properties", { params });
    const payload = unwrapPaginated<ApiProperty>(response);
    return {
      data: payload.data.map(normalizeProperty),
      meta: payload.meta,
    };
  },

  getPropertyDetail: async (id: string | number): Promise<Property> => {
    const response = await axiosClient.get(`/properties/${id}`);
    return normalizeProperty(unwrapData<ApiProperty>(response));
  },
};
