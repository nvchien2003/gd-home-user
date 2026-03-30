export interface AbstractInterface {
    id?: string;
    createdOnDate?: Date | string;
    lastModifiedOnDate?: Date | null;
}

export interface ResponseInterface<T> {
    data: T | null;
    code: number;
    message: string;
}