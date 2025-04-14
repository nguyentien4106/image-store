import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useFilesByUserName, useDeleteFile, useDownloadFile } from '@/hooks/queries/use-files'
import { StorageSource } from '@/constants/enum'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { FileCard } from '@/components/files/file-card'
import { useNotification } from '@/hooks/notification'
import type { Progress } from '@/types'

const FilesPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user)
  const { success, error } = useNotification()
  const [r2Page, setR2Page] = useState(1)
  const [telegramPage, setTelegramPage] = useState(1)
  const [downloadProgresses, setDownloadProgresses] = useState<Progress[]>([])

  const {
    data: r2Files,
    isLoading: isLoadingR2,
    isFetching: isFetchingR2,
  } = useFilesByUserName({
    userName: user?.userName,
    storageSource: StorageSource.R2,
    pageIndex: r2Page - 1,
    pageSize: 10,
  })

  const {
    data: telegramFiles,
    isLoading: isLoadingTelegram,
    isFetching: isFetchingTelegram,
  } = useFilesByUserName({
    userName: user?.userName,
    storageSource: StorageSource.Telegram,
    pageIndex: telegramPage - 1,
    pageSize: 10,
  })

  const deleteFile = useDeleteFile()
  const downloadFile = useDownloadFile()

  const handleLoadMoreR2 = () => {
    setR2Page(prev => prev + 1)
  }

  const handleLoadMoreTelegram = () => {
    setTelegramPage(prev => prev + 1)
  }

  const handleDelete = async (id: string, fileName: string, storageSource: StorageSource) => {
    try {
      await deleteFile.mutateAsync({ id, storageSource })
      success("File deleted successfully")
    } catch (err: any) {
      error(err.message || "Failed to delete file")
    }
  }

  const handleDownload = async (id: string, fileName: string, storageSource: StorageSource) => {
    try {
      setDownloadProgresses(prev => [...prev, { id, name: fileName, progress: 0, type: "download" }])
      
      await downloadFile.mutateAsync({
        id,
        storageSource,
        onProgress: (percentCompleted) => {
          setDownloadProgresses(prev => 
            prev.map(progress => 
              progress.id === id && progress.type === "download"
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

  const hasMoreR2 = (r2Files?.data?.count ?? 0) > ((r2Page) * 10)
  const hasMoreTelegram = (telegramFiles?.data?.count ?? 0) > ((telegramPage) * 10)

  const renderFileCard = (file: any, storageSource: StorageSource) => (
    <FileCard 
      key={file.id} 
      file={file} 
      onDelete={() => handleDelete(file.id, file.fileName, storageSource)}
      onDownload={() => handleDownload(file.id, file.fileName, storageSource)}
      downloadProgress={downloadProgresses.find(p => p.id === file.id)?.progress}
    />
  )

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* R2 Files Panel */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Cloudflare R2 Files</h2>
          <div className="grid grid-cols-1 gap-4">
            {isLoadingR2 ? (
              <div className="flex justify-center items-center min-h-[200px]">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : r2Files?.data?.data?.length ? (
              <>
                {r2Files.data.data.map(file => renderFileCard(file, StorageSource.R2))}
                {hasMoreR2 && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleLoadMoreR2}
                    disabled={isFetchingR2}
                  >
                    {isFetchingR2 ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    Load More
                  </Button>
                )}
              </>
            ) : (
              <div className="text-center text-muted-foreground">
                No files found in R2 storage
              </div>
            )}
          </div>
        </div>

        {/* Telegram Files Panel */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Telegram Files</h2>
          <div className="grid grid-cols-1 gap-4">
            {isLoadingTelegram ? (
              <div className="flex justify-center items-center min-h-[200px]">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : telegramFiles?.data?.data?.length ? (
              <>
                {telegramFiles.data.data.map(file => renderFileCard(file, StorageSource.Telegram))}
                {hasMoreTelegram && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleLoadMoreTelegram}
                    disabled={isFetchingTelegram}
                  >
                    {isFetchingTelegram ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    Load More
                  </Button>
                )}
              </>
            ) : (
              <div className="text-center text-muted-foreground">
                No files found in Telegram storage
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilesPage 