import { Login, SignUp } from '@/pages/auth'

export const authRoutes = [
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'signup',
    element: <SignUp />,
  },
] 