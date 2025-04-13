import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Calendar } from "lucide-react"
import { AccountType, SubscriptionType } from "@/constants/enum"
import { createSearchParams, useNavigate } from "react-router-dom"

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
        name: "Premium Plan",
        monthlyPrice: 100000,
        yearlyPrice: 1080000, // 10% discount
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
        yearlyPrice: 2160000, // 10% discount
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

const PricingPage: React.FC = () => {
    const navigate = useNavigate()
    const [billingCycle, setBillingCycle] = useState<SubscriptionType>(SubscriptionType.Monthly)

    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <div className="px-4 lg:px-6">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h1>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                                Choose the perfect plan for your needs. All plans include a 14-day free trial.
                            </p>
                            <div className="flex items-center justify-center gap-4">
                                <Button
                                    variant={billingCycle === SubscriptionType.Monthly ? 'default' : 'outline'}
                                    onClick={() => setBillingCycle(SubscriptionType.Monthly)}
                                >
                                    Monthly
                                </Button>
                                <Button
                                    variant={billingCycle === SubscriptionType.Yearly ? 'default' : 'outline'}
                                    onClick={() => setBillingCycle(SubscriptionType.Yearly)}
                                >
                                    Yearly
                                    {billingCycle === SubscriptionType.Yearly && (
                                        <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                                            Save 10%
                                        </span>
                                    )}
                                </Button>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {PLANS.map((plan) => (
                                <Card
                                    key={plan.type}
                                    className={`relative flex flex-col ${
                                        plan.popular
                                            ? "border-primary shadow-lg"
                                            : "border-border"
                                    }`}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-4 left-0 right-0 mx-auto w-fit px-4 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                                            Most Popular
                                        </div>
                                    )}
                                    <CardHeader>
                                        <CardTitle>{plan.name}</CardTitle>
                                        <CardDescription>{plan.description}</CardDescription>
                                        <div className="mt-4">
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-4xl font-bold">
                                                    {plan.monthlyPrice === 0
                                                        ? "Free"
                                                        : billingCycle === SubscriptionType.Monthly
                                                            ? `${plan.monthlyPrice.toLocaleString('vi-VN')} VND`
                                                            : `${plan.yearlyPrice.toLocaleString('vi-VN')} VND`}
                                                </span>
                                                <span className="text-muted-foreground">
                                                    /{billingCycle === SubscriptionType.Monthly ? 'month' : 'year'}
                                                </span>
                                            </div>
                                            {billingCycle === SubscriptionType.Yearly && plan.monthlyPrice > 0 && (
                                                <div className="text-sm text-muted-foreground mt-1">
                                                    {Math.round(plan.yearlyPrice / 12).toLocaleString('vi-VN')} VND/month
                                                </div>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <ul className="space-y-4">
                                            {plan.features.map((feature, index) => (
                                                <li key={index} className="flex items-center gap-2">
                                                    <Check className="h-4 w-4 text-primary" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <Button
                                            className="w-full"
                                            variant={plan.popular ? "default" : "outline"}
                                            onClick={() => navigate({
                                                pathname: '/payment',
                                                search: createSearchParams({
                                                    plan: plan.type,
                                                    billing: billingCycle.toString()
                                                }).toString()
                                            })}
                                        >
                                            {plan.monthlyPrice === 0 ? "Get Started" : "Choose Plan"}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <h2 className="text-2xl font-bold mb-4">Need a Custom Plan?</h2>
                            <p className="text-muted-foreground mb-6">
                                Contact us for custom solutions tailored to your specific needs.
                            </p>
                            <Button variant="outline" onClick={() => navigate('/contact')}>
                                Contact Sales
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PricingPage 