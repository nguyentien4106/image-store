import axios from "axios"
import { api } from "@/config/api"
interface ChangePasswordRequest {
    currentPassword: string
    newPassword: string
}

interface UpdateProfileRequest {
    name: string
}

export const userApi = {
    changePassword: async (data: ChangePasswordRequest) => {
        const response = await api.post(`/user/change-password`, data)
        return response.data
    },

    updateProfile: async (data: UpdateProfileRequest) => {
        const response = await api.post(`/user/update-profile`, data)
        return response.data
    }
} 