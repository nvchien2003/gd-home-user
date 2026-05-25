import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { PaginationParams } from "../../../api/api.types";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12;

const readNumber = (value: string | null) => {
  if (!value) return undefined;
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : undefined;
};

const setParam = (params: URLSearchParams, key: string, value: string | number | undefined) => {
  if (value === undefined || value === "") {
    params.delete(key);
    return;
  }

  params.set(key, String(value));
};

export const usePropertyFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo<PaginationParams>(() => ({
    page: readNumber(searchParams.get("page")) ?? DEFAULT_PAGE,
    limit: readNumber(searchParams.get("limit")) ?? DEFAULT_LIMIT,
    search: searchParams.get("search") || undefined,
    location: searchParams.get("location") || undefined,
    type: searchParams.get("type") || undefined,
    minPrice: readNumber(searchParams.get("minPrice")),
    maxPrice: readNumber(searchParams.get("maxPrice")),
    beds: readNumber(searchParams.get("beds")),
    baths: readNumber(searchParams.get("baths")),
    sortBy: searchParams.get("sortBy") || undefined,
    order: searchParams.get("order") === "asc" ? "asc" : searchParams.get("order") === "desc" ? "desc" : undefined,
  }), [searchParams]);

  const updateFilters = useCallback((updates: Partial<PaginationParams>, resetPage = true) => {
    const next = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      setParam(next, key, value as string | number | undefined);
    });

    if (resetPage) {
      next.set("page", String(DEFAULT_PAGE));
    }

    setSearchParams(next, { replace: false });
  }, [searchParams, setSearchParams]);

  const setPage = useCallback((page: number) => {
    updateFilters({ page }, false);
  }, [updateFilters]);

  const resetFilters = useCallback(() => {
    setSearchParams({ page: String(DEFAULT_PAGE), limit: String(filters.limit ?? DEFAULT_LIMIT) });
  }, [filters.limit, setSearchParams]);

  return {
    filters,
    updateFilters,
    setPage,
    resetFilters,
  };
};
