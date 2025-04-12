import { Upgrade, PaymentCallback } from '@/pages/payment'

export const paymentRoutes = [
  {
    path: 'payment',
    element: <Upgrade />,
  },
  {
    path: 'payment/callback',
    element: <PaymentCallback />,
  },
  // Add other dashboard-related routes here
] 