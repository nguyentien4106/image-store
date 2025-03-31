import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ImageIcon, Trash2, Download } from "lucide-react"
import { R2File } from "@/types/images"

interface ListImagesProps {
  images: R2File[]
  onDelete?: (fileName: string) => void
  onDownload?: (url: string) => void
}

export function ListImages({ images, onDelete, onDownload }: ListImagesProps) {
  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900">No images</h3>
        <p className="text-sm text-gray-500 mt-2">Upload some images to get started</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image) => {
        const filename = image.fileName
        return (
          <Card key={filename} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="aspect-square relative">
                <img
                  src={image.url}
                  alt={filename}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  {onDownload && (
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => onDownload(image.url)}
                      className="bg-white/90 hover:bg-white"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => onDelete(image.fileName)}
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
                <ImageIcon className="h-4 w-4 text-green-500" />
                <h3 className="font-medium truncate">{filename}</h3>
              </div>
              <p className="text-sm text-gray-500">
                {new Date().toLocaleDateString()}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="flex justify-between items-center w-full">
                <span className="text-sm text-gray-500">
                  {(Math.random() * 2).toFixed(1)} MB
                </span>
                <span className="text-sm text-gray-500">
                  {`${Math.floor(Math.random() * 1000)}x${Math.floor(Math.random() * 1000)}`}
                </span>
              </div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
