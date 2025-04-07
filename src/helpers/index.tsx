import { Cloud, HelpCircle } from "lucide-react";
import { StorageSource } from "@/constants/enum";
import r2icon from "@/assets/r2-icon.png";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function getStorageSourceIcon(source: StorageSource) {
  switch (source) {
    case StorageSource.R2:
      return (
        <div className="flex items-center space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
            <img src={r2icon} className="h-8 w-8" alt="R2 Storage Icon" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Cloudflare storage, guaranteed</p>
            </TooltipContent>
          </Tooltip>
        </div>
      );
    case StorageSource.Telegram:
      return (
        <div className="flex items-center space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-5 w-5 text-gray-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Free storage, not guaranteed</p>
            </TooltipContent>
          </Tooltip>
        </div>
      );
    default:
      return <Cloud className="h-4 w-4 text-gray-500" />;
  }
}
