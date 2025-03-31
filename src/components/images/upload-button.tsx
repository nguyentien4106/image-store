import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

interface UploadButtonProps {
  onUpload: (files: File) => void
}

export function UploadButton({ onUpload }: UploadButtonProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files?.length) {
      onUpload(files[0])
    }
  }

  return (
    <div className="relative">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="upload-button"
      />
      <Button asChild>
        <label htmlFor="upload-button" className="cursor-pointer">
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </label>
      </Button>
    </div>
  )
}
