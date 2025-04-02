export interface UploadFileFormData {
    file: File
    userName: string
}

export interface R2File {
    url: string
    fileName: string
}

export interface FileInformation{
    id: string
    fileName: string
    fileSize: number
    url: string
    userId: string
    createdAt: Date
}
