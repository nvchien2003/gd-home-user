
import axiosClient from "../axios";
import type { ForgotInterface, LoginInterface, ResetPasswordInterface, SignUpInterface, VerifyInterface } from "./auth.interface";

export const authApi = {
    loginApi : async (payload: LoginInterface) => {
        const response = await axiosClient.post('/auth/login',payload);
        return response.data;
    },

    signUpApi: async (payload: SignUpInterface) => {
        const response = await axiosClient.post('/auth/signup', payload);
        return response.data.data;
    },

    verifyOtp: async (payload: VerifyInterface) => {
        const response = await axiosClient.post('/auth/verify', payload);
        return response.data;
    },

    forgotApi: async (payload: ForgotInterface) => {
        const response = await axiosClient.post('/auth/forgot-password', payload);
        return response.data.data;
    },

    resetApi: async (payload: ResetPasswordInterface) => {
        const response = await axiosClient.post('/auth/reset-password', payload);
        return response.data;
    },

    getProfile: async() => {
       const response = await axiosClient.get('/auth/profile');
        return response.data;
    }
}