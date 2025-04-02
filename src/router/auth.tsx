import { Login, SignUp } from '@/pages/auth'
import { AUTH_PATH } from '@/constants/path'

export const authRoutes = [
  {
    path: AUTH_PATH.login,
    index: true,
    element: <Login />,
  },
  {
    path: AUTH_PATH.signup,
    element: <SignUp />,
  },
] 