import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import fileApi from '@/apis/files'
import { queryKeys } from './index'
import type { GetFilesByUserNameRequest, UploadFileFormData, DeleteFileRequest, DownloadFileRequest } from '@/types/files'
import { StorageSource, AccountType } from '@/constants/enum'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

interface UseFilesOptions extends GetFilesByUserNameRequest {
  userName?: string
}

export function useFilesByUserName(options: UseFilesOptions) {
  const { userName, ...queryParams } = options
  
  if (!userName) {
    return {
      data: [],
      isLoading: false,
      isError: false,
    }
  }

  return useQuery({
    queryKey: queryKeys.files.list(options),
    queryFn: () => fileApi.getUserFiles(userName, queryParams),
  })
}

export function useDeleteFile() {
  const queryClient = useQueryClient()
  const { user } = useSelector((state: RootState) => state.user)

  return useMutation({
    mutationFn: (request: DeleteFileRequest) => fileApi.deleteFile(request),
    onSuccess: (_, variables) => {
      if (user?.userName) {
        // Invalidate queries for the specific storage source
        queryClient.invalidateQueries({ 
          queryKey: queryKeys.files.list({ 
            userName: user.userName,
            storageSource: variables.storageSource 
          }) 
        })
      }
    },
  })
}

export function useDownloadFile() {
  return useMutation({
    mutationFn: (request: DownloadFileRequest) => fileApi.downloadFile(request),
  })
}

export function useUploadFile() {
  const queryClient = useQueryClient()
  const { user } = useSelector((state: RootState) => state.user)

  return useMutation({
    mutationFn: (data: { file: File, onProgress?: (percentCompleted: number) => void }) => {
      if (!user?.userName) throw new Error('User not found')
      
      const formData: UploadFileFormData = {
        file: data.file,
        userName: user.userName,
        storageSource: StorageSource.R2,
        accountType: user.accountType || AccountType.Free,
        onProgress: data.onProgress || (() => {}),
      }
      return fileApi.uploadFile(formData)
    },
    onSuccess: () => {
      if (user?.userName) {
        queryClient.invalidateQueries({ 
          queryKey: queryKeys.files.list({ 
            userName: user.userName,
            storageSource: StorageSource.R2 
          }) 
        })
      }
    },
  })
} 