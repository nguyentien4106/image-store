import { createContext, useContext } from 'react'
import { toast, Toaster } from 'sonner'

type NotificationType = 'success' | 'error' | 'info' | 'warning'

interface NotificationContextType {
  showNotification: (message: string, type: NotificationType) => void
  success: (message: string) => void
  error: (message: string) => void
  info: (message: string) => void
  warning: (message: string) => void
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const showNotification = (message: string, type: NotificationType) => {
    switch (type) {
      case 'success':
        toast.success(message)
        break
      case 'error':
        toast.error(message)
        break
      case 'info':
        toast.info(message)
        break
      case 'warning':
        toast.warning(message)
        break
    }
  }

  const success = (message: string) => showNotification(message, 'success')
  const error = (message: string) => showNotification(message, 'error')
  const info = (message: string) => showNotification(message, 'info')
  const warning = (message: string) => showNotification(message, 'warning')

  return (
    <NotificationContext.Provider value={{ showNotification, success, error, info, warning }}>
      {children}
      <Toaster richColors position="top-right" />
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
} 