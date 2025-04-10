import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AccountType } from "@/constants/enum"
import { CrownIcon, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface AccountLimitsPanelProps {
  accountType: string
}

interface AccountLimit {
  title: string
  description: string
  limits: string[]
  upgradeText: string
}

const limits: Record<string, AccountLimit> = {
  [AccountType.Free]: {
    title: "Free Plan",
    description: "Basic features with limited storage",
    limits: [
      "50GB Storage Limit (50GB Telegram Storage, Not Guaranteed)",
      "Basic Download Speed: 500kb/s",
      "Standard Support",
      "Max File Size: 20MB"
    ],
    upgradeText: "Upgrade to Pro for more features"
  },
  [AccountType.Pro]: {
    title: "Pro Plan",
    description: "Enhanced features for professionals",
    limits: [
      "5TB Storage Limit (5TB Telegram Storage, Not Guaranteed)",
      "0.4$ for 1GB Storage R2 (Guaranteed)",
      "Priority Download Speed",
      "Priority Support",
      "Max File Size: 5GB"
    ],
    upgradeText: "You're on the Pro plan"
  },
  [AccountType.Plus]: {
    title: "Plus Plan",
    description: "Enhanced features for professionals",
    limits: [
      "Unlimited Storage Limit (Unlimited Telegram Storage)",
      "0.35$ for 1GB Storage R2 (Guaranteed)",
      "Priority Download Speed",
      "Priority Support",
      "Max File Size: 2GB"
    ],
    upgradeText: "You're on the Plus plan"
  }
}

export function AccountLimitsPanel({ accountType }: AccountLimitsPanelProps) {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const accountLimits = limits[accountType]

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <Button
          size="lg"
          className={cn(
            "rounded-full shadow-lg transition-all duration-300",
            "hover:scale-110 hover:shadow-xl",
            "bg-primary text-primary-foreground",
            "flex items-center gap-2",
            isOpen && "rotate-180"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <CrownIcon className="w-5 h-5 animate-pulse" />
          <ChevronDown className="w-4 h-4 transition-transform duration-300" />
        </Button>
      </div>

      {/* Panel Content */}
      <Card className={cn(
        "w-full transition-all duration-300 ease-in-out",
        "md:block",
        isOpen 
          ? "fixed bottom-20 right-4 left-4 z-40 opacity-100 translate-y-0" 
          : "fixed bottom-0 right-4 left-4 z-40 opacity-0 translate-y-full pointer-events-none"
      )}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              {accountType === AccountType.Pro && <CrownIcon className="w-5 h-5 text-yellow-500" />}
              {accountLimits.title}
            </CardTitle>
            <CardDescription>{accountLimits.description}</CardDescription>
          </div>
          {accountType === AccountType.Free && (
            <Button 
              size="sm" 
              variant="outline"
              className="cursor-pointer"
              onClick={() => navigate("/pricing")}
            >
              Upgrade
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {accountLimits.limits.map((limit: string, index: number) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>{limit}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Desktop View */}
      <Card className="hidden md:block w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              {accountType === AccountType.Pro && <CrownIcon className="w-5 h-5 text-yellow-500" />}
              {accountLimits.title}
            </CardTitle>
            <CardDescription>{accountLimits.description}</CardDescription>
          </div>
          {accountType === AccountType.Free && (
            <Button 
              size="sm" 
              variant="outline"
              className="cursor-pointer"
              onClick={() => navigate("/pricing")}
            >
              Upgrade
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {accountLimits.limits.map((limit: string, index: number) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>{limit}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
} 