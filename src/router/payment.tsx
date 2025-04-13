import { Payment, PaymentCallback } from '@/pages/payment'

export const paymentRoutes = [
  {
    path: 'payment',
    element: <Payment />,
  },
  {
    path: 'payment/callback',
    element: <PaymentCallback />,
  }
  // Add other dashboard-related routes here
] 