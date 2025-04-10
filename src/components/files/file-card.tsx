import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Download, Trash2 } from "lucide-react";
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

interface FileCardProps {
  file: FileInformation;
  onDownload?: (id: string, fileName: string, storageSource: StorageSource) => void;
  onDelete?: (id: string, fileName: string, storageSource: number) => void;
}

export function FileCard({ file, onDownload, onDelete }: FileCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <CardAction className="w-full">
        <div className="flex items-center justify-center gap-3">
          {onDownload && (
            <Button
              variant="secondary"
              size="icon"
              onClick={() => onDownload(file.id, file.fileName, file.storageSource)}
              className="bg-green hover:bg-white shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              <Download className="h-5 w-5" />
            </Button>
          )}
          {onDelete && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="icon"
                  className="bg-white hover:bg-white shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                >
                  <Trash2 className="h-5 w-5 text-red-500" />
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
                  <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                  <AlertDialogAction className="cursor-pointer" onClick={() => onDelete(file.id, file.fileName, file.storageSource)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
          {/* <div className="flex flex-col">
            <span className="text-xs text-gray-400">Type</span>
            <span className="text-sm text-gray-600">
              {getFileTypeIcon(file.contentType)}
            </span>
          </div> */}
        </div>
      </CardFooter>
    </Card>
  );
}
