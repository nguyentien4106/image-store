import type { AuthToken, LoginRequest, SignUpRequest, User, ConfirmRegistrationRequest } from "@/types/auth";
import { api } from "@/config/api";
import Cookies from "js-cookie";
import { AppResponse } from "@/types";
import { jwtDecode } from "jwt-decode";

const ACCESS_TOKEN_NAME = "estore-accessToken";
const REFRESH_TOKEN_NAME = "estore-refreshToken";

const sevenDays = 7;
const oneDay = 60 * 60 * 24;

const apiPath = {
  login: "/auth/login",
  register: "/auth/register",
  refreshToken: "/auth/refresh-token",
  confirmEmail: "/auth/confirm-email",
}

const setToken = (data: AuthToken) => {
  const user = jwtDecode<User>(data.accessToken);
  const seconds = user.exp - Date.now() / 1000;
  Cookies.set(ACCESS_TOKEN_NAME, data.accessToken, { expires: seconds / oneDay }); // 20 minutes
  Cookies.set(REFRESH_TOKEN_NAME, data.refreshToken, { expires: sevenDays });
}

const removeToken = () => {
  Cookies.remove(ACCESS_TOKEN_NAME);
  Cookies.remove(REFRESH_TOKEN_NAME);
}

export const authApi = {
  async login(request: LoginRequest): Promise<AppResponse<AuthToken>> {
    const { data } = await api.post(apiPath.login, request);

    if(data.succeed){
      setToken(data.data)
    }

    return data;
  },

  async signup(request: SignUpRequest): Promise<AppResponse<boolean>> {
    const { data } = await api.post(apiPath.register, request);
    return data;
  },

  getCurrentUser(): User | null {
    const token = this.getAccessToken();
    if (!token) return null;

    try {
      return jwtDecode<User>(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  },

  logout() {
    removeToken()
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
      const { data } = await api.post(apiPath.refreshToken, { refreshToken });

      if(data.succeed){
        setToken(data.data)
      }
      else {
        throw new Error(data.message);
      }

      return data

    } catch (error) {
      this.logout();
      throw error;
    }
  },

  confirmEmail: async (data: ConfirmRegistrationRequest): Promise<AppResponse<boolean>> => {
    const response = await api.post<AppResponse<boolean>>(apiPath.confirmEmail, data);
    return response.data;
  },
};

