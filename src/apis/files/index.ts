import { api } from "@/services/api";
import { DeleteFileRequest, DownloadFileRequest, FileInformation, UploadFileFormData } from "@/types/files";
import { AppResponse, PaginatedResult } from "@/types";
import { AxiosProgressEvent } from "axios";

export interface File {
  id: string
  filename: string
  url: string
  createdAt: string
  userId: string
  username: string
}
// Interface for progress tracking
interface DownloadProgress {
  percentage: number;
  loaded: number;
  total: number;
}

const apiPath = {
  uploadFile: "/files/",
  getUserFiles: "/files/users",
  deleteFile: "/files",
  downloadFile: "/files/download",
  downloadFileLarge: "/files/download-large-file",
}

const fileApi = {
  /**
   * Upload a new image
   * @param file The image file to upload
   * @returns Promise with upload response
   */
  uploadFile: async (data: UploadFileFormData): Promise<AppResponse<FileInformation>> => {
    try{
      const formData = new FormData()
    formData.append('file', data.file)
    formData.append('userName', data.userName)
    formData.append('storageSource', data.storageSource.toString())
    formData.append('accountType', data.accountType)
    
    const response = await api.post<AppResponse<FileInformation>>(
      apiPath.uploadFile + data.accountType.toLowerCase(), 
      formData, 
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 6000000, // 10 minutes to handle large files
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            data.onProgress(percentCompleted);
          }
        }
      }
    )

      return response.data
    } catch (error: any) {
      return error.response.data 
    }
  },

  /**
   * Get all files for a specific user
   * @param username The username to get files for
   * @returns Promise with array of files
   */
  getUserFiles: async (username: string): Promise<AppResponse<PaginatedResult<FileInformation>>> => {
    const response = await api.get<AppResponse<PaginatedResult<FileInformation>>>(`${apiPath.getUserFiles}/${username}?pageIndex=${0}&pageSize=${20}`)
    return response.data
  },

  /**
   * Delete a file by its id
   * @param id The id of the file to delete
   * @returns Promise with delete response  
   */
  deleteFile: async (request: DeleteFileRequest): Promise<AppResponse<string>> => {
    const response = await api.delete<AppResponse<string>>(apiPath.deleteFile, { data: request })
    return response.data
  },

  /**
   * Download a file by its id
   * @param id The id of the file to download
   * @param storageSource The storage source of the file
   * @returns Promise<void> - Triggers browser download
   */
  downloadFile: async (data: DownloadFileRequest): Promise<void> => {
    const response = await api.post(apiPath.downloadFile, data, {
      responseType: 'blob',
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if (progressEvent.total) {
          const progress: DownloadProgress = {
            percentage: Math.round((progressEvent.loaded * 100) / progressEvent.total),
            loaded: progressEvent.loaded,
            total: progressEvent.total
          };
          data?.onProgress?.(progress.percentage)
        }
      }
    });

    const contentDisposition = response.headers['content-disposition'];
    let fileName = 'downloaded-file';
    if (contentDisposition && contentDisposition.includes('filename=')) {
      const match = contentDisposition.match(/filename="([^"]+)"/) || contentDisposition.match(/filename=([^;]+)/);;
      if (match) {
        fileName = decodeURIComponent(match[1])
      }
    }

    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
  },

  downloadFileTest: async (data: DownloadFileRequest): Promise<void> => {
    const response = await api.post(apiPath.downloadFileLarge, data, {
      responseType: 'blob',
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if (progressEvent.total) {
          const progress: DownloadProgress = {
            percentage: Math.round((progressEvent.loaded * 100) / progressEvent.total),
            loaded: progressEvent.loaded,
            total: progressEvent.total
          };
          
          console.log(`Download Progress: ${progress.percentage}%`);
        }
      }
    });
  // Create download link from streamed blob
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'a.mov');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
  }
}

export default fileApi
