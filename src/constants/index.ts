import { FILES_PATH } from "./path";
import { FileText } from "lucide-react";
import { SidebarItem } from "@/types";
import { DASHBOARD_PATH } from "./path";
import { LayoutDashboard } from "lucide-react";

export const sidebarItems: SidebarItem[] = [
    {
      title: "Dashboard",
      href: DASHBOARD_PATH.dashboard,
      icon: LayoutDashboard,
    },
    {
      title: "Storage",
      href: FILES_PATH.files,
      icon: FileText,
    },
  ]