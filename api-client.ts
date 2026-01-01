import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// Auto-generated TypeScript types from OpenAPI specification
// Test API v1.0.0

export interface RequestConfig {
  signal?: AbortSignal;
  headers?: Record<string, string>;
  timeout?: number;
}

export interface User {
  id: string; /** User ID */
  email: string; /** User email */
  name: string; /** User name */
  createdAt?: string; /** Creation timestamp */
}

export interface CreateUserInput {
  email: string;
  name: string;
}


export class TestAPIService {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;
  private axios: AxiosInstance;

  constructor(config?: {
    baseUrl?: string;
    headers?: Record<string, string>;
  }) {
    this.baseUrl = config?.baseUrl || 'https://api.example.com';
    this.defaultHeaders = config?.headers || {};
    this.axios = axios.create({
      baseURL: this.baseUrl,
    });
  }

  private buildUrl(path: string): string {
    return `${this.baseUrl.replace(/\/$/, '')}${path}`;
  }

/**
 * List all users
 * @ HTTP GET /users
 */
async getUsers(params: {
  query?: {
    limit?: number;
  };
  }, config?: RequestConfig): Promise<User[]> {
  const url = this.buildUrl('/users'
  );
  const queryString = new URLSearchParams();
  if (params.query) {
    if (params.query.limit !== undefined) {
      queryString.append('limit', String(params.query.limit));
    }
  }
  const fullUrl = queryString.toString() ? `${url}?${queryString}` : url;
  const headers = {
    'Content-Type': 'application/json',
    ...this.defaultHeaders,
    ...config?.headers,
  };
  const response = await this.axios.get(fullUrl, {
    headers,
    signal: config?.signal,
  });
  return response.data as User[];
}

/**
 * Create a new user
 * @ HTTP POST /users
 */
async createUser(params: {
  body: CreateUserInput;
  }, config?: RequestConfig): Promise<User> {
  const url = this.buildUrl('/users'
  );
  const fullUrl = url;
  const headers = {
    'Content-Type': 'application/json',
    ...this.defaultHeaders,
    ...config?.headers,
  };
  const response = await this.axios.post(fullUrl, {
    data: params.body,
    headers,
    signal: config?.signal,
  });
  return response.data as User;
}

/**
 * Get user by ID
 * @ HTTP GET /users/{userId}
 */
async getUserById(params: {
  userId: string;
  }, config?: RequestConfig): Promise<User> {
  const url = this.buildUrl('/users/{userId}'
    .replace('{userId}', encodeURIComponent(String(params.userId)))
  );
  const fullUrl = url;
  const headers = {
    'Content-Type': 'application/json',
    ...this.defaultHeaders,
    ...config?.headers,
  };
  const response = await this.axios.get(fullUrl, {
    headers,
    signal: config?.signal,
  });
  return response.data as User;
}

}