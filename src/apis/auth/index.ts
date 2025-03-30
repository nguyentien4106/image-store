import type { AuthToken, LoginRequest, SignUpRequest, User } from "@/types/auth";
import { api } from "@/services/api";
import Cookies from "js-cookie";
import { AppResponse } from "@/types/response";

const ACCESS_TOKEN_NAME = "accessToken";
const REFRESH_TOKEN_NAME = "refreshToken";
const twentyMinutes = 1/72;
const sevenDays = 7;
export const authApi = {
  async login(request: LoginRequest): Promise<AppResponse<AuthToken>> {
    const { data } = await api.post("/auth/login", request);

    if(data.succeed){
      Cookies.set(ACCESS_TOKEN_NAME, data.data.accessToken, { expires: twentyMinutes }); // 20 minutes
      Cookies.set(REFRESH_TOKEN_NAME, data.data.refreshToken, { expires: sevenDays });
    }

    return data;
  },

  async signup(request: SignUpRequest): Promise<AppResponse<boolean>> {
    const { data } = await api.post("/auth/register", request);

    return data;
  },

  logout() {
    Cookies.remove(ACCESS_TOKEN_NAME);
    Cookies.remove(REFRESH_TOKEN_NAME);
  },

  getAccessToken(): string | undefined {
    return Cookies.get(ACCESS_TOKEN_NAME);
  },

  getRefreshToken(): string | undefined {
    return Cookies.get(REFRESH_TOKEN_NAME);
  },

  async refreshAccessToken(): Promise<void> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const { data } = await api.post('/auth/refresh-token', { refreshToken });
        Cookies.set(ACCESS_TOKEN_NAME, data.accessToken, { expires: twentyMinutes });
    } catch (error) {
      this.logout();
      throw error;
    }
  }
};

// Add request interceptor to include token
api.interceptors.request.use((config) => {
  const token = authApi.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        await authApi.refreshAccessToken();
        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
