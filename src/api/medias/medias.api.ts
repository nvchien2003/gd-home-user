import axiosClient from "../axios";

export const MediaApi = {
    fileUpload: async (payload: FormData) => {
        const response = await axiosClient.post(
            '/file-upload/upload',
            payload,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                timeout: 150000,
            },
        );
        return response.data.data;
    },
};
