import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Download, Trash2 } from "lucide-react"
import { getDateTimeString, getFileName } from "@/lib/utils"
import { getFileTypeIcon } from "@/lib/icons"
import { FileInformation } from "@/types/files"

interface FileCardProps {
  file: FileInformation
  onDownload?: (url: string) => void
  onDelete?: (id: string, source: number) => void
}

export function FileCard({ file, onDownload, onDelete }: FileCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="aspect-square relative">
          <img
            src={file.url}
            alt={file.fileName}
            loading="lazy"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            {onDownload && (
              <Button
                variant="secondary"
                size="icon"
                onClick={() => onDownload(file.url)}
                className="bg-white/90 hover:bg-white"
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="destructive"
                size="icon"
                onClick={() => onDelete(file.id, file.storageSource)}
                className="bg-white/90 hover:bg-white"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center gap-2">
          {getFileTypeIcon(file.fileType)}
          <h3 className="font-medium truncate">{getFileName(file.fileName)}</h3>
        </div>
        <p className="text-sm text-gray-500">
          {getDateTimeString(file.createdAt)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex justify-between items-center w-full">
          <span className="text-sm text-gray-500">
            {file.fileSize} MB
          </span>
        </div>
      </CardFooter>
    </Card>
  )
} 