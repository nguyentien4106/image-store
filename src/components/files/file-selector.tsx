import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, FolderOpen } from "lucide-react"
import { Progress } from "@/types"

interface FileSelectorProps {
    onUpload: (file: File) => Promise<void>
    onFolderUpload: (files: File[]) => Promise<void>
    uploadProgresses: Progress[]
}
declare module "react" {
    interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
        webkitdirectory?: string;
        directory?: string;
    }
}

export const FileSelector: React.FC<FileSelectorProps> = ({
    onUpload,
    onFolderUpload,
    uploadProgresses
}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const fileInputRef = React.useRef<HTMLInputElement>(null)
    const folderInputRef = React.useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0])
            setSelectedFiles([])
        }
    }

    const handleFolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFiles(Array.from(e.target.files))
            setSelectedFile(null)
        }
    }

    const handleUpload = async () => {
        if (selectedFile) {
            await onUpload(selectedFile)
            setSelectedFile(null)
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
        } else if (selectedFiles.length > 0) {
            await onFolderUpload(selectedFiles)
            setSelectedFiles([])
            if (folderInputRef.current) {
                folderInputRef.current.value = ""
            }
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-4">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="*"
                />
                <input
                    type="file"
                    ref={folderInputRef}
                    onChange={handleFolderChange}
                    className="hidden"
                    webkitdirectory=""
                    directory=""
                    multiple
                />
                <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1"
                >
                    <Upload className="mr-2 h-4 w-4" />
                    Choose File
                </Button>
                <Button
                    variant="outline"
                    onClick={() => folderInputRef.current?.click()}
                    className="flex-1"
                >
                    <FolderOpen className="mr-2 h-4 w-4" />
                    Choose Folder
                </Button>
            </div>

            {(selectedFile || selectedFiles.length > 0) && (
                <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">
                        {selectedFile
                            ? `Selected file: ${selectedFile.name}`
                            : `Selected ${selectedFiles.length} files from folder`}
                    </div>
                    <Button
                        onClick={handleUpload}
                        disabled={uploadProgresses.length > 0}
                        className="w-full"
                    >
                        {uploadProgresses.length > 0 ? "Uploading..." : "Upload"}
                    </Button>
                </div>
            )}
        </div>
    )
} 