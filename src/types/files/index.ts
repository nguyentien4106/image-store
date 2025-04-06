export interface UploadFileFormData {
    file: File
    userName: string
    storageSource: number
}

export interface DeleteFileRequest{
    id: string
    storageSource: number
}

export interface DownloadFileRequest{
    id: string
    storageSource: number
}

export interface DownloadFileResponse{
    filePath: string
    contentType: string
}

export interface R2File {
    url: string
    fileName: string
}

export interface FileInformation{
    id: string
    fileName: string
    fileSize: number
    fileType: number
    storageSource: number
    contentType: string
    url: string
    userId: string
    createdAt: string
}
