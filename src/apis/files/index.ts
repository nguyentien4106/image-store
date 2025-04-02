import { api } from "@/services/api";
import { FileInformation, R2File, UploadFileFormData } from "@/types/files";
import { AppResponse } from "@/types";
import { StorageSource } from "@/constants/enum";

export interface File {
  id: string
  filename: string
  url: string
  createdAt: string
  userId: string
  username: string
}

const apiPath = {
  uploadFile: "/files",
  uploadFileTelegram: "/files/telegram",
  getFileByFilename: "/files",
  getUserFiles: "/files/users",
  deleteFile: "/files",
}

const fileApi = {
  /**
   * Upload a new image
   * @param file The image file to upload
   * @returns Promise with upload response
   */
  uploadFile: async (data: UploadFileFormData): Promise<AppResponse<FileInformation>> => {
    const formData = new FormData()
    formData.append('file', data.file)
    formData.append('userName', data.userName)
    const url = data.storageSource === StorageSource.R2 ? apiPath.uploadFile : apiPath.uploadFileTelegram
    const response = await api.post<AppResponse<FileInformation>>(url, formData, {
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
  getFileByFilename: async (filename: string): Promise<FileInformation> => {
    const response = await api.get<FileInformation>(`${apiPath.getFileByFilename}?fileName=${filename}`)
    return response.data
  },

  /**
   * Get all files for a specific user
   * @param username The username to get files for
   * @returns Promise with array of files
   */
  getUserFiles: async (username: string): Promise<AppResponse<FileInformation[]>> => {
    const response = await api.get<AppResponse<FileInformation[]>>(`${apiPath.getUserFiles}/${username}`)
    return response.data
  },

  /**
   * Delete a file by its id
   * @param id The id of the file to delete
   * @returns Promise with delete response  
   */
  deleteFile: async (id: string, storageSource: number): Promise<AppResponse<FileInformation>> => {
    const response = await api.delete<AppResponse<FileInformation>>(`${apiPath.deleteFile}?id=${id}&storageSource=${storageSource}`)
    return response.data
  }
}

export default fileApi
