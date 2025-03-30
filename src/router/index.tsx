import { createBrowserRouter } from 'react-router-dom'
import { ProtectedLayout } from '@/layouts/ProtectedLayout'
import { PublicLayout } from '@/layouts/PublicLayout'
import { authRoutes } from './auth'
import { dashboardRoutes } from './dashboard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: authRoutes,
  },
  {
    path: '/',
    element: <ProtectedLayout />,
    children: dashboardRoutes,
  },
]) 