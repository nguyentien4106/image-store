import { useEffect, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { authApi } from '@/apis/auth'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import type { User } from '@/types/auth'
import { AUTH_PATH, HOME_PATH } from '@/constants/path'

export function ProtectedLayout() {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = authApi.getAccessToken()
      const refreshToken = authApi.getRefreshToken()

      if (!accessToken && !refreshToken) {
        navigate(AUTH_PATH.login)
        return
      }

      // If we have a refresh token but no access token, try to refresh
      if (!accessToken && refreshToken) {
        try {
          await authApi.refreshAccessToken()
        } catch (error) {
          navigate(AUTH_PATH.login)
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
    navigate(HOME_PATH.home)
  }

  const truncateEmail = (email: string) => {
    const atIndex = email.indexOf('@')
    if (atIndex === -1) return email

    const username = email.substring(0, atIndex)
    const domain = email.substring(atIndex)
    
    // Show first 30% of username + @domain
    const truncatedUsername = username.substring(0, Math.ceil(username.length * 0.3))
    return `${truncatedUsername}...${domain}`
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto h-16 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary">EStore</h1>
          <div className="flex items-center gap-1">
            {user && (
              <>
                <span className="text-sm text-muted-foreground">
                  <span className="md:hidden">{truncateEmail(user.email)}</span>
                  <span className="hidden md:inline">{user.email}</span>
                </span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
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