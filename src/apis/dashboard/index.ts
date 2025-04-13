import { DashboardData, UserSubscription } from "@/types/dashboard"
import { api } from "@/config/api"
import { AppResponse } from "@/types"

export const dashboardApi = {
    getStorageStats: async (userName: string): Promise<AppResponse<DashboardData>> => {
        try {
            const response = await api.get(`/dashboard/storage/${userName}`)
            return response.data
        } catch (error: any) {
            throw new Error(error.response.data.message)
        }
    },

    getUserSubscription: async (userName: string): Promise<AppResponse<UserSubscription[]>> => {
        try {
            const response = await api.get(`/dashboard/subscription/${userName}`)
            return response.data
        } catch (error: any) {
            throw new Error(error.response.data.message)
        }
    }
}
