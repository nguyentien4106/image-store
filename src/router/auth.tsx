import { Login, SignUp } from '@/pages/auth'
import { AUTH_PATH } from '@/constants/path'
import RegisterConfirmation from '@/pages/auth/register-confirmation'
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
  {
    path: AUTH_PATH.registerConfirmation,
    element: <RegisterConfirmation />,
  },
] 