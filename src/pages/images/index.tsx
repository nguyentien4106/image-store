import { useEffect, useState } from "react"
import { ListImages } from "@/components/images/list-images"
import { UploadButton } from "@/components/images/upload-button"
import { useNotification } from "@/hooks/notification"
import imageApi from "@/apis/images"
import { RootState } from "@/store"
import { useSelector } from "react-redux"
import { R2File } from "@/types/images"
import { useDownloadImage } from "@/hooks/images"

export default function ImagesPage() {
  const [images, setImages] = useState<R2File[]>([])
  const { success, error } = useNotification()
  const { user } = useSelector((state: RootState) => state.user)
  const { downloadImage } = useDownloadImage()

  useEffect(() => {
    imageApi.getUserImages(user?.userName || "").then((res) => {
      setImages(res.data)
    })
  }, [])

  const handleDelete = async (fileName: string) => {
    const result = await imageApi.deleteImage(fileName)
    if(result.succeed){
      setImages(images.filter(image => image.fileName !== fileName))
      success("Image deleted successfully")
    } else {
      error(result.message)
    }
  }

  const handleDownload = async (url: string) => {
    await downloadImage(url)
  }

  const handleUpload = (file: File) => {
    imageApi.uploadImage({
      file: file,
      userName: user?.userName || ""
    }).then((res) => {
      console.log(res)
      if(res.succeed){
        setImages([ res.data, ...images ])
        success("Image uploaded successfully")
      } else {
        error(res.message)
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Files</h1>
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