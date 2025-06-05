import { FileStatus } from "@/constants/enum";
import { CardAction } from "../ui/card";
import { Button } from "../ui/button";
import { Download, Trash2, UploadCloud, CheckCircle2, XCircle } from "lucide-react";
import { Progress } from "../ui/progress";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "../ui/alert-dialog";     

export function FileCardAction({ 
    isUploading, 
    uploadProgress, 
    onDownload, 
    onDelete, 
    file 
} : any) {
    return (
        <CardAction className="w-full min-h-[56px]">
        {isUploading ? (
          <div className="flex flex-col items-center justify-center h-full p-2 w-full">
            <div className="w-full px-2 text-center">
                <div className="flex items-center justify-center mb-1">
                  <UploadCloud className="h-4 w-4 mr-2 animate-pulse" />
                  {
                    uploadProgress 
                    ? <span className="text-xs text-gray-500">Uploading: {uploadProgress?.toFixed(2)}%</span>
                    : <span className="text-xs text-gray-500">Handling...</span>
                  }
                  
                </div>
                <Progress value={uploadProgress} className="h-1.5" />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3">
            {onDownload && (
              <Button
                variant="secondary"
                size="icon"
                onClick={() => onDownload(file.id, file.fileName, file.storageSource)}
                disabled={isUploading || file.fileStatus === FileStatus.Failed}
                className="relative"
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="icon"
                    disabled={isUploading || file.fileStatus === FileStatus.Failed}
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