import {
  ImageIcon,
  FileText,
  File,
  Music,
  Video,
  FileArchive,
  Settings,
  HelpCircle,
  Code,
  Database,
  Globe,
  Shield,
  BookOpen,
  Terminal,
  Layers,
  ClipboardList,
  FileSpreadsheet,
} from "lucide-react"

export function getFileTypeIcon(contentType: string) {
  if (!contentType) {
    return <HelpCircle className="h-4 w-4 text-gray-500" />
  }

  if (contentType.startsWith("image/")) {
    return <ImageIcon className="h-4 w-4 text-green-500" />
  }

  if (contentType === "text/plain" || contentType === "text/markdown") {
    return <FileText className="h-4 w-4 text-blue-500" />
  }

  if (
    contentType === "application/pdf" ||
    contentType === "application/msword" ||
    contentType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return <File className="h-4 w-4 text-purple-500" />
  }

  if (
    contentType === "application/vnd.ms-excel" ||
    contentType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    contentType === "text/csv"
  ) {
    return <FileSpreadsheet className="h-4 w-4 text-lime-500" />
  }

  if (contentType.startsWith("audio/")) {
    return <Music className="h-4 w-4 text-orange-500" />
  }

  if (contentType.startsWith("video/")) {
    return <Video className="h-4 w-4 text-red-500" />
  }

  if (
    contentType === "application/zip" ||
    contentType === "application/x-rar-compressed" ||
    contentType === "application/x-7z-compressed"
  ) {
    return <FileArchive className="h-4 w-4 text-yellow-500" />
  }

  if (contentType === "application/json" || contentType.includes("xml")) {
    return <Code className="h-4 w-4 text-cyan-500" />
  }

  if (contentType.includes("sql")) {
    return <Database className="h-4 w-4 text-emerald-500" />
  }

  if (contentType.includes("html")) {
    return <Globe className="h-4 w-4 text-sky-500" />
  }

  if (contentType.includes("x-shellscript") || contentType.includes("bash")) {
    return <Terminal className="h-4 w-4 text-neutral-500" />
  }

  return <HelpCircle className="h-4 w-4 text-gray-500" />
}
