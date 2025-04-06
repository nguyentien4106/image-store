import { Link } from "react-router-dom"
import { IconInnerShadowTop } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"
import { HOME_PATH } from "@/constants/path"
import { Cloud } from "lucide-react"
import { getCompanyIcon } from "@/lib/icons"
export function AuthNavbar() {
  const navigate = useNavigate()
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