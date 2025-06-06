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
import { Progress } from "@/types"
import { FileSelector } from "@/components/files/file-selector"
import { Button } from "@/components/ui/button"
import { FileInformation, UploadFileChunkRequest } from "@/types/files"
import dayjs from "dayjs"

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunk size

export default function FilesPage() {
    const { success, error } = useNotification()
    const { user } = useSelector((state: RootState) => state.user)
    const [storageSource, setStorageSource] = useState(user?.accountType == AccountType.Free ? StorageSource.Telegram : StorageSource.R2)
    const [uploadProgresses, setUploadProgresses] = useState<Progress[]>([])
    const [r2Files, setR2Files] = useState<FileInformation[]>([])
    const [telegramFiles, setTelegramFiles] = useState<FileInformation[]>([])
    
    const dispatch = useDispatch()
    const multipartFileInputRef = useRef<HTMLInputElement>(null);
    const chunkedFileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (user?.userName) {
            const r2 = fileApi.getUserFiles(user.userName, {
                storageSource: StorageSource.R2,
                pageIndex: 0,
                pageSize: 10
            })

            const telegram = fileApi.getUserFiles(user.userName, {
                storageSource: StorageSource.Telegram,
                pageIndex: 0,
                pageSize: 10
            })

            Promise.all([r2, telegram]).then(([r2, telegram]) => {
                setR2Files(r2.data.data || [])
                setTelegramFiles(telegram.data.data || [])
            })
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
                    
                    if (source === StorageSource.Telegram && telegramFiles) {
                        const updatedFiles = telegramFiles.filter(file => file.id !== id);
                        setTelegramFiles(updatedFiles);
                    } else if (source === StorageSource.R2 && r2Files) {
                        const updatedFiles = r2Files.filter(file => file.id !== id);
                        setR2Files(updatedFiles);
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
                
                await fileApi.downloadFile({
                    id: id,
                    storageSource: storageSourceParam,
                    onProgress: (percentCompleted) => {
                       
                    }
                })

                success(`Download completed: ${fileName}`)
            } catch (err: any) {
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
                for (const file of files) {
                    await handleUpload(file);
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

        const fileId = dayjs().unix() + "-" + file.name;
        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
        const contentType = file.type;
        const chunkPayloads = [];

        try {
            for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
                const start = chunkIndex * CHUNK_SIZE;
                const end = Math.min(start + CHUNK_SIZE, file.size);
                const chunk = file.slice(start, end);
                const chunkPayload : UploadFileChunkRequest = {
                    File: chunk,
                    ChunkIndex: chunkIndex,
                    TotalChunks: totalChunks,
                    FileName: file.name,
                    UserId: user.userId,
                    FileId: fileId,
                    UserName: user.userName,
                    ContentType: contentType
                }
                chunkPayloads.push(chunkPayload);
            }
            const results = await Promise.all(chunkPayloads.map((chunkPayload) => {
                return fileApi.uploadFileChunk(chunkPayload);
            }));

            const fileResult = results.filter(result => result.succeed && result.data)
            if(fileResult.length > 0){
                success(`Successfully uploaded ${file.name} in chunks.`);
                const fileInformation = fileResult[0].data;
                setTelegramFiles(prev => [fileInformation, ...prev]);
            }else{
                error(`Failed to upload ${file.name} in chunks.`);
            }
        } catch (err: any) {
            error(err.message || `Failed to upload ${file.name} in chunks.`);
        } finally {
            if (chunkedFileInputRef.current) {
                chunkedFileInputRef.current.value = ""; // Reset file input
            }
        }
    };


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
                                    disabled={false} 
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
                                    disabled={false}
                                >
                                    <FileText className="mr-2 h-4 w-4" />
                                    Chunked Upload
                                </Button>
                            </div>
                        </div>
                    </div>
                    <ListFiles
                        files={telegramFiles}
                        onDelete={handleDelete}
                        onDownload={handleDownload}
                        isLoading={false}
                        title="Telegram Files"
                    />
                    <ListFiles
                        files={r2Files}
                        onDelete={handleDelete}
                        onDownload={handleDownload}
                        isLoading={false}
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