import { useEffect, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { authApi } from '@/apis/auth'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import type { User } from '@/types/auth'

export function ProtectedLayout() {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)

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
          return
        }
      }

      // Get user information from token
      const userInfo = authApi.getCurrentUser()
      if (userInfo) {
        setUser(userInfo)
      }
    }

    checkAuth()
  }, [])

  const handleLogout = () => {
    authApi.logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary">EStore</h1>
          <div className="flex items-center gap-4">
            {user && (
              <>
                <span className="text-sm text-muted-foreground">{user.email}</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="container mx-auto py-6">
        <Outlet />
      </main>
    </div>
  )
} 