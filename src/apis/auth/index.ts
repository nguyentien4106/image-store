import type { AuthToken, LoginRequest, SignUpRequest, User } from "@/types/auth";
import { api } from "@/services/api";
import Cookies from "js-cookie";
import { AppResponse } from "@/types";

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

  getCurrentUser(): User | null {
    const token = this.getAccessToken();
    if (!token) return null;

    try {
      // Decode the JWT token (it's in base64 format)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
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

  async refreshAccessToken(): Promise<AppResponse<AuthToken>> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const { data } = await api.post('/auth/refresh-token', { refreshToken });

      if(data.succeed){
        Cookies.set(ACCESS_TOKEN_NAME, data.data.accessToken, { expires: twentyMinutes }); // 20 minutes
        Cookies.set(REFRESH_TOKEN_NAME, data.data.refreshToken, { expires: sevenDays });
      }

      return data

    } catch (error) {
      this.logout();
      throw error;
    }
  }
};

