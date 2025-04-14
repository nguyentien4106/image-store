import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Download, Eye, Trash2 } from "lucide-react";
import { getDateTimeString, getFileSizeInMb } from "@/lib/utils";
import { getFileTypeIcon } from "@/lib/icons";
import { FileInformation } from "@/types/files";
import { StorageSource } from "@/constants/enum";
import { getStorageSourceIcon } from "@/helpers";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PreviewContent } from "./preview-content";
import { Progress } from "@/components/ui/progress";

interface FileCardProps {
  file: FileInformation;
  onDownload?: (id: string, fileName: string, storageSource: StorageSource) => void;
  onDelete?: (id: string, fileName: string, storageSource: number) => void;
  downloadProgress?: number;
}

const isPreviewable = (file: FileInformation) => {
  const isR2Storage = file.storageSource === StorageSource.R2;
  const isMediaFile = file.contentType.startsWith('image/') || file.contentType.startsWith('video/');
  return isR2Storage && isMediaFile;
};

export function FileCard({ file, onDownload, onDelete, downloadProgress }: FileCardProps) {
  const showPreview = isPreviewable(file);
  const isDownloading = typeof downloadProgress === 'number';

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <CardAction className="w-full">
        <div className="flex items-center justify-center gap-3">
          {showPreview && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <PreviewContent file={file} />
              </DialogContent>
            </Dialog>
          )}
          {onDownload && (
            <Button
              variant="secondary"
              size="icon"
              onClick={() => onDownload(file.id, file.fileName, file.storageSource)}
              disabled={isDownloading}
              className="relative"
            >
              <Download className="h-4 w-4" />
              {isDownloading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-md">
                  <div className="w-full px-2">
                    <Progress value={downloadProgress} className="h-1" />
                  </div>
                </div>
              )}
            </Button>
          )}
          {onDelete && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="icon"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete the file "{file.fileName}". This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(file.id, file.fileName, file.storageSource)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </CardAction>
      <CardContent className="p-4 flex-grow">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium truncate">{file.fileName}</h3>
        </div>
        <p className="text-sm text-gray-500">
          {getDateTimeString(file.createdAt)}
        </p>
      </CardContent>
      <CardFooter className="p-4 bg-muted/50">
        <div className="flex justify-between w-full">
          <div className="flex flex-col justify-around">
            <span className="text-xs text-gray-400">Size</span>
            <span className="text-sm text-gray-600 font-medium">
              {getFileSizeInMb(file.fileSize)}
            </span>
          </div>
          <div className="flex flex-col justify-around">
            <span className="text-xs text-gray-400">File Type</span>
            <span className="text-sm text-gray-600 font-medium">
              {getFileTypeIcon(file.contentType)}
            </span>
          </div>
          <div className="flex flex-col justify-around">
            <span className="text-xs text-gray-400">Storage</span>
            <span className="text-sm text-gray-600">
              {getStorageSourceIcon(file.storageSource)}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
