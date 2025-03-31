export interface AppResponse<T> {
  succeed: boolean
  message: string
  data: T
}

export interface LoadingState {
  isLoading: boolean
  loadingText?: string
} 