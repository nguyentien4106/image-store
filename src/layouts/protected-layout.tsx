import { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { authApi } from '@/apis/auth'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { setUser } from '@/store/slices/userSlice'
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AUTH_PATH } from '@/constants/path'

export function ProtectedLayout() {
  const navigate = useNavigate()
  const { user } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = authApi.getAccessToken()
      const refreshToken = authApi.getRefreshToken()
      console.log(accessToken, refreshToken)
      if (!accessToken && !refreshToken) {
        dispatch(setUser(null))
        navigate(AUTH_PATH.login)
        return
      }

      if (!accessToken && refreshToken) {
        try {
          await authApi.refreshAccessToken()
        } catch (error) {
          navigate(AUTH_PATH.login)
          return
        }
      }

      const userInfo = authApi.getCurrentUser()
      if (userInfo) {
        dispatch(setUser(userInfo))
      }
    }

    checkAuth()
  }, [dispatch, navigate])

  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar variant="inset" />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
} 