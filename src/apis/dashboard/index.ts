import { DashboardResponse } from "@/types/dashboard"
import { api } from "@/services/api"

export const dashboardApi = {
    getStorageStats: async (userName: string): Promise<DashboardResponse> => {
        try {
            const response = await api.get(`/dashboard/storage/${userName}`)
            return response.data
        } catch (error: any) {
            throw new Error(error.response.data.message)
        }
    }
}
