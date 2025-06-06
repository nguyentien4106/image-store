import { OrderType, SubscriptionType } from "@/constants/enum"

export interface CreatePaymentRequest {
    amount: number
    orderInfo: string
    orderType: OrderType
    userId: string
    subscriptionType: SubscriptionType
}

export interface VNPayPaymentResponse {
    succeed: boolean
    message: string
    data: {
        paymentUrl: string
        transactionId: string
    }
}

export interface VNPayPaymentResult {
    vnp_Amount: string
    vnp_BankCode: string
    vnp_BankTranNo: string
    vnp_CardType: string
    vnp_OrderInfo: string
    vnp_PayDate: string
    vnp_ResponseCode: string
    vnp_TmnCode: string
    vnp_TransactionNo: string
    vnp_TransactionStatus: string
    vnp_TxnRef: string
    vnp_SecureHash: string
} 
