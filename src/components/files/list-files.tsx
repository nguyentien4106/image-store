import { FileCard } from "./file-card"
import { FileInformation } from "@/types/files"
import Loading from "../loading"
import { StorageSource } from "@/constants/enum"

interface ListFilesProps {
  files?: FileInformation[]
  onDelete?: (id: string, storageSource: number) => void
  onDownload?: (id: string, storageSource: StorageSource) => void
  isLoading?: boolean
}

export function ListFiles({ files, onDelete, onDownload, isLoading }: ListFilesProps) {
  if (isLoading) {
    return <Loading loadingText="Loading files..." />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {files?.map((file) => (
        <FileCard
          key={file.id}
          file={file}
          onDelete={onDelete}
          onDownload={onDownload}
        />
      ))}
    </div>
  )
}
