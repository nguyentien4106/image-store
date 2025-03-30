export interface AppResponse<T> {
  succeed: boolean
  message: string
  data: T
}
