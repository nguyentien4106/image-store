import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';

const StoresPage = lazy(() => import('@/pages/stores'));

export const storesRoutes: RouteObject[] = [
  {
    path: '/stores',
    element: <StoresPage />,
  },
]; 