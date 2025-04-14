import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Calendar, ArrowLeft } from "lucide-react"
import { AccountType, OrderType } from "@/constants/enum"
import { paymentApi } from "@/apis/payment"
import { useNotification } from "@/hooks/notification"
import { SubscriptionType } from "@/constants/enum"
import { RootState } from "@/store"
import { useSelector } from "react-redux"

interface Plan {
    type: AccountType
    name: string
    monthlyPrice: number
    yearlyPrice: number
    description: string
    features: string[]
    popular?: boolean
}

const PLANS: Plan[] = [
    {
        type: AccountType.Free,
        name: "Free Plan",
        monthlyPrice: 0,
        yearlyPrice: 0,
        description: "Perfect for getting started with basic storage needs",
        features: [
            "1GB Storage",
            "Basic File Management",
            "Community Support",
            "Standard Upload Speed"
        ]
    },
    {
        type: AccountType.Pro,
        name: "Pro Plan",
        monthlyPrice: 100000,
        yearlyPrice: 1080000,
        description: "Ideal for professionals and small businesses",
        features: [
            "10GB Storage",
            "Cloudflare R2 Support",
            "Priority Support",
            "Advanced Analytics",
            "Faster Upload Speed",
            "Custom Branding"
        ],
        popular: true
    },
    {
        type: AccountType.Plus,
        name: "Plus Plan",
        monthlyPrice: 200000,
        yearlyPrice: 2160000,
        description: "For large organizations with advanced needs",
        features: [
            "50GB Storage",
            "Cloudflare R2 Support",
            "24/7 Support",
            "Custom Domain",
            "API Access",
            "Advanced Security",
            "Team Collaboration",
            "Custom Integrations"
        ]
    }
]

const PaymentPage: React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { error } = useNotification()
    const [isProcessing, setIsProcessing] = useState(false)
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
    const [subscriptionType, setSubscriptionType] = useState<SubscriptionType>(SubscriptionType.Monthly)
    const { user } = useSelector((state: RootState) => state.user)

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const planType = params.get('plan')
        const billing = params.get('billing') as SubscriptionType | null

        if (planType) {
            const plan = PLANS.find(p => p.type === planType)
            if (plan) {
                setSelectedPlan(plan)
                setSubscriptionType(billing || SubscriptionType.Monthly)
            } else {
                navigate('/pricing')
            }
        } else {
            navigate('/pricing')
        }
    }, [location.search, navigate])

    const handlePayment = async (): Promise<void> => {
        if (!selectedPlan || !user?.userName) return

        try {
            setIsProcessing(true)
            const plan = PLANS.find(p => p.type === selectedPlan.type)
            if (!plan) throw new Error("Invalid plan selected")
            const response = await paymentApi.createPayment({
                amount: subscriptionType == SubscriptionType.Monthly ? plan.monthlyPrice : plan.yearlyPrice,
                orderInfo: `Upgrade to ${plan.name}`,
                orderType: plan.type === AccountType.Pro ? OrderType.Pro : OrderType.Plus,
                userId: user.userId,
                subscriptionType: subscriptionType
            })

            if (response.succeed) {
                window.open(response.data, '_blank')
            } else {
                error(response.message)
            }
        } catch (err: any) {
            error(err.message)
        } finally {
            setIsProcessing(false)
        }
    }

    const handleSwitchToYearly = () => {
        if (selectedPlan) {
            navigate(`/payment?plan=${selectedPlan.type}&billing=${SubscriptionType.Yearly}`)
        }
    }

    const handleBackToPricing = () => {
        navigate('/pricing')
    }

    if (!selectedPlan) {
        return null
    }

    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <div className="px-4 lg:px-6">
                        <div className="max-w-2xl mx-auto">
                            <Button
                                variant="ghost"
                                className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
                                onClick={handleBackToPricing}
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Pricing
                            </Button>
                        </div>
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold tracking-tight mb-4">Complete Your Purchase</h1>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Review your selected plan and proceed to payment
                            </p>
                        </div>

                        <div className="max-w-2xl mx-auto space-y-6">
                            <Card className="relative">
                                {selectedPlan.popular && (
                                    <div className="absolute -top-4 left-0 right-0 mx-auto w-fit px-4 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                                        Most Popular
                                    </div>
                                )}
                                <CardHeader>
                                    <CardTitle>{selectedPlan.name}</CardTitle>
                                    <CardDescription>{selectedPlan.description}</CardDescription>
                                    <div className="mt-4">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl font-bold">
                                                {selectedPlan.monthlyPrice === 0
                                                    ? "Free"
                                                    : subscriptionType == SubscriptionType.Monthly
                                                        ? `${selectedPlan.monthlyPrice.toLocaleString('vi-VN')} VND`
                                                        : `${selectedPlan.yearlyPrice.toLocaleString('vi-VN')} VND`}
                                            </span>
                                            <span className="text-muted-foreground">
                                                /{subscriptionType == SubscriptionType.Monthly ? 'month' : 'year'}
                                            </span>
                                        </div>
                                        {subscriptionType == SubscriptionType.Yearly && selectedPlan.monthlyPrice > 0 && (
                                            <div className="text-sm text-muted-foreground mt-1">
                                                {Math.round(selectedPlan.yearlyPrice / 12).toLocaleString('vi-VN')} VND/month
                                                <span className="ml-2 text-green-600">Save 10%</span>
                                            </div>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="font-medium mb-2">Billing Cycle</h3>
                                            <p className="text-muted-foreground">
                                                {subscriptionType == SubscriptionType.Monthly 
                                                    ? 'Monthly billing' 
                                                    : 'Yearly billing (with 10% discount)'}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium mb-2">Features</h3>
                                            <ul className="space-y-2">
                                                {selectedPlan.features.map((feature, index) => (
                                                    <li key={index} className="flex items-center gap-2">
                                                        <Check className="h-4 w-4 text-primary" />
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        className="w-full"
                                        variant={selectedPlan.popular ? "default" : "outline"}
                                        onClick={handlePayment}
                                        disabled={isProcessing}
                                    >
                                        {isProcessing ? "Processing..." : "Proceed to Payment"}
                                    </Button>
                                </CardFooter>
                            </Card>

                            {subscriptionType == SubscriptionType.Monthly && selectedPlan.monthlyPrice > 0 && (
                                <Card className="bg-muted/50">
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-medium">Save with Yearly Billing</h3>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    Get 10% discount when you pay yearly
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-green-600">
                                                    {Math.round(selectedPlan.yearlyPrice / 12).toLocaleString('vi-VN')} VND/month
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {selectedPlan.yearlyPrice.toLocaleString('vi-VN')} VND/year
                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            className="w-full mt-4"
                                            onClick={handleSwitchToYearly}
                                        >
                                            <Calendar className="mr-2 h-4 w-4" />
                                            Switch to Yearly Plan
                                        </Button>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentPage 