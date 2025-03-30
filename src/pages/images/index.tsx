import { useState } from "react"
import { ListImages } from "@/components/images/list-images"
import { UploadButton } from "@/components/images/upload-button"
import { useNotification } from "@/hooks/notification"

// Mock data for example images
const mockImages = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
    name: "Mountain Landscape",
    createdAt: "2024-03-20T10:00:00Z"
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1682687221038-404670f09ef1",
    name: "Beach Sunset",
    createdAt: "2024-03-19T15:30:00Z"
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1682687220067-dced0a5860c3",
    name: "City Street",
    createdAt: "2024-03-18T09:15:00Z"
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1682687220199-d0124f48f95b",
    name: "Forest Path",
    createdAt: "2024-03-17T14:20:00Z"
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1682687221248-3116ba6ab483",
    name: "Desert Dunes",
    createdAt: "2024-03-16T11:45:00Z"
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
    name: "Ocean Waves",
    createdAt: "2024-03-15T16:10:00Z"
  },
  {
    id: "7",
    url: "https://images.unsplash.com/photo-1682687221038-404670f09ef1",
    name: "Mountain Lake",
    createdAt: "2024-03-14T13:25:00Z"
  },
  {
    id: "8",
    url: "https://images.unsplash.com/photo-1682687220067-dced0a5860c3",
    name: "Urban Architecture",
    createdAt: "2024-03-13T12:30:00Z"
  }
]

export default function ImagesPage() {
  const [images, setImages] = useState(mockImages)
  const { success, error } = useNotification()

  const handleDelete = (id: string) => {
    setImages(images.filter(image => image.id !== id))
    success("Image deleted successfully")
  }

  const handleDownload = (id: string) => {
    const image = images.find(img => img.id === id)
    if (image) {
      window.open(image.url, '_blank')
      success("Download started")
    }
  }

  const handleUpload = (files: File[]) => {
    // Here you would typically upload the files to your server
    // For now, we'll just show a success message
    success(`Successfully uploaded ${files.length} image${files.length > 1 ? 's' : ''}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Images</h1>
        <UploadButton onUpload={handleUpload} />
      </div>
      <ListImages 
        images={images}
        onDelete={handleDelete}
        onDownload={handleDownload}
      />
    </div>
  )
} 