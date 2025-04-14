import * as React from 'react'
import { useCallback, useState } from 'react'
import { FileInformation } from "@/types/files"
import fileApi from "@/apis/files"
import { Loader2 } from "lucide-react"

interface PreviewContentProps {
    file: FileInformation
}

export function PreviewContent({ file }: PreviewContentProps) {
    const [isUrlLoading, setIsUrlLoading] = useState(true)
    const [isContentLoading, setIsContentLoading] = useState(true)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    // Use React's useEffect to handle the async call
    const fetchPreview = useCallback(async () => {
        try {
            setIsUrlLoading(true)
            const result = await fileApi.getPreviewFile(file.id)
            if (!result.succeed) {
                setError('Failed to load preview')
                return
            }
            setPreviewUrl(result.data.url)
        } catch (err) {
            setError('An error occurred while loading the preview')
        } finally {
            setIsUrlLoading(false)
        }
    }, [file.id])
    
    React.useEffect(() => {
        fetchPreview()
    }, [file.id])

    const LoadingSpinner = () => (
        <div className="flex items-center justify-center min-h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
    )

    if (isUrlLoading) {
        return <LoadingSpinner />
    }

    if (error || !previewUrl) {
        return (
            <div className="flex items-center justify-center min-h-[200px] text-red-500">
                {error || 'Preview not available'}
            </div>
        )
    }

    if (file.contentType.startsWith('image/')) {
        return (
            <div className="relative">
                {isContentLoading && <LoadingSpinner />}
                <img
                    src={previewUrl}
                    alt={file.fileName}
                    className={`max-w-full max-h-[80vh] object-contain transition-opacity duration-300 ${isContentLoading ? 'opacity-0' : 'opacity-100'}`}
                    onLoad={() => setIsContentLoading(false)}
                    onError={() => {
                        setError('Failed to load image')
                        setIsContentLoading(false)
                    }}
                />
            </div>
        )
    }

    if (file.contentType.startsWith('video/')) {
        return (
            <div className="relative">
                {isContentLoading && <LoadingSpinner />}
                <video
                    controls
                    className={`max-w-full max-h-[80vh] transition-opacity duration-300 ${isContentLoading ? 'opacity-0' : 'opacity-100'}`}
                    onLoadedData={() => setIsContentLoading(false)}
                    onError={() => {
                        setError('Failed to load video')
                        setIsContentLoading(false)
                    }}
                >
                    <source src={previewUrl} type={file.contentType} />
                    Your browser does not support the video tag or the file is corrupted.
                </video>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-[200px] text-gray-500">
            Preview not available for this file type
        </div>
    )
} 