import { cn } from "@/lib/utils"

interface ProgressBarProps {
  progress: number
  className?: string
}

export function ProgressBar({ progress, className }: ProgressBarProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={cn(
            "h-full transition-all duration-300 ease-in-out",
            "bg-green-500" // Using green color for progress
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
} 