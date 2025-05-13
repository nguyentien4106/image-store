import React, { useEffect, useState, useRef } from "react"
import { ListFiles } from "@/components/files/list-files"
import { AccountLimitsPanel } from "@/components/files/account-limits-panel"
import { useNotification } from "@/hooks/notification"
import fileApi from "@/apis/files"
import { RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
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
import { CrownIcon, FileUp, FileText } from "lucide-react"
import { ProgressBar } from "@/components/ui/progress-bar"
import { Progress } from "@/types"
import { FileSelector } from "@/components/files/file-selector"
import { useFilesByUserName } from "@/hooks/queries/use-files"
import { Button } from "@/components/ui/button"

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunk size

export default function FilesPage() {
    const { success, error } = useNotification()
    const { user } = useSelector((state: RootState) => state.user)
    const [storageSource, setStorageSource] = useState(user?.accountType == AccountType.Free ? StorageSource.Telegram : StorageSource.R2)
    const [uploadProgresses, setUploadProgresses] = useState<Progress[]>([])
    const [downloadProgresses, setDownloadProgresses] = useState<Progress[]>([])
    const { data: r2Files, isLoading: isR2FilesLoading  } = useFilesByUserName({ userName: user?.userName, storageSource: StorageSource.R2, pageIndex: 0, pageSize: 10 })
    const { data: telegramFiles, isLoading: isTelegramFilesLoading } = useFilesByUserName({ userName: user?.userName, storageSource: StorageSource.Telegram, pageIndex: 0, pageSize: 10 })
    
    const dispatch = useDispatch()
    const multipartFileInputRef = useRef<HTMLInputElement>(null);
    const chunkedFileInputRef = useRef<HTMLInputElement>(null); // Ref for the chunked file input

    useEffect(() => {
      if (user?.userName) {
      }
    }, [user])

    const handleDelete = async (id: string, fileName: string, source: number) => {
        if(user?.userName){
            try {
                dispatch(setLoading({ isLoading: true, loadingText: "Deleting " + fileName, isSmall: true }))
                const result = await fileApi.deleteFile({
                    id: id,
                    storageSource: source
                })
                if (result.succeed) {
                    success("File deleted successfully")
                    
                    if (source === StorageSource.Telegram && telegramFiles?.data) {
                        const updatedFiles = telegramFiles.data.data.filter(file => file.id !== id);
                        telegramFiles.data.data = updatedFiles;
                    } else if (source === StorageSource.R2 && r2Files?.data) {
                        const updatedFiles = r2Files.data.data.filter(file => file.id !== id);
                        r2Files.data.data = updatedFiles;
                    }
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

    const handleDownload = async (id: string, fileName: string, storageSourceParam: StorageSource) => {
        if(user?.userName){
            try {
                setDownloadProgresses(prev => [...prev, { id, name: fileName, progress: 0, type: "download" }])
                
                await fileApi.downloadFile({
                    id: id,
                    storageSource: storageSourceParam,
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
        if(!user?.userName || !user?.accountType) return;
        const fileId = Date.now() + "-" + file.name; // Unique ID for this upload
        setUploadProgresses(prev => [...prev, { id: fileId, name: file.name, progress: 0, type: "upload" }])
        try {
            const res = await fileApi.uploadFile({
                file: file,
                userName: user.userName,
                storageSource: storageSource,
                accountType: user.accountType,
                onProgress: (percentCompleted) => {
                    setUploadProgresses(prev => 
                        prev.map(progress => 
                            progress.id === fileId && progress.type === "upload"
                                ? { ...progress, progress: percentCompleted }
                                : progress
                        )
                    )
                }
            })

            if (res.succeed) {
                success("File uploaded successfully: " + file.name)
            } else {
                error(res.message || "Failed to upload " + file.name)
            }
        } catch (err: any) {
            error(err.message || "Error uploading " + file.name)
        } finally {
            setUploadProgresses(prev => prev.filter(progress => progress.id !== fileId))
        }
    }

    const handleNewMultipartFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            handleUpload(file); 
            if (multipartFileInputRef.current) {
                multipartFileInputRef.current.value = "";
            }
        }
    };

    const handleFolderUpload = async (files: File[]) => {
        if(user?.userName){
            try {
                // Process folder uploads sequentially to avoid overwhelming the progress UI or backend
                for (const file of files) {
                    await handleUpload(file); // Reuse single file upload logic
                }
                success(`Successfully processed ${files.length} files from folder.`);
            } catch (err: any) {
                error(err.message || "Failed to upload some files from folder")
            }
        }
    }

    const handleChunkedFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        if (!user?.userName || !user?.accountType) {
            error("User information is not available. Please log in again.");
            return;
        }

        const fileId = Date.now() + "-" + file.name; // Unique ID for this chunked upload session
        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
        
        setUploadProgresses(prev => [...prev, { 
            id: fileId, 
            name: file.name, 
            progress: 0, 
            type: "upload", 
            isChunked: true, 
            totalChunks, 
            chunksUploaded: 0 
        }]);

        try {
            for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
                const start = chunkIndex * CHUNK_SIZE;
                const end = Math.min(start + CHUNK_SIZE, file.size);
                const chunk = file.slice(start, end);

                // This is a hypothetical API call structure.
                // You'll need to implement `uploadFileChunk` in your `fileApi`.
                await fileApi.uploadFileChunk({
                    File: chunk,
                    ChunkIndex: chunkIndex,
                    TotalChunks: totalChunks,
                    FileName: file.name,
                    UserId: user.userName,
                    FileId: fileId
                });

               
            }
            success(`Successfully uploaded ${file.name} in chunks.`);
        } catch (err: any) {
            error(err.message || `Failed to upload ${file.name} in chunks.`);
            // Optionally mark the specific progress item as failed or remove it
            setUploadProgresses(prev => prev.map(p => p.id === fileId ? {...p, progress: -1 /* Mark as error */} : p ));
        } finally {
            // Keep the progress bar if it's completed or errored, or remove after a delay
            // For now, successful uploads are removed by existing logic if it hits 100% and then another success action occurs
            // Errored items marked with -1 will persist until handled differently
            if (chunkedFileInputRef.current) {
                chunkedFileInputRef.current.value = ""; // Reset file input
            }
        }
    };

    const isAnyUploadActive = uploadProgresses.some(p => p.progress < 100 && p.progress >= 0);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 flex-wrap">
                            <Select 
                                defaultValue={storageSource.toString()} 
                                onValueChange={(value) => setStorageSource(Number(value))}
                            >
                                <SelectTrigger className="w-auto min-w-[150px]">
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
                                                    R2 <CrownIcon className="w-4 h-4 inline-block ml-1" color="#FFD700" size={16}/>
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
                            <div className="ml-0 md:ml-2 mt-2 md:mt-0">
                                <input
                                    type="file"
                                    ref={multipartFileInputRef}
                                    onChange={handleNewMultipartFileChange}
                                    className="hidden"
                                    accept="*"
                                />
                                <Button
                                    variant="outline"
                                    onClick={() => multipartFileInputRef.current?.click()}
                                    disabled={isAnyUploadActive} 
                                >
                                    <FileUp className="mr-2 h-4 w-4" />
                                    Quick Upload
                                </Button>
                            </div>
                            <div className="ml-0 md:ml-2 mt-2 md:mt-0">
                                <input
                                    type="file"
                                    ref={chunkedFileInputRef}
                                    onChange={handleChunkedFileSelected}
                                    className="hidden"
                                    accept="*"
                                />
                                <Button
                                    variant="outline"
                                    onClick={() => chunkedFileInputRef.current?.click()}
                                    disabled={isAnyUploadActive}
                                >
                                    <FileText className="mr-2 h-4 w-4" />
                                    Chunked Upload
                                </Button>
                            </div>
                        </div>
                    </div>
                    {(uploadProgresses.length > 0) && (
                        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 space-y-4 z-50">
                            {uploadProgresses.map((progress) => (
                                <div key={progress.id} className="bg-background p-4 rounded-lg shadow-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium truncate max-w-[200px]">
                                            {progress.isChunked ? `Chunk Uploading: ${progress.name}` : `Uploading: ${progress.name}`}
                                            {progress.isChunked && progress.totalChunks && ` (${progress.chunksUploaded}/${progress.totalChunks} chunks)`}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            {progress.progress === -1 ? "Error" : `${progress.progress}%`}
                                        </span>
                                    </div>
                                    <ProgressBar progress={progress.progress === -1 ? 100 : progress.progress} variant={progress.progress === -1 ? "destructive" : "default"} />
                                </div>
                            ))}
                        </div>
                    )}
                    {downloadProgresses.length > 0 && (
                        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 space-y-4 z-50">
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
                        files={telegramFiles?.data.data}
                        onDelete={handleDelete}
                        onDownload={handleDownload}
                        isLoading={isTelegramFilesLoading}
                        title="Telegram Files"
                    />
                    <ListFiles
                        files={r2Files?.data.data}
                        onDelete={handleDelete}
                        onDownload={handleDownload}
                        isLoading={isR2FilesLoading}
                        title="R2 Files"
                    />
                </div>
                <div className="md:col-span-1">
                    {user && <AccountLimitsPanel accountType={user.accountType} />}
                </div>
            </div>
        </div>
    )
} 