import { User } from '@/types/auth'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

// Helper function to parse JWT token
const parseJwtToken = (token: string): User | null => {
    try {
      const base64Url = token.split('.')[1]
      if(!base64Url){
        return null
      }
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
      const payload = JSON.parse(jsonPayload)
  
      const user: User = {    
        userId: payload.userId,
        email: payload.email,
        userName: payload.userName,
        exp: payload.exp,
        iss: payload.iss,
        aud: payload.aud,
      }
  
      return user
    } catch (error) {
      console.error('Error parsing JWT token:', error)
      return null
    }
  }

interface UserState {
  user: User | null
}

const initialState: UserState = {
  user: parseJwtToken(Cookies.get('accessToken') || ''),
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
    clearUser: (state) => {
      state.user = null
    },
  },
})


export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer
