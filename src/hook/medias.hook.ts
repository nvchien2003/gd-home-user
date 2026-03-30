/* eslint-disable @typescript-eslint/no-explicit-any */
import { type UploadProps } from 'antd';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MediaApi } from '../api/medias/medias.api';

const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export type FileUpload = { preview: string; file?: File | string; id: string };

export const usePreview = (limit = 1) => {
    const [filePreview, setFilePreview] = useState<FileUpload[]>([]);

    const onChangeFiles: UploadProps['onChange'] = async ({ fileList }) => {
        if (!fileList) return;

        const newFiles = await Promise.all(
            fileList.map(async (file) => {
                const base64 = await getBase64(file.originFileObj as File);
                return {
                    preview: base64,
                    file: file.originFileObj as File,
                    id: uuidv4(),
                };
            }),
        );

        setFilePreview((prev) => {
            const existingUuids = new Set(
                prev?.map((item) => (item.file as any)?.uid),
            );
            const merged = [
                ...(prev ?? []),
                ...newFiles.filter(
                    (item) => !existingUuids.has((item.file as any)?.uid),
                ),
            ];
            return limit > 1
                ? merged.slice(0, limit)
                : ([merged?.at(-1)] as FileUpload[]);
        });
    };

    const onRemoveFile = (id: string) => {
        setFilePreview((prev) => prev.filter((item) => item.id !== id));
    };

    const onUpload = async (fileUpload: FileUpload[]) => {
        if (fileUpload?.length) {
            const formDataUpload = new FormData();
            formDataUpload.append('type', 'avatar');
            fileUpload.forEach((file) => {
                formDataUpload.append('file', file?.file as any);
            });
            const response = await MediaApi.fileUpload(formDataUpload);
            console.log(response);

            return response;
        }
        return fileUpload;
    };
    return {
        filePreview,
        setFilePreview,
        onChangeFiles,
        onRemoveFile,
        onUpload,
    };
};
