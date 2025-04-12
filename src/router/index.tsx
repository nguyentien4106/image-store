import { createBrowserRouter } from 'react-router-dom'
import { authRoutes } from './auth'
import { dashboardRoutes } from './dashboard'
import { fileRoutes } from './files'
import ErrorPage from '@/pages/error'
import HomePage from '@/pages/home'
import { ProtectedLayout } from '@/layouts/protected-layout'
import AuthLayout from '@/layouts/auth-layout'
import { paymentRoutes } from './payment'
import PricingPage from '@/pages/pricing'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: authRoutes,
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [...dashboardRoutes, ...fileRoutes],
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [...paymentRoutes],
    errorElement: <ErrorPage />,
  },
  {
    path: '/pricing',
    element: <PricingPage />,
    errorElement: <ErrorPage />,
  },
])