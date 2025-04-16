import React, { useEffect, useState } from "react"
import { useNotification } from "@/hooks/notification"
import { paymentApi } from "@/apis/payment"
import { VNPayPaymentResult } from "@/types/payment"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, XCircle } from "lucide-react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { authApi } from "@/apis/auth"
const PaymentCallback: React.FC = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const { success, error } = useNotification()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [paymentStatus, setPaymentStatus] = useState<'success' | 'error' | null>(null)
    const [message, setMessage] = useState<string>('')

    useEffect(() => {
        console.log('call payment callback')
        const paymentData: VNPayPaymentResult = {
            vnp_Amount: searchParams.get('vnp_Amount') || '',
            vnp_BankCode: searchParams.get('vnp_BankCode') || '',
            vnp_BankTranNo: searchParams.get('vnp_BankTranNo') || '',
            vnp_CardType: searchParams.get('vnp_CardType') || '',
            vnp_OrderInfo: searchParams.get('vnp_OrderInfo') || '',
            vnp_PayDate: searchParams.get('vnp_PayDate') || '',
            vnp_ResponseCode: searchParams.get('vnp_ResponseCode') || '',
            vnp_TmnCode: searchParams.get('vnp_TmnCode') || '',
            vnp_TransactionNo: searchParams.get('vnp_TransactionNo') || '',
            vnp_TransactionStatus: searchParams.get('vnp_TransactionStatus') || '',
            vnp_TxnRef: searchParams.get('vnp_TxnRef') || '',
            vnp_SecureHash: searchParams.get('vnp_SecureHash') || ''
        }

        const verifyPayment = async () => {
            try {
                const response = await paymentApi.callbackPayment(paymentData)
                
                if (response.succeed) {
                    await authApi.refreshAccessToken()
                    setPaymentStatus('success')
                    setMessage('Payment successful! Your account has been upgraded.')
                    success('Payment successful!')
                } else {
                    setPaymentStatus('error')
                    setMessage(response.message || 'Payment failed. Please try again.')
                    error(response.message || 'Payment failed')
                }
            } catch (err: any) {
                setPaymentStatus('error')
                setMessage(err.message || 'An error occurred while verifying payment')
                error(err.message || 'Payment verification failed')
            } finally {
                setIsLoading(false)
            }
        }

        verifyPayment()
    }, [searchParams])

    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <div className="px-4 lg:px-6">
                        <Card className="max-w-md mx-auto">
                            <CardHeader>
                                <CardTitle className="text-center">
                                    {isLoading ? 'Verifying Payment...' : 'Payment Result'}
                                </CardTitle>
                                <CardDescription className="text-center">
                                    {isLoading ? 'Please wait while we verify your payment' : message}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center gap-4">
                                {isLoading ? (
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                                ) : (
                                    <>
                                        {paymentStatus === 'success' ? (
                                            <CheckCircle2 className="h-12 w-12 text-green-500" />
                                        ) : (
                                            <XCircle className="h-12 w-12 text-red-500" />
                                        )}
                                        <div className="flex gap-4">
                                            <Button
                                                variant="outline"
                                                className="cursor-pointer"
                                                onClick={() => navigate('/dashboard')}
                                            >
                                                Go to Dashboard
                                            </Button>
                                            {paymentStatus === 'error' && (
                                                <Button
                                                    className="cursor-pointer"
                                                    onClick={() => navigate('/payment')}
                                                >
                                                    Try Again
                                                </Button>
                                            )}
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentCallback
