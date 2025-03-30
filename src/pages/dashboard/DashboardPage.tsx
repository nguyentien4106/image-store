import { Button } from '@/components/ui/button'
import { authApi } from '@/apis/auth'
import { useNavigate } from 'react-router-dom'

export function DashboardPage() {
  const navigate = useNavigate()

  const handleLogout = () => {
    authApi.logout()
    navigate('/login')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div className="grid gap-4">
        <div className="rounded-lg border p-4">
          <h2 className="text-xl font-semibold mb-2">Welcome to your dashboard</h2>
          <p className="text-muted-foreground">
            This is a protected page. You can only see this if you're authenticated.
          </p>
        </div>
      </div>
    </div>
  )
} 