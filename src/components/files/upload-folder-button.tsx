import { Button } from "@/components/ui/button";
import { FolderUp } from "lucide-react";
import { useState } from "react";

interface UploadFolderButtonProps {
  onUpload: (files: File[]) => void;
}

export function UploadFolderButton({ 
  onUpload, 
}: UploadFolderButtonProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFolderChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files?.length) {
      setIsUploading(true);
      // Convert FileList to Array
      const filesArray = Array.from(files);
      await onUpload(filesArray);
      setIsUploading(false);
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        // @ts-ignore - webkitdirectory is not in the standard HTMLInputElement type
        webkitdirectory=""
        directory=""
        onChange={handleFolderChange}
        className="hidden"
        id="upload-folder-button"
      />
      <Button asChild disabled={isUploading} variant="outline">
        <label htmlFor="upload-folder-button" className="cursor-pointer">
          <FolderUp className="mr-2 h-4 w-4" />
          {isUploading ? "Uploading" : "Upload Folder"}
        </label>
      </Button>
    </div>
  );
} 