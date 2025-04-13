import { useEffect, useState } from "react"
import { ListFiles } from "@/components/files/list-files"
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
import { ProgressBar } from "@/components/ui/progress-bar"
import { Progress } from "@/types"
import { FileSelector } from "@/components/files/file-selector"

export default function FilesPage() {
    const { success, error } = useNotification()
    const { user } = useSelector((state: RootState) => state.user)
    const [files, setFiles] = useState<FileInformation[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [storageSource, setStorageSource] = useState(user?.accountType == AccountType.Free ? StorageSource.Telegram : StorageSource.R2)
    const [uploadProgresses, setUploadProgresses] = useState<Progress[]>([])
    const [downloadProgresses, setDownloadProgresses] = useState<Progress[]>([])
    
    const dispatch = useDispatch()

    useEffect(() => {
        if (user?.userName) {
            fileApi.getUserFiles(user?.userName).then((res) => {
                setFiles(res.data.data)
                setIsLoading(false)
            })
        }
    }, [])

    const handleDelete = async (id: string, fileName: string, source: number) => {
        if(user?.userName){
            try {
                dispatch(setLoading({ isLoading: true, loadingText: "Deleting " + fileName, isSmall: true }))
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
            } catch (err: any) {
                error(err.message || "Failed to delete file") 
            } finally {
                dispatch(setLoading({ isLoading: false, isSmall: false }))
            }
        }
    }

    const handleDownload = async (id: string, fileName: string, storageSource: StorageSource) => {
        if(user?.userName){
            try {
                setDownloadProgresses(prev => [...prev, { id, name: fileName, progress: 0, type: "download" }])
                
                await fileApi.downloadFile({
                    id: id,
                    storageSource: storageSource,
                    onProgress: (percentCompleted) => {
                        setDownloadProgresses(prev => 
                            prev.map(progress => 
                                progress.name === fileName && progress.type === "download"
                                    ? { ...progress, progress: percentCompleted }
                                    : progress
                            )
                        )
                    }
                })

                setDownloadProgresses(prev => prev.filter(progress => progress.id !== id))
                success(`Download completed: ${fileName}`)
            } catch (err: any) {
                setDownloadProgresses(prev => prev.filter(progress => progress.id !== id))
                error(err.message || `Failed to download ${fileName}`)
            }
        }
    }

    const handleUpload = async (file: File) => {
        if(user?.userName){
            try {
                setUploadProgresses(prev => [...prev, { id: file.name, name: file.name, progress: 0, type: "upload" }])
                const res = await fileApi.uploadFile({
                    file: file,
                    userName: user?.userName,
                    storageSource: storageSource,
                    accountType: user?.accountType,
                    onProgress: (percentCompleted) => {
                        setUploadProgresses(prev => 
                            prev.map(progress => 
                                progress.id === file.name && progress.type === "upload"
                                    ? { ...progress, progress: percentCompleted }
                                    : progress
                            )
                        )
                    }
                })

                if (res.succeed) {
                    setFiles([res.data, ...files])
                    setUploadProgresses(prev => prev.filter(progress => progress.id !== file.name))
                    success("File uploaded successfully")
                } else {
                    setUploadProgresses(prev => prev.filter(progress => progress.id !== file.name))
                    error(res.message)
                }
            } catch (err: any) {
                error(err.message)
            } finally {
                setUploadProgresses(prev => prev.filter(progress => progress.id !== file.name))
            }
        }
    }

    const handleFolderUpload = async (files: File[]) => {
        if(user?.userName){
            try {
                await Promise.all(
                    files.map((file, index) => handleUpload(file))
                );
                success(`Successfully uploaded ${files.length} files`)
            } catch (err: any) {
                error(err.message || "Failed to upload some files")
            }
        }
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4" style={{ width: "100px" }}>
                            <Select 
                                defaultValue={storageSource.toString()} 
                                onValueChange={(value) => setStorageSource(Number(value))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select storage" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={StorageSource.Telegram.toString()}>Not Secured</SelectItem>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div>
                                                    <SelectItem 
                                                        disabled={user?.accountType == AccountType.Free} 
                                                        value={StorageSource.R2.toString()}
                                                    >
                                                    R2 <CrownIcon className="w-4 h-4" color="#FFD700" size={20}/>
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
                            <FileSelector
                                onUpload={handleUpload}
                                onFolderUpload={handleFolderUpload}
                                uploadProgresses={uploadProgresses}
                            />
                        </div>
                    </div>
                    {(uploadProgresses.length > 0) && (
                        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 space-y-4">
                            {uploadProgresses.map((progress) => (
                                <div key={progress.id} className="bg-background p-4 rounded-lg shadow-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium truncate max-w-[200px]">
                                            Uploading: {progress.name}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            {progress.progress}%
                                        </span>
                                    </div>
                                    <ProgressBar progress={progress.progress} />
                                </div>
                            ))}
                        </div>
                    )}
                    {
                    downloadProgresses.length > 0 && (
                        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 space-y-4">
                        {downloadProgresses.map((progress) => (
                            <div key={progress.id} className="bg-background p-4 rounded-lg shadow-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium truncate max-w-[200px]">
                                        Downloading: {progress.name}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        {progress.progress}%
                                    </span>
                                </div>
                                    <ProgressBar progress={progress.progress} />
                                </div>
                            ))} 
                        </div>
                    )}
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