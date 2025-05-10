export interface User {
    userId: string
    userName: string
    email: string
    accountType: string
    firstName: string
    lastName: string
    aud: string
    exp: number
    iss: string
}
  
export interface AuthToken {
  accessToken: string
  refreshToken: string
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

export interface ConfirmRegistrationRequest {
    userId: string;
    token: string;
}
