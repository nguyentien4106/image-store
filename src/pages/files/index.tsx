import { useEffect, useState } from "react"
import { ListFiles } from "@/components/files/list-files"
import { UploadButton } from "@/components/files/upload-button"
import { useNotification } from "@/hooks/notification"
import fileApi from "@/apis/files"
import { RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import { FileInformation } from "@/types/files"
import { useDownloadFile } from "@/hooks/files"
import { setLoading } from "@/store/slices/loadingSlice"
import { StorageSource } from "@/constants/enum"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export default function FilesPage() {
    const { success, error } = useNotification()
    const { downloadFile } = useDownloadFile()
    const { user } = useSelector((state: RootState) => state.user)
    const [files, setFiles] = useState<FileInformation[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [storageSource, setStorageSource] = useState(StorageSource.R2)
    
    const dispatch = useDispatch()

    useEffect(() => {
        if (user?.userName) {
            fileApi.getUserFiles(user?.userName).then((res) => {
                setFiles(res.data)
                setIsLoading(false)
            })
        }
    }, [])

    const handleDelete = async (id: string, source: number) => {
        if(user?.userName){
            try {
                dispatch(setLoading({ isLoading: true }))
                const result = await fileApi.deleteFile(id, source)
                if (result.succeed) {
                    setFiles(files.filter(file => file.id !== id))
                    success("File deleted successfully")
                } else {
                    error(result.message)
                }
            } catch (err) {
                error("Failed to delete file") 
            } finally {
                dispatch(setLoading({ isLoading: false }))
            }
        }
    }

    const handleDownload = async (url: string) => {
        await downloadFile(url)
    }

    const handleUpload = async (file: File) => {
        if(user?.userName){
            try {
                dispatch(setLoading({ isLoading: true }))
                const res = await fileApi.uploadFile({
                    file: file,
                    userName: user?.userName,
                    storageSource: storageSource
                })
                if (res.succeed) {
                    setFiles([res.data, ...files])
                    success("File uploaded successfully")
                } else {
                    error(res.message)
                }
            } catch (err) {
                error("Failed to upload file")
            } finally {
                dispatch(setLoading({ isLoading: false }))
            }
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Files</h1>
                <div className="flex items-center gap-4">
                    <Select defaultValue={StorageSource.R2.toString()} onValueChange={(value) => setStorageSource(Number(value))}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select storage" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={StorageSource.R2.toString()}>Cloudflare R2</SelectItem>
                            <SelectItem value={StorageSource.Telegram.toString()}>Telegram</SelectItem>
                        </SelectContent>
                    </Select>
                    <UploadButton onUpload={handleUpload} />
                </div>
            </div>
            <ListFiles
                files={files}
                onDelete={handleDelete}
                onDownload={handleDownload}
                isLoading={isLoading}
            />
        </div>
    )
} 