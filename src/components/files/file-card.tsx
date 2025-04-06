import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Download, Trash2 } from "lucide-react";
import { getDateTimeString, getFileName, getFileSizeInMb } from "@/lib/utils";
import { getFileTypeIcon } from "@/lib/icons";
import { FileInformation } from "@/types/files";
import { FileType, StorageSource } from "@/constants/enum";
import { getStorageSourceIcon } from "@/helpers";

interface FileCardProps {
  file: FileInformation;
  onDownload?: (id: string, StorageSource: StorageSource, fileName: string) => void;
  onDelete?: (id: string, source: number) => void;
}

export function FileCard({ file, onDownload, onDelete }: FileCardProps) {
  console.log(file)
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <CardAction className="w-full">
        <div className="flex items-center justify-center gap-3">
          {onDownload && (
            <Button
              variant="secondary"
              size="icon"
              onClick={() => onDownload(file.id, file.storageSource, file.fileName)}
              className="bg-green hover:bg-white shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              <Download className="h-5 w-5" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="destructive"
              size="icon"
              onClick={() => onDelete(file.id, file.storageSource)}
              className="bg-white hover:bg-white shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              <Trash2 className="h-5 w-5 text-red-500" />
            </Button>
          )}
        </div>
      </CardAction>
      <CardContent className="p-4 flex-grow flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium truncate">{file.fileName}</h3>
        </div>
        <p className="text-sm text-gray-500">
          {getDateTimeString(file.createdAt)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex-none">
        <div className="flex justify-between items-center w-full">
          <span className="text-sm text-gray-500">
            {getFileSizeInMb(file.fileSize)}
          </span>
          <span className="text-sm text-gray-500">
            {getStorageSourceIcon(file.storageSource)}
          </span>
          {/* <span className="text-sm text-gray-500">
            {getFileTypeIcon(file.contentType)}
          </span> */}
        </div>
      </CardFooter>
    </Card>
  );
}
