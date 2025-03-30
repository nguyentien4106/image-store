import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { Button } from '../components/ui/button'

interface MainLayoutProps {
  children?: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Image Store</h1>
            <nav className="flex items-center space-x-4">
              <Button variant="ghost">Home</Button>
              <Button variant="ghost">Gallery</Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container py-6">
        {children || <Outlet />}
      </main>
    </div>
  )
} 