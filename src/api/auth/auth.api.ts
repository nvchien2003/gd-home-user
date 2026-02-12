import axiosClient from "../axios";
import type { LoginInterface, SignUpInterface } from "./auth.interface";

export const authApi = {
    loginApi : async (payload: LoginInterface) => {
        const response = await axiosClient.post('/auth/login',payload);
        return response;
    },

    signUpApi: async (payload: SignUpInterface) => {
        const response = await axiosClient.post('/auth/signup', payload);
        return response;
    }
}