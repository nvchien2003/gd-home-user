import axiosClient from "../axios";
import type { AxiosProgressEvent } from "axios";

export const MediaApi = {
    fileUpload: async (payload: FormData, onUploadProgress?: (event: AxiosProgressEvent) => void) => {
        const response = await axiosClient.post(
            '/file-upload/upload',
            payload,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                timeout: 150000,
                onUploadProgress,
            },
        );
        return response.data.data;
    },
};
