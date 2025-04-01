import { useEffect, useState } from "react"
import { ListFiles } from "@/components/files/list-files"
import { UploadButton } from "@/components/files/upload-button"
import { useNotification } from "@/hooks/notification"
import fileApi from "@/apis/files"
import { RootState } from "@/store"
import { useSelector } from "react-redux"
import { R2File } from "@/types/files"
import { useDownloadFile } from "@/hooks/files"

export default function FilesPage() {
  const [files, setFiles] = useState<R2File[]>([])
  const { success, error } = useNotification()
  const { user } = useSelector((state: RootState) => state.user)
  const { downloadFile } = useDownloadFile()

  useEffect(() => {
    fileApi.getUserFiles(user?.userName || "").then((res) => {
      setFiles(res.data)
    })
  }, [])

  const handleDelete = async (fileName: string) => {
    const result = await fileApi.deleteFile(fileName)
    if(result.succeed){
      setFiles(files.filter(file => file.fileName !== fileName))
      success("File deleted successfully")
    } else {
      error(result.message)
    }
  }

  const handleDownload = async (url: string) => {
    await downloadFile(url)
  }

  const handleUpload = (file: File) => {
    fileApi.uploadFile({
      file: file,
      userName: user?.userName || ""
    }).then((res) => {
      console.log(res)
      if(res.succeed){
        setFiles([ res.data, ...files ])
        success("File uploaded successfully")
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
      <ListFiles 
        files={files}
        onDelete={handleDelete}
        onDownload={handleDownload}
      />
    </div>
  )
} 