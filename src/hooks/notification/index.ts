import { NotificationContext } from "@/contexts/notification"
import { useContext } from "react"

export function useNotification() {
    const context = useContext(NotificationContext)
    if (context === undefined) {
      throw new Error('useNotification must be used within a NotificationProvider')
    }
    return context
  } 