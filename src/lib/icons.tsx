import { FileType } from "@/constants/enum"
import { 
  Image as ImageIcon, 
  FileText, 
  File, 
  Music, 
  Video, 
  FileArchive, 
  Settings, 
  HelpCircle 
} from "lucide-react"

export function getFileTypeIcon(fileType: FileType) {
  switch (fileType) {
    case FileType.Image:
      return <ImageIcon className="h-4 w-4 text-green-500" />
    case FileType.Text:
      return <FileText className="h-4 w-4 text-blue-500" />
    case FileType.Document:
      return <File className="h-4 w-4 text-purple-500" />
    case FileType.Audio:
      return <Music className="h-4 w-4 text-orange-500" />
    case FileType.Video:
      return <Video className="h-4 w-4 text-red-500" />
    case FileType.Compressed:
      return <FileArchive className="h-4 w-4 text-yellow-500" />
    case FileType.System:
      return <Settings className="h-4 w-4 text-gray-500" />
    default:
      return <HelpCircle className="h-4 w-4 text-gray-500" />
  }
} 