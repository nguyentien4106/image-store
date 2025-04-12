import axios from "axios"
import { CreatePaymentRequest, VNPayPaymentResult } from "@/types/payment"
import { api } from "@/services/api"
import { AppResponse } from "@/types"

export const paymentApi = {
    createPayment: async (request: CreatePaymentRequest): Promise<AppResponse<string>> => {
        try {
            const { data } = await api.post<AppResponse<string>>(`/payment/create`, request)
            return data
            
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || "Failed to create payment")
            }
            throw new Error("Failed to create payment")
        }
    },

    callbackPayment: async (data: VNPayPaymentResult): Promise<{ succeed: boolean; message: string }> => {
        try {
            // Convert VNPayPaymentResult to a Record<string, string> for URLSearchParams
            const params: Record<string, string> = {};
            Object.entries(data).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    params[key] = String(value);
                }
            });
            
            const queryString = new URLSearchParams(params).toString();
            console.log(queryString)
            const response = await api.get(`/payment/callback?${queryString}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || "Failed to verify payment");
            }
            throw new Error("Failed to verify payment");
        }
    }
} 