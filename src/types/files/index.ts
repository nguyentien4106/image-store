export interface UploadFileFormData {
    file: File
    userName: string
    storageSource: number
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
    url: string
    userId: string
    createdAt: string
}
