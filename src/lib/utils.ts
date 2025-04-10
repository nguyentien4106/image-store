import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFileName(fileName: string): string {
  // Remove file extension and any path
  const name = fileName.split('/').pop()?.split('.')[0] || fileName
  // Convert to title case and replace hyphens/underscores with spaces
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())
}

export function getDateTimeString(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}

export const getFileSizeInMb = (size: number) => {
  return (size / (1024 * 1024)).toFixed(2) + ' MB';
}
