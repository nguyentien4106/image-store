export interface UploadFileFormData {
    file: File
    userName: string
    storageSource: number
    accountType: string
    onProgress: (percentCompleted: number) => void;
}

export interface DeleteFileRequest{
    id: string
    storageSource: number
}

export interface DownloadFileRequest{
    id: string
    storageSource: number
    onProgress?: (percentCompleted: number) => void;
}

export interface DownloadFileResponse{
    filePath: string
    contentType: string
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

export interface PreviewFileResponse{
    fileId: string
    url: string
    expiresAt: Date
}

export interface GetFilesByUserNameRequest{
    pageIndex: number
    pageSize: number
    storageSource: number
}