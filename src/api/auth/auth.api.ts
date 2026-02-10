import axiosClient from "../axios";
import type { LoginInterface } from "./auth.interface";

export const authApi = {
    loginApi : async (payload: LoginInterface) => {
        const response = await axiosClient.post('/auth/login',payload);
        return response;
    }
}