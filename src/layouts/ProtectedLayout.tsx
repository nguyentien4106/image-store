import { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { authApi } from '@/apis/auth'

export function ProtectedLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = authApi.getAccessToken()
      const refreshToken = authApi.getRefreshToken()

      if (!accessToken && !refreshToken) {
        navigate('/login')
        return
      }

      // If we have a refresh token but no access token, try to refresh
      if (!accessToken && refreshToken) {
        try {
          await authApi.refreshAccessToken()
        } catch (error) {
          navigate('/login')
        }
      }
    }

    checkAuth()
  }, [navigate])

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-6">
        <Outlet />
      </main>
    </div>
  )
} 