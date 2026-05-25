export interface ApiResponse<T> {
  success?: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success?: boolean;
  data: T[];
  meta: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
}

export const unwrapData = <T>(response: { data: ApiResponse<T> }) => response.data.data;

export const unwrapPaginated = <T>(response: { data: PaginatedResponse<T> }) => response.data;
