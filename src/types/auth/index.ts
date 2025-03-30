export interface User {
    userId: string
    userName: string
    email: string
    aud: string
    exp: number
    iat: number
    iss: string
    sub: string
    role: string
    name: string
    
  }
  
  export interface AuthToken {
    accessToken: string
    refreshToken: string
  }
  
  export interface AuthState {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    error: string | null
  }

export interface SignUpRequest{
    email: string
    userName: string
    password: string
    phoneNumber: string
    firstName: string
    lastName: string
}

export interface LoginRequest{
    email: string
    password: string
}