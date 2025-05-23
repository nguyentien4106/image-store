"use client"

import {
  ChevronDown,
  ChevronRight,
  File,
  Folder,
  FolderOpen,
  Share2,
  Trash2,
  MoreHorizontal,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  label?: string
  icon?: string | LucideIcon 
  variant: "default" | "ghost"
  href?: string
  items?: NavItem[]
  onClick?: () => void
}

interface NavDocumentsProps {
  items: NavItem[]
  classNames?: {
    item?: string
    trigger?: string
    content?: string
  }
  className?: string
}

const Icons = {
  folder: Folder,
  folderOpen: FolderOpen,
  file: File,
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
}

export function NavDocuments({ items, className, ...props }: NavDocumentsProps) {
  const { isMobile } = useSidebar()

  const renderNavItem = (item: NavItem, depth = 0) => {
    const IconComponent = item.icon ? Icons[item.icon as keyof typeof Icons] || MoreHorizontal : Folder

    return (
      <SidebarMenuItem key={item.title} className="text-sm">
        <SidebarMenuButton asChild>
          <a href={item.href}>
            <IconComponent />
            <span>{item.title}</span>
          </a>
        </SidebarMenuButton>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuAction
              showOnHover
              className="data-[state=open]:bg-accent rounded-sm"
            >
              <MoreHorizontal />
              <span className="sr-only">More</span>
            </SidebarMenuAction>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuItem>New file</DropdownMenuItem>
            <DropdownMenuItem>
              <Share2 />
              <span>Share</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <Trash2 />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    )
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Documents</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => renderNavItem(item))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
