import { getCompanyIcon } from "@/lib/icons"

export function AuthNavbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-center">
        {
            getCompanyIcon()
        }
      </div>
    </nav>
  )
}