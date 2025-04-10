import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useState } from "react";

interface UploadButtonProps {
  onUpload: (file: File) => void;
  uploadProgress: number
}

export function UploadButton({ 
  onUpload, 
  uploadProgress
}: UploadButtonProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files?.length) {
      const file = files[0];
      setIsUploading(true)
      await onUpload(file);
      setIsUploading(false)
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
