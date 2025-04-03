import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Download, Trash2 } from "lucide-react"
import { getDateTimeString, getFileName } from "@/lib/utils"
import { getFileTypeIcon } from "@/lib/icons"
import { FileInformation } from "@/types/files"
import { FileType, StorageSource } from "@/constants/enum"
import { getStorageSourceIcon } from "@/helpers"

interface FileCardProps {
  file: FileInformation
  onDownload?: (url: string) => void
  onDelete?: (id: string, source: number) => void
}

export function FileCard({ file, onDownload, onDelete }: FileCardProps) {
  const isImage = file.fileType === FileType.Image

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <CardHeader className="p-0 flex-none">
        <div className="aspect-square relative">
          {isImage ? (
            <img
              src={file.url}
              alt={file.fileName}
              loading="lazy"
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="text-gray-400 scale-150">
                {getFileTypeIcon(file.fileType)}
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            {onDownload && (
              <Button
                variant="secondary"
                size="icon"
                onClick={() => onDownload(file.url)}
                className="bg-white hover:bg-white shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Download className="h-5 w-5" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="destructive"
                size="icon"
                onClick={() => onDelete(file.id, file.storageSource)}
                className="bg-white hover:bg-white shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Trash2 className="h-5 w-5 text-red-500" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-1">
          {getFileTypeIcon(file.fileType)}
          <h3 className="font-medium truncate">{getFileName(file.fileName)}</h3>
        </div>
        <p className="text-sm text-gray-500">
          {getDateTimeString(file.createdAt)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex-none">
        <div className="flex justify-between items-center w-full">
          <span className="text-sm text-gray-500">
            {file.fileSize} MB
          </span>
          <span className="text-sm text-gray-500">
            {getStorageSourceIcon(file.storageSource)}
          </span>
        </div>
      </CardFooter>
    </Card>
  )
} 