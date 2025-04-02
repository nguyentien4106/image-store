import { Cloud, MessageSquare } from "lucide-react"
import { StorageSource } from "@/constants/enum"

export function getStorageSourceIcon(source: StorageSource) {
  switch (source) {
    case StorageSource.R2:
      return <Cloud className="h-4 w-4 text-blue-500" />
    case StorageSource.Telegram:
      return <MessageSquare className="h-4 w-4 text-sky-500" />
    default:
      return <Cloud className="h-4 w-4 text-gray-500" />
  }
} 