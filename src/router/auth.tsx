import { LOGIN_PATH } from '@/constants/path'
import { Login, SignUp } from '@/pages/auth'

export const authRoutes = [
  {
    path: LOGIN_PATH.login,
    element: <Login />,
  },
  {
    path: LOGIN_PATH.signup,
    element: <SignUp />,
  },
] 