import { FileCard } from "./file-card"
import { FileInformation } from "@/types/files"
import Loading from "../loading"
import { StorageSource } from "@/constants/enum"

interface ListFilesProps {
  files?: FileInformation[]
  onDelete?: (id: string, fileName: string, storageSource: number) => void
  onDownload?: (id: string, fileName: string, storageSource: StorageSource) => void
  isLoading?: boolean
  title?: string
}

export function ListFiles({ files, onDelete, onDownload, isLoading, title }: ListFilesProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      {
        isLoading ? (
          <Loading loadingText="Loading files..." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files?.length ? files?.map((file) => (
              <FileCard key={file.id} file={file} onDelete={onDelete} onDownload={onDownload} />
            )) : (
              <div className="text-center text-gray-500">No files found</div>
            )}
          </div>
        )
      }
    </div>
  )
}
