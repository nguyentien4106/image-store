import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { sidebarItems } from "@/constants"


export function AppSidebar() {
  const location = useLocation()

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <h1 className="text-lg font-semibold">CloudStore</h1>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <div className="flex flex-col gap-1 px-2">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
