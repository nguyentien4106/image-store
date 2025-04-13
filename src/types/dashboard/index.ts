import { AccountType } from "@/constants/enum"

export interface StorageLimit {
    maxStorageSize: number
    remainingStorage: number
    usagePercentage: number
}

export interface PlanInfo {
    accountType: AccountType
    planName: string
    maxStorage: number
    features: string[]
    price: number
    billingCycle: string
}

export interface DashboardData {
    userId: string
    totalStorageUsed: number
    r2StorageUsed: number
    telegramStorageUsed: number
    totalFiles: number
    r2Files: number
    telegramFiles: number
    lastUpload: string
    storageLimit: StorageLimit
    planInfo: PlanInfo
}

export interface DashboardResponse {
    succeed: boolean
    message: string
    data: DashboardData
} 

export interface UserSubscription {
    accountType: AccountType
    isActive: boolean
    startDate: string
    endDate: string
    isExpired: boolean
    remainingTime: string
}