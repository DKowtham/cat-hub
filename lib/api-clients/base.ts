import { ApiClientConfig, ApiResponse, ApiError, ApiEndpoint } from "@/types";

export class BaseApiClient {
  private config: ApiClientConfig;

  constructor(config: ApiClientConfig) {
    this.config = config;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.config.baseURL}${endpoint}`;
    const headers = {
      ...this.config.headers,
      ...options.headers,
    };

    // Add API key if available
    if (this.config.apiKey) {
      headers["Authorization"] = `Token ${this.config.apiKey}`;
    }

    const requestOptions: RequestInit = {
      ...options,
      headers,
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        this.config.timeout || 5000
      );

      const response = await fetch(url, {
        ...requestOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        const error: ApiError = {
          message: data.message || "Request failed",
          status: response.status,
          statusText: response.statusText,
          data,
        };
        throw error;
      }

      return {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      };
    } catch (error) {
      if (error && typeof error === "object" && "message" in error) {
        throw error;
      }

      if (error.name === "AbortError") {
        const timeoutError: ApiError = {
          message: "Request timeout",
          status: 408,
          statusText: "Request Timeout",
        };
        throw timeoutError;
      }

      const networkError: ApiError = {
        message: error.message || "Network error",
        status: 0,
        statusText: "Network Error",
      };
      throw networkError;
    }
  }

  async get<T>(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<ApiResponse<T>> {
    let url = endpoint;

    // Add query parameters
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          searchParams.append(key, String(value));
        }
      });

      if (searchParams.toString()) {
        url += `?${searchParams.toString()}`;
      }
    }

    return this.makeRequest<T>(url, {
      method: "GET",
    });
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: "DELETE",
    });
  }

  // Execute a request based on an endpoint definition
  async executeEndpoint<T>(
    endpoint: ApiEndpoint,
    params?: {
      queryParams?: Record<string, any>;
      bodyParams?: Record<string, any>;
      pathParams?: Record<string, string>;
    }
  ): Promise<ApiResponse<T>> {
    let path = endpoint.path;

    // Replace path parameters
    if (params?.pathParams) {
      Object.entries(params.pathParams).forEach(([key, value]) => {
        path = path.replace(`{${key}}`, value);
      });
    }

    // Handle different HTTP methods
    switch (endpoint.method) {
      case "GET":
        return this.get<T>(path, params?.queryParams);
      case "POST":
        return this.post<T>(path, params?.bodyParams);
      case "PUT":
        return this.put<T>(path, params?.bodyParams);
      case "PATCH":
        return this.patch<T>(path, params?.bodyParams);
      case "DELETE":
        return this.delete<T>(path);
      default:
        const methodError: ApiError = {
          message: `Unsupported HTTP method: ${endpoint.method}`,
          status: 400,
          statusText: "Bad Request",
        };
        throw methodError;
    }
  }
}
