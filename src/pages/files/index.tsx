import { useEffect, useState } from "react"
import { ListFiles } from "@/components/files/list-files"
import { UploadButton } from "@/components/files/upload-button"
import { AccountLimitsPanel } from "@/components/files/account-limits-panel"
import { useNotification } from "@/hooks/notification"
import fileApi from "@/apis/files"
import { RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import { FileInformation } from "@/types/files"
import { setLoading } from "@/store/slices/loadingSlice"
import { AccountType, StorageSource } from "@/constants/enum"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CrownIcon } from "lucide-react"

export default function FilesPage() {
    const { success, error } = useNotification()
    const { user } = useSelector((state: RootState) => state.user)
    const [files, setFiles] = useState<FileInformation[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [storageSource, setStorageSource] = useState(user?.accountType == AccountType.Free ? StorageSource.Telegram : StorageSource.R2)
    const [uploadProgress, setUploadProgress] = useState(0)
    
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(user)
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
                dispatch(setLoading({ isLoading: true, loadingText: "Deleting file", isSmall: true }))
                const result = await fileApi.deleteFile({
                    id: id,
                    storageSource: source
                })
                if (result.succeed) {
                    setFiles(files.filter(file => file.id !== id))
                    success("File deleted successfully")
                } else {
                    console.log(result)
                    error(result.message)
                }
            } catch (err) {
                error("Failed to delete file") 
            } finally {
                dispatch(setLoading({ isLoading: false, isSmall: false }))
            }
        }
    }

    const handleDownload = async (id: string, storageSource: StorageSource) => {
        if(user?.userName){
            await fileApi.downloadFile({ id, storageSource })
        }
    }

    const handleUpload = async (file: File) => {
        if(user?.userName){
            try {
                dispatch(setLoading({ isLoading: true, isSmall: true, loadingText: "Uploading file " + file.name }))
                const res = await fileApi.uploadFile({
                    file: file,
                    userName: user?.userName,
                    storageSource: storageSource,
                    accountType: user?.accountType,
                    onProgress: (percentCompleted) => {
                        setUploadProgress(percentCompleted)
                    }
                })

                if (res.succeed) {
                    setFiles([res.data, ...files])
                    success("File uploaded successfully")
                } else {
                    error(res.message)
                }
            } catch (err: any) {
                error(err.message)
            } finally {
                dispatch(setLoading({ isLoading: false }))
            }
        }
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <Select defaultValue={storageSource.toString()} onValueChange={(value) => setStorageSource(Number(value))}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select storage" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={StorageSource.Telegram.toString()}>Telegram</SelectItem>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div>
                                                    <SelectItem 
                                                        disabled={user?.accountType == AccountType.Free} 
                                                        value={StorageSource.R2.toString()}
                                                    >
                                                    Cloudflare R2 <CrownIcon className="w-4 h-4" color="#FFD700" size={20}/>
                                                    </SelectItem>
                                                </div>
                                            </TooltipTrigger>
                                            {user?.accountType == AccountType.Free && (
                                                <TooltipContent>
                                                    <p>Upgrade to a paid plan to use Cloudflare R2 storage </p>
                                                </TooltipContent>
                                            )}
                                        </Tooltip>
                                    </TooltipProvider>
                                </SelectContent>
                            </Select>
                            <UploadButton onUpload={handleUpload} uploadProgress={uploadProgress}/>
                        </div>
                    </div>
                    <ListFiles
                        files={files}
                        onDelete={handleDelete}
                        onDownload={handleDownload}
                        isLoading={isLoading}
                    />
                </div>
                <div className="md:col-span-1">
                    {user && <AccountLimitsPanel accountType={user.accountType} />}
                </div>
            </div>
        </div>
    )
} 