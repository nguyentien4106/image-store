import { FileStatus } from "@/constants/enum";
import { CardAction } from "../ui/card";
import { DialogTrigger, Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Download, Eye, Trash2, UploadCloud, LoaderCircle, CheckCircle2, XCircle } from "lucide-react";
import { Progress } from "../ui/progress";
import { Link } from "react-router-dom";
import { StorageSource } from "@/constants/enum";
import { PreviewContent } from "./preview-content";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "../ui/alert-dialog";     

export function FileCardAction({ isUploading, showUploadProgressBar, uploadProgress, isDownloading, downloadProgress, showPreview, previewContent, onDownload, onDelete, file } : any) {
    return (
        <CardAction className="w-full min-h-[56px]">
        {isUploading ? (
          <div className="flex flex-col items-center justify-center h-full p-2 w-full">
            {showUploadProgressBar ? (
              <div className="w-full px-2 text-center">
                <div className="flex items-center justify-center mb-1">
                  <UploadCloud className="h-4 w-4 mr-2 animate-pulse" />
                  <span className="text-xs text-gray-500">Uploading: {uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-1.5" />
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
                <span className="text-xs text-gray-500">Processing...</span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3">
            {showPreview && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" disabled={isUploading || isDownloading || file.fileStatus === FileStatus.Failed}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  {
                    file.storageSource === StorageSource.Telegram ? (
                      <div className="flex flex-col items-center justify-center h-full">
                        <p className="text-sm text-gray-500">Preview Content is only support by R2 Storage. </p>
                        <p className="text-sm text-gray-500">Please <Link to="/pricing" className="text-blue-500">upgrade</Link> your account to R2 Storage to preview content. </p>
                      </div>
                    ) : (
                      <PreviewContent file={file} />
                    )
                  }
                </DialogContent>
              </Dialog>
            )}
            {onDownload && (
              <Button
                variant="secondary"
                size="icon"
                onClick={() => onDownload(file.id, file.fileName, file.storageSource)}
                disabled={isUploading || isDownloading || file.fileStatus === FileStatus.Failed}
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
                    disabled={isUploading || isDownloading || file.fileStatus === FileStatus.Failed}
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
            <div className="flex items-center gap-2">
              {file.fileStatus === FileStatus.Uploaded && (
                <span className="text-xs text-green-500 flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                </span>
              )}
              {file.fileStatus === FileStatus.Failed && (
                <span className="text-xs text-red-500 flex items-center">
                  <XCircle className="h-4 w-4 mr-1" />
                </span>
              )}
            </div>
          </div>
        )}
      </CardAction>
    )
}