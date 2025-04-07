import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { sidebarItems } from "@/constants"
import { useLocation } from "react-router-dom"

export function SiteHeader() {
  const location = useLocation()
  const currentItem = sidebarItems.find(item => item.href === location.pathname) || sidebarItems[0]

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 h-14">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h3 className="text-3xl font-bold">{currentItem.title}</h3>
      </div>
    </header>
  )
}
