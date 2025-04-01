import FilesPage from '@/pages/files'
import { FILES_PATH } from '@/constants/path'

export const fileRoutes = [
  {
    path: FILES_PATH.files,
    element: <FilesPage />,
  },
] 