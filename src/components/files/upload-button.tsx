import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useState } from "react";
import { ProgressBar } from "@/components/ui/progress-bar";

interface UploadButtonProps {
  onUpload: (file: File) => void;
}

export function UploadButton({ 
  onUpload, 
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
          {isUploading ? "Uploading" : "Upload"}
        </label>
      </Button>
      
    </div>
  );
}
