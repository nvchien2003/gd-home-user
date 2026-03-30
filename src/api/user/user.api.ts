import axiosClient from "../axios";
import type { UserProfile } from "./user.interface";

export const UserApi = {
  updateProfileApi: async (payload: UserProfile) => {
    const response = await axiosClient.put("/users/update-profile", payload);
    return response.data;
  },
};
