import { z } from "zod";

// API Response Status Types
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers?: Record<string, string>;
}

export interface ApiError {
  message: string;
  status?: number;
  statusText?: string;
  data?: any;
}

// API Client Configuration
export interface ApiClientConfig {
  baseURL: string;
  apiKey?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

// API Client Information
export interface ApiClientInfo {
  id: string;
  name: string;
  description: string;
  baseURL: string;
  repositoryURL: string;
  docsURL: string;
  endpoints: ApiEndpoint[];
  config: ApiClientConfig;
}

// API Endpoint Definition
export interface ApiEndpoint {
  id: string;
  name: string;
  description: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  requiresAuth?: boolean;
  queryParams?: ApiParam[];
  bodyParams?: ApiParam[];
  responseSchema?: z.ZodSchema;
}

// API Parameter Definition
export interface ApiParam {
  name: string;
  type: "string" | "number" | "boolean" | "object" | "array";
  required: boolean;
  description?: string;
  defaultValue?: any;
  enum?: string[];
}

// API Request Builder
export interface ApiRequest {
  endpoint: ApiEndpoint;
  queryParams?: Record<string, any>;
  bodyParams?: Record<string, any>;
  pathParams?: Record<string, string>;
}

// Sample API Models
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

// Navigation Types
export interface NavItem {
  id: string;
  title: string;
  icon: string;
  href: string;
  description?: string;
}

// Component State Types
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
  data: any;
}

// HTTP Status Code Categories
export const HTTP_STATUS_CODES = {
  // Information responses (100–199)
  CONTINUE: 100,
  SWITCHING_PROTOCOLS: 101,

  // Successful responses (200–299)
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  // Redirection messages (300–399)
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  NOT_MODIFIED: 304,

  // Client error responses (400–499)
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,

  // Server error responses (500–599)
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

export type HttpStatusCode =
  (typeof HTTP_STATUS_CODES)[keyof typeof HTTP_STATUS_CODES];

// Utility function to get status code category
export const getStatusCodeCategory = (code: number): string => {
  if (code >= 100 && code < 200) return "Informational";
  if (code >= 200 && code < 300) return "Success";
  if (code >= 300 && code < 400) return "Redirection";
  if (code >= 400 && code < 500) return "Client Error";
  if (code >= 500 && code < 600) return "Server Error";
  return "Unknown";
};
