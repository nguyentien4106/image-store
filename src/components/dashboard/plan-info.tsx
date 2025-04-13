import { useCallback, useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatBytes } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { CrownIcon, Clock, ChevronDown, ChevronUp } from "lucide-react"
import { useAppSelector } from "@/store/hooks"
import { dashboardApi } from "@/apis/dashboard"
import { UserSubscription } from "@/types/dashboard"
import dayjs from "dayjs"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function PlanInfoCard() {
    const { user } = useAppSelector(state => state.user)
    const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([])
    const [loading, setLoading] = useState(true)
    const [isExpanded, setIsExpanded] = useState(false)

    const getUserSubscription = useCallback<() => Promise<UserSubscription[]>>(async () => {
        if (!user?.userName) return []
        const response = await dashboardApi.getUserSubscription(user.userName)
        return response.data
    }, [user?.userName])

    useEffect(() => {
        const fetchSubscriptions = async () => {
            if (!user?.userName) return
            try {
                setSubscriptions(await getUserSubscription())
            } catch (error) {
                console.error("Failed to fetch subscriptions:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchSubscriptions()
    }, [user?.userName])

    if (loading) {
        return (
            <Card className="col-span-4">
                <CardContent className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </CardContent>
            </Card>
        )
    }

    if (!subscriptions.length) {
        return (
            <Card className="col-span-4">
                <CardContent className="flex items-center justify-center h-32">
                    <p className="text-muted-foreground">No subscription information available</p>
                </CardContent>
            </Card>
        )
    }
    const currentSubscription = subscriptions[0]

    const renderSubscriptionInfo = (subscription: UserSubscription) => (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Plan</span>
                <Badge variant={subscription.accountType === "Free" ? "secondary" : "default"}>
                    {subscription.accountType}
                </Badge>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant={subscription.isActive ? "default" : "destructive"}>
                    {subscription.isActive ? "Active" : "Inactive"}
                </Badge>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Subscription Period</span>
                <div className="text-sm font-medium">
                    {dayjs(subscription.startDate).format("MMM D, YYYY")} - {dayjs(subscription.endDate).format("MMM D, YYYY")}
                </div>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Remaining Time</span>
                <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                        {subscription.isExpired ? "Expired" : subscription.remainingTime}
                    </span>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Expiration Status</span>
                <Badge variant={subscription.isExpired ? "destructive" : "default"}>
                    {subscription.isExpired ? "Expired" : "Active"}
                </Badge>
            </div>
        </div>
    )

    return (
        <Card className="col-span-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
                <div className="flex items-center gap-2">
                    <CrownIcon className="h-4 w-4 text-yellow-500" />
                    <Badge variant={currentSubscription.accountType === "Free" ? "secondary" : "default"}>
                        {currentSubscription.accountType}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {renderSubscriptionInfo(currentSubscription)}

                    {subscriptions.length > 1 && (
                        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">All Subscriptions</span>
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                    </Button>
                                </CollapsibleTrigger>
                            </div>
                            <CollapsibleContent className="space-y-6 pt-4">
                                {subscriptions.slice(1).map((subscription, index) => (
                                    <div key={index} className="border-t pt-4">
                                        {renderSubscriptionInfo(subscription)}
                                    </div>
                                ))}
                            </CollapsibleContent>
                        </Collapsible>
                    )}
                </div>
            </CardContent>
        </Card>
    )
} 