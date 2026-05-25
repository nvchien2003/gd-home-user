import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { PaginationParams } from "../api/api.types";
import { queryKeys } from "../api/queryKeys";
import { PropertiesApi } from "../api/properties/properties.api";
import { FavoritesApi } from "../api/favorites/favorites.api";
import { BookingsApi } from "../api/bookings/bookings.api";
import { DashboardApi } from "../api/dashboard/dashboard.api";
import { ChatApi } from "../api/chat/chat.api";
import { RentalsApi } from "../api/rentals/rentals.api";
import type { CreateBookingPayload } from "../api/bookings/bookings.interface";
import type { ChatMessage, SendMessagePayload } from "../api/chat/chat.interface";
import { RentalPostApi } from "../api/rental-post/rental-post.api";
import type { CreateRentalPostPayload } from "../api/rental-post/rental-post.interface";
import type { Property } from "../api/properties/properties.interface";

const eventUrl = (path: string) => {
  const baseUrl = import.meta.env.VITE_BE_URL ?? "";
  const token = localStorage.getItem("token");
  const url = new URL(path, baseUrl || window.location.origin);
  if (token) url.searchParams.set("token", token);
  return url.toString();
};

export const usePropertiesQuery = (params?: PaginationParams) =>
  useQuery({
    queryKey: queryKeys.properties(params),
    queryFn: () => PropertiesApi.getProperties(params),
  });

export const usePropertyDetailQuery = (id?: string | number) =>
  useQuery({
    queryKey: queryKeys.property(id),
    queryFn: () => PropertiesApi.getPropertyDetail(id as string | number),
    enabled: Boolean(id),
  });

export const useFavoritesQuery = () =>
  useQuery({
    queryKey: queryKeys.favorites,
    queryFn: FavoritesApi.getFavorites,
  });

export const useToggleFavoriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ propertyId, favorite }: { propertyId: string | number; favorite: boolean }) =>
      favorite ? FavoritesApi.addFavorite(propertyId) : FavoritesApi.removeFavorite(propertyId),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.favorites });
      const previous = queryClient.getQueryData<Property[]>(queryKeys.favorites);
      if (!variables.favorite) {
        queryClient.setQueryData<Property[]>(queryKeys.favorites, (current = []) =>
          current.filter((property) => property.id !== variables.propertyId),
        );
      }
      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) queryClient.setQueryData(queryKeys.favorites, context.previous);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.favorites });
      queryClient.invalidateQueries({ queryKey: queryKeys.property(variables.propertyId) });
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });
};

export const useBookingsQuery = (params?: PaginationParams) =>
  useQuery({
    queryKey: queryKeys.bookings(params),
    queryFn: () => BookingsApi.getBookings(params),
  });

export const useCreateBookingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBookingPayload) => BookingsApi.createBooking(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboardOverview });
      queryClient.invalidateQueries({ queryKey: ["rentals"] });
    },
  });
};

export const useDashboardOverviewQuery = () =>
  useQuery({
    queryKey: queryKeys.dashboardOverview,
    queryFn: DashboardApi.getOverview,
  });

export const useChatConversationsQuery = () =>
  useQuery({
    queryKey: queryKeys.chatConversations,
    queryFn: ChatApi.getConversations,
  });

export const useChatMessagesQuery = (conversationId?: string | number) =>
  useQuery({
    queryKey: queryKeys.chatMessages(conversationId),
    queryFn: () => ChatApi.getMessages(conversationId as string | number),
    enabled: Boolean(conversationId),
  });

export const useSendMessageMutation = (conversationId?: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SendMessagePayload) => ChatApi.sendMessage(conversationId as string | number, payload),
    onSuccess: (message) => {
      queryClient.setQueryData<ChatMessage[]>(queryKeys.chatMessages(conversationId), (current = []) => [
        ...current,
        message,
      ]);
      queryClient.invalidateQueries({ queryKey: queryKeys.chatConversations });
    },
  });
};

export const useRentalsQuery = (params?: PaginationParams) =>
  useQuery({
    queryKey: queryKeys.rentals(params),
    queryFn: () => RentalsApi.getRentals(params),
  });

export const useCreateRentalPostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateRentalPostPayload) => RentalPostApi.createRentalPost(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      queryClient.invalidateQueries({ queryKey: ["rental-posts"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboardOverview });
    },
  });
};

export const useChatEvents = (enabled = true) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled) return undefined;
    const source = new EventSource(eventUrl("/chat/events"));

    source.onmessage = (event) => {
      const payload = JSON.parse(event.data) as { conversationId?: string | number; message?: ChatMessage };
      if (payload.message && payload.conversationId) {
        queryClient.setQueryData<ChatMessage[]>(queryKeys.chatMessages(payload.conversationId), (current = []) => {
          if (current.some((message) => message.id === payload.message?.id)) return current;
          return [...current, payload.message as ChatMessage];
        });
      }
      queryClient.invalidateQueries({ queryKey: queryKeys.chatConversations });
    };

    return () => source.close();
  }, [enabled, queryClient]);
};

export const useBookingEvents = (enabled = true) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled) return undefined;
    const source = new EventSource(eventUrl("/bookings/events"));

    source.onmessage = () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["rentals"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboardOverview });
    };

    return () => source.close();
  }, [enabled, queryClient]);
};
