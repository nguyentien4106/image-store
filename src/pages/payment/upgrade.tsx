import React, { useState } from "react"
import { useNotification } from "@/hooks/notification"
import { paymentApi } from "@/apis/payment"
import { AccountType, OrderType } from "@/constants/enum"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppSelector } from "@/store/hooks"
import { CrownIcon, Check } from "lucide-react"
import { useSearchParams } from "react-router-dom"
import { PLANS } from "@/constants/plan"

const UpgradePage: React.FC = () => {
    const { error } = useNotification()
    const { user } = useAppSelector(state => state.user)
    const [searchParams] = useSearchParams()
    const [selectedPlan, setSelectedPlan] = useState<AccountType | null>(
        (searchParams.get('plan') as AccountType) || null
    )
    const [isProcessing, setIsProcessing] = useState<boolean>(false)

    const handlePayment = async (): Promise<void> => {
        if (!selectedPlan || !user?.userName) return

        try {
            setIsProcessing(true)
            const plan = PLANS.find(p => p.type === selectedPlan)
            if (!plan) throw new Error("Invalid plan selected")

            const response = await paymentApi.createPayment({
                amount: plan.price,
                orderInfo: `Upgrade to ${plan.name}`,
                orderType: plan.type === AccountType.Pro ? OrderType.Pro : OrderType.Plus,
                userId: user.userId
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

    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <div className="px-4 lg:px-6">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold tracking-tight mb-2">Upgrade Your Plan</h1>
                            <p className="text-muted-foreground">
                                Choose the perfect plan for your needs and proceed to payment
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            {PLANS.map((plan) => (
                                <Card 
                                    key={plan.type} 
                                    className={`relative transition-all flex flex-col ${
                                        selectedPlan === plan.type 
                                            ? 'border-primary shadow-lg scale-[1.02]' 
                                            : 'border-border hover:shadow-md'
                                    }`}
                                >
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle className="flex items-center gap-2 text-2xl">
                                                    <CrownIcon className="h-6 w-6 text-yellow-500" />
                                                    {plan.name}
                                                </CardTitle>
                                                <CardDescription className="mt-2">
                                                    {plan.description}
                                                </CardDescription>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-3xl font-bold">
                                                    {plan.price.toLocaleString('vi-VN')} VND
                                                </div>
                                                <div className="text-sm text-muted-foreground">per month</div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <div className="space-y-6">
                                            {plan.features.map((featureGroup, index) => (
                                                <div key={index} className="space-y-3">
                                                    <div className="flex items-center gap-2 text-sm font-medium">
                                                        {featureGroup.icon}
                                                        {featureGroup.title}
                                                    </div>
                                                    <ul className="space-y-2">
                                                        {featureGroup.items.map((item, itemIndex) => (
                                                            <li key={itemIndex} className="flex items-center gap-2 text-sm">
                                                                <Check className="h-4 w-4 text-primary" />
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <div className="px-6 pb-6 mt-auto">
                                        <Button
                                            className="w-full"
                                            variant={selectedPlan === plan.type ? "default" : "outline"}
                                            onClick={() => setSelectedPlan(plan.type)}
                                        >
                                            {selectedPlan === plan.type ? "Selected" : "Select Plan"}
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <div className="mt-8 flex justify-center">
                            <Button
                                size="lg"
                                onClick={handlePayment}
                                disabled={!selectedPlan || isProcessing}
                                className="min-w-[200px]"
                            >
                                {isProcessing ? "Processing..." : "Proceed to Payment"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpgradePage 