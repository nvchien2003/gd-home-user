import axiosClient from "../axios";
import type { CreateRentalPostPayload, RentalPost } from "./rental-post.interface";

export const RentalPostApi = {
  createRentalPost: async (payload: CreateRentalPostPayload) => {
    const response = await axiosClient.post<RentalPost>("/rental-posts", payload);
    return response.data;
  },
};
