import { Outlet } from 'react-router-dom'

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-6">
        <Outlet />
      </main>
    </div>
  )
} 