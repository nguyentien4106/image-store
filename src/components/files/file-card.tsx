import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Download, Eye, Trash2, UploadCloud, LoaderCircle } from "lucide-react";
import { getDateTimeString, getFileSizeInMb } from "@/lib/utils";
import { getFileTypeIcon } from "@/lib/icons";
import { FileInformation } from "@/types/files";
import { FileStatus, StorageSource } from "@/constants/enum";
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
import { Link } from "react-router-dom";
import { FileCardAction } from "./file-card-action";

interface FileCardProps {
  file: FileInformation;
  onDownload?: (id: string, fileName: string, storageSource: StorageSource) => void;
  onDelete?: (id: string, fileName: string, storageSource: number) => void;
  downloadProgress?: number;
  uploadProgress?: number;
}

const isPreviewable = (file: FileInformation) => {
  const isMediaFile = file.contentType.startsWith('image/') || file.contentType.startsWith('video/');
  return isMediaFile;
};

export function FileCard({ file, onDownload, onDelete, downloadProgress, uploadProgress }: FileCardProps) {
  const showPreview = isPreviewable(file);
  const isDownloading = typeof downloadProgress === 'number';
  const isUploading = file.fileStatus === FileStatus.Uploading;
  const showUploadProgressBar = typeof uploadProgress === 'number' && isUploading;

  return (
    <Card className={`overflow-hidden flex flex-col h-full ${isUploading ? 'opacity-75 pointer-events-none' : ''}`}>
      <FileCardAction
        file={file}
        isUploading={isUploading}
        showUploadProgressBar={showUploadProgressBar}
        uploadProgress={uploadProgress}
        isDownloading={isDownloading}
        downloadProgress={downloadProgress}
        showPreview={showPreview}
        onDownload={onDownload}
        onDelete={onDelete}
      />
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
