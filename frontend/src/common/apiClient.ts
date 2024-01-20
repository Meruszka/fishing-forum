import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { User } from '../providers/currentUser/currentUser.type';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse extends AxiosResponse {
  token?: string;
  error?: string;
}

export class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:5000',
    });

    // Interceptor to attach the JWT token to every request
    this.axiosInstance.interceptors.request.use(async (config) => {
      const token = await this.getValidToken();
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    });

    // Example interceptor for handling responses or refreshing tokens
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          return this.axiosInstance(originalRequest);
        }

        return Promise.reject(error);
      }
    );
  }


  private async getValidToken(): Promise<string | null> {
    const token = localStorage.getItem('token');

    if (!token) {
      return null;
    }

    return token;
  }

  private isTokenValid(): boolean {
    return true;
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    const res = token ? this.isTokenValid() : false;
    return res;
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config);
  }

  public async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  public async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    console.log(data)
    return this.axiosInstance.put<T>(url, data, config);
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config);
  }

  public async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.patch<T>(url, data, config);
  }

  public async login(data: LoginRequest): Promise<LoginResponse> {
    const res: LoginResponse = await this.axiosInstance.post('/user/login', data);
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
    }
    return res;
  }

  public logout(): void {
    localStorage.removeItem('token');
  }

  public async register(data: LoginRequest): Promise<LoginResponse> {
    const res: LoginResponse = await this.axiosInstance.post('/user/register', data);
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
    }
    return res;
  }

  public async getCurrentUser(): Promise<AxiosResponse<User>> {
    return this.get<User>('/user/self');
  }
}

export default new ApiClient();
