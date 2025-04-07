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