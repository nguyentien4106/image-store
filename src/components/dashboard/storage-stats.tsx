import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { formatBytes } from "@/lib/utils"
import { Cloud, Database, HardDrive } from "lucide-react"
import { DashboardData } from "@/types/dashboard"

interface StorageStatsProps {
    data: DashboardData 
}

export function StorageStats({ data }: StorageStatsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Storage</CardTitle>
                    <HardDrive className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatBytes(data.totalStorageUsed)}</div>
                    <p className="text-xs text-muted-foreground">
                        {data.totalFiles} files
                    </p>
                    <div className="mt-4">
                        <Progress value={data.storageLimit.usagePercentage} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>{formatBytes(data.totalStorageUsed)} used</span>
                            <span>{formatBytes(data.storageLimit.remainingStorage)} free</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Cloudflare R2</CardTitle>
                    <Cloud className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatBytes(data.r2StorageUsed)}</div>
                    <p className="text-xs text-muted-foreground">
                        {data.r2Files} files
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Telegram</CardTitle>
                    <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatBytes(data.telegramStorageUsed)}</div>
                    <p className="text-xs text-muted-foreground">
                        {data.telegramFiles} files
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Last Upload</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {data.lastUpload === "0001-01-01T00:00:00" ? "Never" : new Date(data.lastUpload).toLocaleDateString()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {data.lastUpload === "0001-01-01T00:00:00" ? "" : new Date(data.lastUpload).toLocaleTimeString()}
                    </p>
                </CardContent>
            </Card>
        </div>
    )
} 