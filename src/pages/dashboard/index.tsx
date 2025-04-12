import { useEffect, useState } from "react"
import { StorageStats } from "@/components/dashboard/storage-stats"
import { PlanInfoCard } from "@/components/dashboard/plan-info"
import { dashboardApi } from "@/apis/dashboard"
import { useAppSelector } from "@/store/hooks"
import { DashboardData } from "@/types/dashboard"
import { useNotification } from "@/hooks/notification"

export default function DashboardPage() {
    const { error } = useNotification()
    const { user } = useAppSelector(state => state.user)
    const [storageData, setStorageData] = useState<DashboardData | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchStorageStats = async () => {
            if (user?.userName) {
                try {
                    const response = await dashboardApi.getStorageStats(user.userName)
                    if (response.succeed) {
                        setStorageData(response.data)
                    } else {
                        error(response.message)
                    }
                } catch (err: any) {
                    error(err.message)
                } finally {
                    setIsLoading(false)
                }
            }
        }

        fetchStorageStats()
    }, [user, error])

    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <div className="px-4 lg:px-6">
                        <h2 className="text-3xl font-bold tracking-tight mb-6">Storage Overview</h2>
                        {isLoading ? (
                            <div className="flex items-center justify-center h-64">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                            </div>
                        ) : storageData ? (
                            <div className="space-y-6">
                                <StorageStats data={storageData} />
                                <PlanInfoCard />
                            </div>
                        ) : (
                            <div className="text-center text-muted-foreground">
                                No storage data available
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
