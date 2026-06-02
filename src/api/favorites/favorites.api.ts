import axiosClient from "../axios";
import { unwrapData } from "../api.types";
import { normalizeProperty } from "../properties/properties.api";
import type { ApiProperty, Property } from "../properties/properties.interface";

interface FavoriteRecord {
  id?: string | number;
  property?: ApiProperty;
  propertyId?: string | number;
}

export const FavoritesApi = {
  getFavorites: async (): Promise<Property[]> => {
    const response = await axiosClient.get("/favorites");
    const records = unwrapData<Array<ApiProperty | FavoriteRecord>>(response);
    return records.map((record) => normalizeProperty("property" in record && record.property ? record.property : record as ApiProperty));
  },

  addFavorite: async (propertyId: string | number) => {
    const response = await axiosClient.post(
      `/favorites/${propertyId}`
    );

    return response.data;
  },

  removeFavorite: async (propertyId: string | number) => {
    const response = await axiosClient.delete(`/favorites/${propertyId}`);
    return response.data;
  },
};
