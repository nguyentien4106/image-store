import React, { useEffect, useState, useRef } from "react"
import { ListFiles } from "@/components/files/list-files"
import { AccountLimitsPanel } from "@/components/files/account-limits-panel"
import { useNotification } from "@/hooks/notification"
import fileApi from "@/apis/files"
import { RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import { setLoading } from "@/store/slices/loadingSlice"
import { StorageSource } from "@/constants/enum"
import { Button } from "@/components/ui/button"
import { FileInformation, UploadFileChunkRequest } from "@/types/files"
import dayjs from "dayjs"
import { LucideUploadCloud } from "lucide-react"
import * as signalR from "@microsoft/signalr"
import DownloadProgressList from "@/components/files/download-progress-list"
import { Progress } from "@/types"

const CHUNK_SIZE = 5 * 1024 * 1024;

export default function FilesPage() {
    const { success, error } = useNotification()
    const { user } = useSelector((state: RootState) => state.user)
    const [ telegramFiles, setTelegramFiles] = useState<FileInformation[]>([])
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [downloadProgress, setDownloadProgress] = useState<Progress[]>([]);
    const dispatch = useDispatch()
    const chunkedFileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
          .withUrl('http://localhost:5006/notificationHub', {
            withCredentials: true
          })
          .withAutomaticReconnect()
          .build();

        setConnection(newConnection);

        return () => {
          if (newConnection) {
            newConnection.stop();
          }
        };
    }, []);

    useEffect(() => {
        if (connection) {
          connection
            .start()
            .then(() => {
              connection.on('ReceiveUploadProgress', (fileId, percentCompleted) => {
                setTelegramFiles(prev => prev.map(file => file.id === fileId ? { ...file, progress: percentCompleted } : file))
              });

              connection.on('ReceiveUploadCompleted', (fileId, newFile) => {
                setTelegramFiles(prev => prev.map(file => file.id === fileId ? newFile : file))
              });

              connection.on('ReceiveDownloadStarted', (id, name) => {
                setDownloadProgress(prev => [...prev, { id, name, progress: 0, type: "download" }])
              });

              connection.on('ReceiveDownloadProgress', (id, name, progress) => {
                setDownloadProgress(prev => prev.map(item => item.id === id ? { ...item, progress: progress } : item))
              });

              connection.on('ReceiveDownloadCompleted', (id, name) => {
                setDownloadProgress(prev => prev.filter(item => item.id !== id))
              });
            })
            .catch((err) => console.error('SignalR Connection Error: ', err));
        }
    }, [connection]);

    useEffect(() => {
      if (user?.userName) {
            const telegram = fileApi.getUserFiles(user.userName, {
                storageSource: StorageSource.Telegram,
                pageIndex: 0,
                pageSize: 10
            })

            Promise.all([telegram]).then(([telegram]) => {
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
        try {

            await fileApi.downloadFile({
                id: id,
                storageSource: storageSourceParam,
                onProgress: (percentCompleted) => {
                    console.log(percentCompleted)
                }
            })

            success(`Download completed: ${fileName}`)
        } catch (err: any) {
            error(err.message || `Failed to download ${fileName}`)
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
                success(`Successfully uploaded ${file.name}.`);
                const fileInformation = fileResult[0].data;
                setTelegramFiles(prev => [fileInformation, ...prev]);
            }else{
                error(`Failed to upload ${file.name}.`);
            }
        } catch (err: any) {
            error(err.message || `Failed to upload ${file.name}.`);
        } finally {
            if (chunkedFileInputRef.current) {
                chunkedFileInputRef.current.value = ""; // Reset file input
            }
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
                <div className="flex items-center gap-2 flex-wrap">
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
                        <LucideUploadCloud size={64}/>
                        Upload 
                    </Button>
                </div>
                <ListFiles
                    files={telegramFiles}
                    onDelete={handleDelete}
                    onDownload={handleDownload}
                    isLoading={false}
                    title="Telegram Files"
                />
                <DownloadProgressList
                    downloads={downloadProgress}
                    onCancelDownload={() => {}}
                />
            </div>
            <div className="md:col-span-1">
                {user && <AccountLimitsPanel accountType={user.accountType} />}
            </div>
        </div>
    )
} 