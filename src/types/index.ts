import { AccountType } from "@/constants/enum"

export interface AppResponse<T> {
  succeed: boolean
  message: string
  data: T
}

export interface LoadingState {
  isLoading: boolean
  loadingText?: string
  isSmall: boolean
} 

export interface SidebarItem {
  title: string
  href: string
  icon: React.ElementType
}

export interface PaginatedResult<T> {
  pageIndex: number,
  pageSize: number,
  count: number
  data: T[]
}

export interface Progress {
  progress: number
  name: string
  id: string
  type: "upload" | "download"
}

export interface Plan {
  type: AccountType
  name: string
  price: number
  description: string
  features: {
      title: string
      items: string[]
      icon: React.ReactNode
  }[]
}