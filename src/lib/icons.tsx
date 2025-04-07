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
  Cloud,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HOME_PATH } from "@/constants/path";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Creates a tooltip-wrapped icon for a file type based on content type
 * @param contentType MIME type of the file
 * @returns React component with appropriate icon and tooltip
 */
export function getFileTypeIcon(contentType: string) {
  // Define icon mappings for better maintainability
  const iconMap = [
    {
      test: (type: string) => !type,
      icon: <HelpCircle className="h-5 w-5 text-gray-500" />,
      label: "Unknown"
    },
    {
      test: (type: string) => type.startsWith("image/"),
      icon: <ImageIcon className="h-5 w-5 text-green-500" />
    },
    {
      test: (type: string) => type === "text/plain" || type === "text/markdown",
      icon: <FileText className="h-5 w-5 text-blue-500" />
    },
    {
      test: (type: string) => 
        type === "application/pdf" || 
        type === "application/msword" || 
        type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      icon: <File className="h-5 w-5 text-purple-500" />
    },
    {
      test: (type: string) => 
        type === "application/vnd.ms-excel" || 
        type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || 
        type === "text/csv",
      icon: <FileSpreadsheet className="h-5 w-5 text-lime-500" />
    },
    {
      test: (type: string) => type.startsWith("audio/"),
      icon: <Music className="h-5 w-5 text-orange-500" />
    },
    {
      test: (type: string) => type.startsWith("video/"),
      icon: <Video className="h-5 w-5 text-red-500" />
    },
    {
      test: (type: string) => 
        type === "application/zip" || 
        type === "application/x-rar-compressed" || 
        type === "application/x-7z-compressed",
      icon: <FileArchive className="h-5 w-5 text-yellow-500" />
    },
    {
      test: (type: string) => type === "application/json" || type.includes("xml"),
      icon: <Code className="h-5 w-5 text-cyan-500" />
    },
    {
      test: (type: string) => type.includes("sql"),
      icon: <Database className="h-5 w-5 text-emerald-500" />
    },
    {
      test: (type: string) => type.includes("html"),
      icon: <Globe className="h-5 w-5 text-sky-500" />
    },
    {
      test: (type: string) => type.includes("x-shellscript") || type.includes("bash"),
      icon: <Terminal className="h-5 w-5 text-neutral-500" />
    },
    // Default case - will be used if no other matches
    {
      test: () => true,
      icon: <HelpCircle className="h-5 w-5 text-gray-500" />
    }
  ];

  // Find the first matching icon configuration
  const match = iconMap.find(item => item.test(contentType));

  return (
    <div className="flex items-center space-x-2">
      <Tooltip>
        <TooltipTrigger>
          {match?.icon}
        </TooltipTrigger>
        <TooltipContent>
          <p>{match?.label || contentType}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

/**
 * Returns the company logo and name as a clickable component
 * that navigates to the home page
 */
export const getCompanyIcon = () => {
  const navigate = useNavigate();
  
  const handleNavigateHome = () => {
    navigate(HOME_PATH.home);
  };
  
  return (
    <div 
      className="flex items-center gap-2 cursor-pointer" 
      onClick={handleNavigateHome}
    >
      <Cloud className="h-6 w-6 text-primary" />
      <span className="text-xl font-bold">CloudStore</span>
    </div>
  );
};
