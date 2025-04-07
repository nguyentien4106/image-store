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
                setFiles(res.data.data)
                setIsLoading(false)
            })
        }
    }, [])

    const handleDelete = async (id: string, source: number) => {
        if(user?.userName){
            try {
                dispatch(setLoading({ isLoading: true }))
                const result = await fileApi.deleteFile({
                    id: id,
                    storageSource: source
                })
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

    const handleDownload = async (id: string, storageSource: StorageSource, fileName: string) => {
        if(user?.userName){
            if(storageSource == StorageSource.Telegram){
                await fileApi.downloadFile({ id, storageSource })
            }
            else {
                const result = await fileApi.downloadFile({ id, storageSource });
                if(result){
                    await downloadFile(result.data.filePath, result.data.contentType, fileName)
                }
                else {
                    error("Failed to download file")
                }

            }
        }
    }

    const handleUpload = async (file: File) => {
        if(user?.userName){
            try {
                dispatch(setLoading({ isLoading: true, isSmall: true, loadingText: "Uploading file" }))
                const res = await fileApi.uploadFile({
                    file: file,
                    userName: user?.userName,
                    storageSource: storageSource
                })
                if (res.succeed) {
                    console.log(res.data)
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