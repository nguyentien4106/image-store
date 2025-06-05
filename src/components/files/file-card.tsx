import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { getDateTimeString, getFileSizeInMb } from "@/lib/utils";
import { getFileTypeIcon } from "@/lib/icons";
import { FileInformation } from "@/types/files";
import { FileStatus, StorageSource } from "@/constants/enum";
import { getStorageSourceIcon } from "@/helpers";
import { FileCardAction } from "./file-card-action";

interface FileCardProps {
  file: FileInformation;
  onDownload?: (id: string, fileName: string, storageSource: StorageSource) => void;
  onDelete?: (id: string, fileName: string, storageSource: number) => void;
}

export function FileCard({ file, onDownload, onDelete }: FileCardProps) {
  const isUploading = file.fileStatus === FileStatus.Uploading;

  return (
    <Card className={`overflow-hidden flex flex-col h-full ${isUploading ? 'opacity-75 pointer-events-none' : ''}`}>
      <FileCardAction
        file={file}
        isUploading={isUploading}
        uploadProgress={file.progress}
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
