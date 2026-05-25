import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { PaginationParams } from "../../../api/api.types";
import { PropertiesApi } from "../../../api/properties/properties.api";
import { queryKeys } from "../../../api/queryKeys";

export const useProperties = (params: PaginationParams) =>
  useQuery({
    queryKey: queryKeys.properties(params),
    queryFn: () => PropertiesApi.getProperties(params),
    placeholderData: keepPreviousData,
  });
