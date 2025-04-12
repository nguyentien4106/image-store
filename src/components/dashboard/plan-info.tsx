import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatBytes } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { CrownIcon } from "lucide-react"
import { useAppSelector } from "@/store/hooks"

export function PlanInfoCard() {
    const { user } = useAppSelector(state => state.user)

    return (
        <Card className="col-span-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
                <div className="flex items-center gap-2">
                    <CrownIcon className="h-4 w-4 text-yellow-500" />
                    <Badge variant={user?.accountType === "Free" ? "secondary" : "default"}>
                        {user?.accountType}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Storage Limit</span>
                        <span className="text-sm font-medium">{formatBytes(10000000)}</span>
                    </div>
                    {/* <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Price</span>
                        <span className="text-sm font-medium">
                            ${data.price}/{data.billingCycle}
                        </span>
                    </div>
                    <div className="space-y-2">
                        <span className="text-sm text-muted-foreground">Features:</span>
                        <ul className="list-disc list-inside space-y-1">
                            {data.features.map((feature, index) => (
                                <li key={index} className="text-sm">
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div> */}
                </div>
            </CardContent>
        </Card>
    )
} 