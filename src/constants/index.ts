import { FILES_PATH } from "./path";
import { CreditCard, FileText } from "lucide-react";
import { SidebarItem } from "@/types";
import { DASHBOARD_PATH } from "./path";
import { LayoutDashboard } from "lucide-react";
import { PRICING_PATH } from "./path";

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
    {
      title: "Pricing",
      href: PRICING_PATH.pricing,
      icon: CreditCard,
    },
]