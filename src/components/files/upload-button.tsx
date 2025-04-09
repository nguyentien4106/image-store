import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useState } from "react";
import fileApi from "@/apis/files";
import { StorageSource } from "@/constants/enum";

interface UploadButtonProps {
  onUpload: (file: File) => void;
  userName?: string;
  accountType?: string;
  storageSource?: number;
}

export function UploadButton({ 
  onUpload, 
}: UploadButtonProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files?.length) {
      const file = files[0];
      
      // For files larger than 20MB, use the API directly with progress tracking
      if (file.size > 20 * 1024 * 1024) {
        setIsUploading(true);
        setUploadProgress(0);
        
        try {
          await onUpload(file);
          
          // Reset the input so the same file can be selected again
          event.target.value = '';
        } catch (error) {
          console.error("Error uploading large file:", error);
        } finally {
          setIsUploading(false);
          setUploadProgress(0);
        }
      } else {
        // For smaller files, use the regular onUpload handler
      }
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        accept="*"
        onChange={handleFileChange}
        className="hidden"
        id="upload-button"
      />
      <Button asChild disabled={isUploading}>
        <label htmlFor="upload-button" className="cursor-pointer">
          <Upload className="mr-2 h-4 w-4" />
          {isUploading ? `Uploading ${uploadProgress}%` : "Upload"}
        </label>
      </Button>
      {isUploading && uploadProgress > 0 && (
        <div className="mt-2 w-full">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300 ease-in-out" 
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
