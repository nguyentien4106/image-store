import { createBrowserRouter } from 'react-router-dom'
import { ProtectedLayout } from '@/layouts/protected-layout'
import { PublicLayout } from '@/layouts/public-layout'
import { authRoutes } from './auth'
import { dashboardRoutes } from './dashboard'
import { imageRoutes } from './images'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: authRoutes,
  },
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [...dashboardRoutes, ...imageRoutes],
  },
]) 