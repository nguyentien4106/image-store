import { api } from "@/services/api";
import { R2File, UploadFileFormData } from "@/types/files";
import { AppResponse } from "@/types";

export interface File {
  id: string
  filename: string
  url: string
  createdAt: string
  userId: string
  username: string
}

const fileApi = {
  /**
   * Upload a new image
   * @param file The image file to upload
   * @returns Promise with upload response
   */
  uploadFile: async (data: UploadFileFormData): Promise<AppResponse<R2File>> => {
    const formData = new FormData()
    formData.append('file', data.file)
    formData.append('userName', data.userName)

    const response = await api.post<AppResponse<R2File>>('/store/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  },

  /**
   * Get an image by its filename
   * @param filename The filename of the image
   * @returns Promise with image data
   */
  getFileByFilename: async (filename: string): Promise<R2File> => {
    const response = await api.get<R2File>(`/store/files/${filename}`)
    return response.data
  },

  /**
   * Get all images for a specific user
   * @param username The username to get images for
   * @returns Promise with array of images
   */
  getUserFiles: async (username: string): Promise<AppResponse<R2File[]>> => {
    const response = await api.get<AppResponse<R2File[]>>(`/store/files/users/${username}`)
    return response.data
  },

  /**
   * Delete an image by its URL
   * @param url The URL of the image to delete
   * @returns Promise with delete response  
   */
  deleteFile: async (fileName: string): Promise<AppResponse<R2File>> => {
    const response = await api.delete<AppResponse<R2File>>(`/store/files?fileName=${fileName}`)
    return response.data
  }
}

export default fileApi
