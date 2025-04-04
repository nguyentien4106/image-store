import { createBrowserRouter } from 'react-router-dom'
import { authRoutes } from './auth'
import { dashboardRoutes } from './dashboard'
import { fileRoutes } from './files'
import ErrorPage from '@/pages/error'
import HomePage from '@/pages/home'
import { ProtectedLayout } from '@/layouts/protected-layout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    children: authRoutes,
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [...dashboardRoutes, ...fileRoutes],
    errorElement: <ErrorPage />,
  },
])