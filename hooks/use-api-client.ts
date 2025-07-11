import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BaseApiClient } from "@/lib/api-clients/base";
import { ApiEndpoint, ApiResponse, ApiError } from "@/types";

interface UseApiClientOptions {
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
}

interface UseApiClientParams {
  queryParams?: Record<string, any>;
  bodyParams?: Record<string, any>;
  pathParams?: Record<string, string>;
}

export const useApiClient = (client: BaseApiClient, endpoint: ApiEndpoint) => {
  const queryClient = useQueryClient();

  // Query for GET requests
  const useEndpointQuery = (
    params?: UseApiClientParams,
    options?: UseApiClientOptions
  ) => {
    return useQuery({
      queryKey: [endpoint.id, params],
      queryFn: async () => {
        const response = await client.executeEndpoint(endpoint, params);
        return response;
      },
      enabled: options?.enabled ?? true,
      staleTime: options?.staleTime ?? 5 * 60 * 1000, // 5 minutes
      gcTime: options?.cacheTime ?? 10 * 60 * 1000, // 10 minutes
    });
  };

  // Mutation for POST, PUT, PATCH, DELETE requests
  const useEndpointMutation = () => {
    return useMutation({
      mutationFn: async (params?: UseApiClientParams) => {
        const response = await client.executeEndpoint(endpoint, params);
        return response;
      },
      onSuccess: () => {
        // Invalidate related queries
        queryClient.invalidateQueries({ queryKey: [endpoint.id] });
      },
    });
  };

  return {
    useEndpointQuery,
    useEndpointMutation,
  };
};

// Generic hook for any API endpoint
export const useGenericApiQuery = <T = any>(
  client: BaseApiClient,
  endpoint: ApiEndpoint,
  params?: UseApiClientParams,
  options?: UseApiClientOptions
) => {
  return useQuery<ApiResponse<T>, ApiError>({
    queryKey: [endpoint.id, params],
    queryFn: async () => {
      const response = await client.executeEndpoint<T>(endpoint, params);
      return response;
    },
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime ?? 5 * 60 * 1000,
    gcTime: options?.cacheTime ?? 10 * 60 * 1000,
  });
};

// Generic mutation hook
export const useGenericApiMutation = <T = any>(
  client: BaseApiClient,
  endpoint: ApiEndpoint
) => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<T>, ApiError, UseApiClientParams>({
    mutationFn: async (params) => {
      const response = await client.executeEndpoint<T>(endpoint, params);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [endpoint.id] });
    },
  });
};

// Hook for testing API endpoints
export const useTestApiEndpoint = (
  client: BaseApiClient,
  endpoint: ApiEndpoint
) => {
  return useMutation<ApiResponse<any>, ApiError, UseApiClientParams>({
    mutationFn: async (params) => {
      const response = await client.executeEndpoint(endpoint, params);
      return response;
    },
  });
};
